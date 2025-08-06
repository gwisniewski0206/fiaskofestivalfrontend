
import React from 'react';

interface Heading2Props {
  children: React.ReactNode;
  className?: string;
}

const Heading2: React.FC<Heading2Props> = ({ children, className }) => {
  return (
    <div className="relative mb-12">
      <div className="bg-primary w-48 h-16 transform -skew-y-6 shadow-xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className={`font-orbitron font-bold text-xl text-white transform skew-y-6 uppercase tracking-wider ${className}`}>
            {children}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Heading2;
