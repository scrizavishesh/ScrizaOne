import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'wouter';
import { signupSchema, type SignupInput, useSignup } from '../hooks/use-auth';
import { Button, Input, Card } from '../components/ui/shared';
import { LayoutDashboard } from 'lucide-react';

export default function Signup() {
  const [, setLocation] = useLocation();
  const signup = useSignup();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = (data: SignupInput) => {
    signup.mutate(data, {
      onSuccess: () => {
        setLocation('/login');
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-muted/30">
      <div className="w-full max-w-md m-auto p-4 sm:p-8 animate-slide-up">
        <div className="flex flex-col items-center text-center mb-8">
           <div className="mb-6">
              <img src="/Main_logo.png" alt="SocialOne Logo" className="h-12 w-auto" />
            </div>
          <h1 className="text-3xl font-display font-bold text-foreground">Create account</h1>
          <p className="mt-2 text-muted-foreground">Start managing your business smartly</p>
        </div>

        <Card className="p-8 shadow-xl shadow-black/5 border-border/50">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Admin Email"
              type="email"
              placeholder="admin@company.com"
              {...register('adminEmail')}
              error={errors.adminEmail?.message}
            />
            <Input
              label="Admin Phone"
              placeholder="+1 555-0192"
              {...register('adminPhone')}
              error={errors.adminPhone?.message}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
            />

            {signup.isError && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg font-medium text-center">
                Registration failed. Please verify your details.
              </div>
            )}

            <Button type="submit" className="w-full" isLoading={signup.isPending}>
              Create Account
            </Button>
          </form>
        </Card>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>


      {/* Right side - Hero Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/Signup_page.png"
            alt="Abstract background"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
