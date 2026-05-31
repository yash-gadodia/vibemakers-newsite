import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
      } else {
        // Auto-login after signup (since email auto-confirm is enabled)
        const { error: signInError } = await signIn(email, password);
        if (signInError) {
          setError('Account created! Please sign in.');
          setIsSignUp(false);
        } else {
          navigate('/admin');
        }
        setIsLoading(false);
      }
    } else {
      const { error } = await signIn(email, password);

      if (error) {
        setError(error.message);
      } else {
        navigate('/admin');
      }
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-background min-h-[80vh] flex items-center">
      <Helmet>
        <title>Sign In · Vibe Makers</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="mx-auto max-w-md px-6 w-full">
        <span className="vm-sticker" style={{ transform: 'rotate(-3deg)' }}>
          ● Admin login
        </span>

        <h1 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mt-6 mb-2">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {isSignUp
            ? 'Create your admin account to get started'
            : 'Enter your credentials to access the admin dashboard'}
        </p>

        <div className="vm-card rounded-2xl border border-border bg-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="vm-btn rounded-full bg-primary text-primary-foreground w-full shadow-sticker flex items-center justify-center gap-2 font-medium py-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isSignUp ? 'Creating...' : 'Signing in...'}
                </>
              ) : isSignUp ? (
                'Create Account'
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-primary hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
