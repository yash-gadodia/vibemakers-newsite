-- Create admin_invites table to track pending invites
CREATE TABLE public.admin_invites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    invited_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    accepted_at timestamp with time zone
);

-- Enable RLS
ALTER TABLE public.admin_invites ENABLE ROW LEVEL SECURITY;

-- Only admins can view and manage invites
CREATE POLICY "Admins can manage invites"
ON public.admin_invites
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to auto-assign admin role when invited user signs up
CREATE OR REPLACE FUNCTION public.handle_admin_invite()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check if this user's email was invited
    IF EXISTS (
        SELECT 1 FROM public.admin_invites 
        WHERE email = NEW.email 
        AND accepted_at IS NULL
    ) THEN
        -- Add admin role
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
        
        -- Mark invite as accepted
        UPDATE public.admin_invites 
        SET accepted_at = now() 
        WHERE email = NEW.email;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create trigger on auth.users (runs when new user is created)
CREATE TRIGGER on_auth_user_created_check_invite
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_admin_invite();