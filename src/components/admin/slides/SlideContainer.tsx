import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SlideContainerProps {
  children: ReactNode;
  className?: string;
}

const SlideContainer = ({ children, className }: SlideContainerProps) => {
  return (
    <div 
      className={cn(
        "w-full h-full bg-background",
        "flex flex-col justify-center items-center",
        "p-6 md:p-8 lg:p-10 print:p-6",
        "font-display text-foreground",
        "relative overflow-hidden",
        className
      )}
    >
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] print:hidden"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Orange accent glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 print:hidden" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 print:hidden" />
      
      {/* Content - uses more horizontal space */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {children}
      </div>
    </div>
  );
};

export default SlideContainer;
