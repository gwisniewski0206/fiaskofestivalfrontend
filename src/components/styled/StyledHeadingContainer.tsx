import React from 'react';
import { mapWordPressAlignmentClasses, cn } from '../../lib/utils';

interface StyledHeadingContainerProps {
  children: React.ReactNode;
  className?: string;
  index: number;
}

const StyledHeadingContainer: React.FC<StyledHeadingContainerProps> = ({ children, className, index }) => {
  const outerSkew = index % 2 === 0 ? '-skew-y-6' : 'skew-y-6';
  const innerSkew = index % 2 === 0 ? '-skew-y-2' : 'skew-y-2';
  const mappedAlignmentClass = mapWordPressAlignmentClasses(className || '');

  return (
    <div className={cn("relative mb-12", className)}> {/* Removed flex */}
      <div className={cn("bg-primary w-48 h-16 transform", outerSkew, "shadow-xl", mappedAlignmentClass)}> {/* Apply mapped alignment here */}
        <div className="absolute inset-0 flex items-center justify-center"> 
          <h2 className={cn("font-orbitron font-bold text-xl text-white transform uppercase tracking-wider text-center", innerSkew)}> 
            {children}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StyledHeadingContainer;