import React from 'react';
import { cn } from '../../lib/utils';

interface StyledButtonContainerProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  variant?: 'solid' | 'outlined';
}

const StyledButtonContainer: React.FC<StyledButtonContainerProps> = ({ children, className, index, variant = 'solid' }) => {
  const outerSkew = index % 2 === 0 ? 'skew-x-12' : '-skew-x-12';
  const innerSkew = index % 2 === 0 ? '-skew-x-12' : 'skew-x-12';

  const baseClasses = "w-32 h-12 shadow-lg transition-all duration-300 hover:scale-105";
  const solidClasses = "bg-primary";
  const outlinedClasses = "bg-white/90 backdrop-blur-sm border-2 border-primary";

  const textSolidClasses = "text-white";
  const textOutlinedClasses = "text-primary";

  return (
    <div className={cn("relative", className)}>
      <div className={cn(baseClasses, outerSkew, {
        [solidClasses]: variant === 'solid',
        [outlinedClasses]: variant === 'outlined',
      })}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-rajdhani font-bold text-sm uppercase tracking-wider transform", innerSkew, {
            [textSolidClasses]: variant === 'solid',
            [textOutlinedClasses]: variant === 'outlined',
          })}>
            {children}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StyledButtonContainer;