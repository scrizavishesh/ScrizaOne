import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Button
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/90 active:scale-[0.98]',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border-2 border-border bg-transparent hover:border-primary/50 hover:bg-accent hover:text-accent-foreground',
      ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
      destructive: 'bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90',
    };
    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
      icon: 'h-10 w-10 flex items-center justify-center p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// Input
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-foreground">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'flex w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus:border-destructive focus:ring-destructive/10',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-destructive font-medium animate-slide-up">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// Card
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-2xl border border-border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  );
}

// Badge
export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'success' | 'warning' }) {
  const variants = {
    default: 'bg-secondary text-secondary-foreground',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
  };
  return (
    <div
      className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', variants[variant], className)}
      {...props}
    />
  );
}
