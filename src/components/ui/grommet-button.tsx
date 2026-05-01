import { Button as GrommetButton, ButtonExtendedProps } from 'grommet';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface GButtonProps extends Omit<ButtonExtendedProps, 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}

const GButton = (
  { variant = 'primary', size = 'md', children, className, asChild, ...props }: GButtonProps
) => {
    // Map our variants to Grommet props
    const isPrimary = variant === 'primary';
    const isSecondary = variant === 'secondary' || variant === 'outline';
    const isGhost = variant === 'ghost';
    const isDestructive = variant === 'destructive';

    // Map sizes
    const grommetSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium';

    // Style overrides for variants
    const variantStyles = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    };

    const sizeStyles = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-8 text-base',
      icon: 'h-10 w-10 p-0',
    };

    return (
      <GrommetButton
        primary={isPrimary}
        secondary={isSecondary}
        plain={isGhost}
        size={grommetSize}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </GrommetButton>
    );
  };

GButton.displayName = 'GButton';

export { GButton };
