
import React from 'react';
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ShadcnButtonProps {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <ShadcnButton
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "after:absolute after:inset-0 after:bg-white/0 hover:after:bg-white/10 after:transition-colors",
          isLoading && "pointer-events-none",
          className
        )}
        variant={variant}
        size={size}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span className="opacity-70">Loading...</span>
          </div>
        ) : (
          children
        )}
      </ShadcnButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
