
import React from 'react';

interface StyledCardProps {
  children: React.ReactNode;
  className?: string;
  isFeatured?: boolean;
}

const StyledCard: React.FC<StyledCardProps> = ({ children, className, isFeatured }) => {
  return (
    <div className={`relative transform ${isFeatured ? '-rotate-1' : 'rotate-1'} ${className}`}>
      <div className="bg-white/90 backdrop-blur-sm h-96 shadow-xl">
        <div className="absolute inset-8 border-b-4 border-primary">
          {children}
        </div>
      </div>
      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-accent transform rotate-45"></div>
    </div>
  );
};

export default StyledCard;
