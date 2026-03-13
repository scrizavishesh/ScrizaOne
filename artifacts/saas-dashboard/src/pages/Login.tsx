import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'wouter';
import { loginSchema, type LoginInput, useLogin } from '../hooks/use-auth';
import { Button, Input, Card } from '../components/ui/shared';
import { LayoutDashboard } from 'lucide-react';

export default function Login() {
  const [, setLocation] = useLocation();
  const login = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginInput) => {
    login.mutate(data, {
      onSuccess: () => {
        setLocation('/dashboard');
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative z-10">
        <div className="w-full max-w-md space-y-8 animate-slide-up">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
              <LayoutDashboard className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">Sign in to your SocialOne dashboard</p>
          </div>

          <Card className="p-8 shadow-xl shadow-black/5 border-border/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@company.com"
                {...register('email')}
                error={errors.email?.message}
              />
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  error={errors.password?.message}
                />
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
                </div>
              </div>

              {login.isError && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg font-medium text-center">
                  Invalid email or password. Please try again.
                </div>
              )}

              <Button type="submit" className="w-full" isLoading={login.isPending}>
                Sign In
              </Button>
            </form>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-primary mix-blend-multiply" />
        <img 
          src={`${import.meta.env.BASE_URL}images/auth-bg.png`} 
          alt="Abstract background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-16 text-white z-10">
          <h2 className="text-4xl font-display font-bold leading-tight mb-4">
            Manage all your social<br/>channels in one place.
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-md">
            The complete toolkit for scaling your customer support across WhatsApp, Facebook, and Instagram.
          </p>
        </div>
      </div>
    </div>
  );
}
