import { Card as GrommetCard, CardHeader as GrommetCardHeader, CardBody, CardFooter as GrommetCardFooter } from 'grommet';
import { forwardRef, ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// GCard - Main card component
interface GCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  pad?: 'none' | 'small' | 'medium' | 'large';
}

const GCard = forwardRef<HTMLDivElement, GCardProps>(
  ({ children, className, elevation = 'small', pad = 'none', ...props }, ref) => {
    return (
      <GrommetCard
        ref={ref}
        elevation={elevation}
        pad={pad}
        background="background"
        className={cn(
          'rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden',
          className
        )}
        {...props}
      >
        {children}
      </GrommetCard>
    );
  }
);
GCard.displayName = 'GCard';

// GCardHeader
interface GCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const GCardHeader = forwardRef<HTMLDivElement, GCardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <GrommetCardHeader
        ref={ref}
        pad={{ horizontal: 'medium', vertical: 'small' }}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
      >
        {children}
      </GrommetCardHeader>
    );
  }
);
GCardHeader.displayName = 'GCardHeader';

// GCardTitle
interface GCardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

const GCardTitle = forwardRef<HTMLHeadingElement, GCardTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-xl font-semibold leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
GCardTitle.displayName = 'GCardTitle';

// GCardDescription
interface GCardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

const GCardDescription = forwardRef<HTMLParagraphElement, GCardDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
GCardDescription.displayName = 'GCardDescription';

// GCardContent
interface GCardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const GCardContent = forwardRef<HTMLDivElement, GCardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <CardBody
        ref={ref}
        pad={{ horizontal: 'medium', vertical: 'small' }}
        className={cn('p-6 pt-0', className)}
        {...props}
      >
        {children}
      </CardBody>
    );
  }
);
GCardContent.displayName = 'GCardContent';

// GCardFooter
interface GCardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const GCardFooter = forwardRef<HTMLDivElement, GCardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <GrommetCardFooter
        ref={ref}
        pad={{ horizontal: 'medium', vertical: 'small' }}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
      >
        {children}
      </GrommetCardFooter>
    );
  }
);
GCardFooter.displayName = 'GCardFooter';

export { GCard, GCardHeader, GCardTitle, GCardDescription, GCardContent, GCardFooter };
