
import React from 'react';

interface StyledHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const StyledHeading: React.FC<StyledHeadingProps> = ({ level, children, className }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const baseClasses = 'font-orbitron font-black uppercase tracking-wider';
  const levelClasses = {
    1: 'text-4xl md:text-6xl',
    2: 'text-xl',
    3: 'text-lg',
    4: 'text-base',
    5: 'text-sm',
    6: 'text-xs',
  };

  return (
    <div className="relative mb-12">
      <div className="bg-white/95 backdrop-blur-sm w-full max-w-xl h-32 transform skew-y-3 shadow-2xl mx-auto">
        <div className="absolute inset-8 border-r-6 border-primary flex items-center justify-center">
          <Tag className={`${baseClasses} ${levelClasses[level]} text-foreground transform -skew-y-3 ${className}`}>
            {children}
          </Tag>
        </div>
      </div>
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent transform -rotate-12"></div>
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary transform rotate-45"></div>
    </div>
  );
};

export default StyledHeading;
