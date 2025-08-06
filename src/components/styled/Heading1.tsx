
import React from 'react';

interface Heading1Props {
  children: React.ReactNode;
  className?: string;
}

const Heading1: React.FC<Heading1Props> = ({ children, className }) => {
  return (
    <div className="relative mb-12">
      <div className="bg-foreground/90 backdrop-blur-sm w-96 h-16 transform -skew-x-6 mx-auto shadow-xl">
        <div className="absolute inset-4 flex items-center justify-center transform skew-x-6">
          <p className={`font-rajdhani text-white text-center uppercase tracking-wider ${className}`}>
            {children}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Heading1;
