import React from 'react';
import { cn } from '../../lib/utils';

interface StyledSimpleButtonProps {
  children: React.ReactNode;
  className?: string;
}

const StyledSimpleButton: React.FC<StyledSimpleButtonProps> = ({ children, className }) => {
  return (
    <div className={cn("h-12 flex items-center justify-center bg-primary hover:bg-primary/90 cursor-pointer transition-colors", className)}>
      <span className="font-rajdhani font-bold text-white uppercase tracking-wider">
        {children}
      </span>
    </div>
  );
};

export default StyledSimpleButton;