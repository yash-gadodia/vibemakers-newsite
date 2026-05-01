import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function hashApiKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function validateApiKey(supabase: any, authHeader: string | null): Promise<boolean> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.replace('Bearer ', '');
  const keyHash = await hashApiKey(token);

  const { data: apiKey, error } = await supabase
    .from('api_keys')
    .select('id, expires_at')
    .eq('key_hash', keyHash)
    .single();

  if (error || !apiKey) {
    console.log('API key not found');
    return false;
  }

  if (apiKey.expires_at && new Date(apiKey.expires_at) < new Date()) {
    console.log('API key expired');
    return false;
  }

  // Update last_used_at
  await supabase
    .from('api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', apiKey.id);

  return true;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const slugParam = url.searchParams.get('slug');
    const idParam = url.searchParams.get('id');

    // GET requests are public
    if (req.method === 'GET') {
      if (slugParam) {
        const { data: post, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slugParam)
          .eq('status', 'published')
          .single();

        if (error || !post) {
          return new Response(JSON.stringify({ error: 'Post not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify(post), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // List all published posts
      const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, description, cover_image, category, tags, author, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      return new Response(JSON.stringify({ posts: posts || [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // All other methods require auth
    const isValid = await validateApiKey(supabase, req.headers.get('authorization'));
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // POST - Create new post
    if (req.method === 'POST') {
      const body = await req.json();
      console.log('Received article:', JSON.stringify(body, null, 2));

      const { title, content, description, category, tags, author, status, cover_image, meta_title, meta_description } = body;

      if (!title) {
        return new Response(JSON.stringify({ error: 'Title is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      let slug = generateSlug(title);

      // Ensure unique slug
      const { data: existing } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('slug', slug);

      if (existing && existing.length > 0) {
        slug = `${slug}-${Date.now()}`;
      }

      const postData = {
        title,
        slug,
        html_content: content,
        description: description || meta_description,
        category: category || 'General',
        tags: tags ? (Array.isArray(tags) ? tags : [tags]) : [],
        author: author || 'Vibe Makers Team',
        cover_image,
        meta_title: meta_title || title,
        meta_description: meta_description || description,
        status: status === 'publish' || status === 'published' ? 'published' : 'draft',
        published_at: (status === 'publish' || status === 'published') ? new Date().toISOString() : null,
      };

      const { data: post, error } = await supabase
        .from('blog_posts')
        .insert(postData)
        .select()
        .single();

      if (error) {
        console.error('Error creating post:', error);
        return new Response(JSON.stringify({ error: 'Failed to create post', details: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const externalUrl = `https://vibemakerz.lovable.app/blog/${post.slug}`;

      return new Response(JSON.stringify({ 
        id: post.id, 
        slug: post.slug,
        external_url: externalUrl,
        message: 'Post created successfully'
      }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // PUT - Update post
    if (req.method === 'PUT') {
      const body = await req.json();
      const postId = body.id || idParam;

      if (!postId) {
        return new Response(JSON.stringify({ error: 'Post ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (body.title) updateData.title = body.title;
      if (body.content) updateData.html_content = body.content;
      if (body.description) updateData.description = body.description;
      if (body.category) updateData.category = body.category;
      if (body.cover_image) updateData.cover_image = body.cover_image;
      if (body.tags) updateData.tags = Array.isArray(body.tags) ? body.tags : [body.tags];
      if (body.author) updateData.author = body.author;
      if (body.meta_title) updateData.meta_title = body.meta_title;
      if (body.meta_description) updateData.meta_description = body.meta_description;
      if (body.status) {
        updateData.status = (body.status === 'publish' || body.status === 'published') ? 'published' : body.status;
        if (updateData.status === 'published') {
          // Only set published_at if not already published
          const { data: existingPost } = await supabase
            .from('blog_posts')
            .select('published_at')
            .eq('id', postId)
            .single();
          
          if (!existingPost?.published_at) {
            updateData.published_at = new Date().toISOString();
          }
        }
      }

      const { data: post, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', postId)
        .select()
        .single();

      if (error) {
        return new Response(JSON.stringify({ error: 'Failed to update post' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const externalUrl = `https://vibemakerz.lovable.app/blog/${post.slug}`;

      return new Response(JSON.stringify({ 
        id: post.id, 
        slug: post.slug, 
        external_url: externalUrl,
        message: 'Updated' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // DELETE
    if (req.method === 'DELETE') {
      const body = await req.json().catch(() => ({}));
      const postId = body.id || idParam;

      if (!postId) {
        return new Response(JSON.stringify({ error: 'Post ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) {
        return new Response(JSON.stringify({ error: 'Failed to delete' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ message: 'Deleted' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
