
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface StyledButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({ to, children, className }) => {
  return (
    <Button asChild className={`relative ${className}`}>
      <Link to={to}>
        <div className="w-32 h-12 transform skew-x-12 shadow-lg transition-all duration-300 hover:scale-105 bg-primary">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-rajdhani font-bold text-sm uppercase tracking-wider transform -skew-x-12 text-white">
              {children}
            </span>
          </div>
        </div>
      </Link>
    </Button>
  );
};

export default StyledButton;
