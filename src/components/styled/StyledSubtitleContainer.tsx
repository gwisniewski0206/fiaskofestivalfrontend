import React from 'react';
import { mapWordPressAlignmentClasses, cn } from '../../lib/utils';

interface StyledSubtitleContainerProps {
  children: React.ReactNode;
  className?: string;
  index: number;
}

const StyledSubtitleContainer: React.FC<StyledSubtitleContainerProps> = ({ children, className, index }) => {
  const outerSkew = index % 2 === 0 ? 'skew-x-6' : '-skew-x-6';
  const innerSkew = index % 2 === 0 ? '-skew-x-6' : 'skew-x-6';
  const mappedAlignmentClass = mapWordPressAlignmentClasses(className || '');

  return (
    <div className={cn("relative mb-12", className)}> {/* Removed flex */}
      <div className={cn("bg-foreground/90 backdrop-blur-sm w-80 h-16 transform", outerSkew, "shadow-xl", mappedAlignmentClass)}> 
        <div className="absolute inset-4 flex items-center justify-center"> 
          <p className={cn("font-rajdhani text-white text-center uppercase tracking-wider")}> 
            {children}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StyledSubtitleContainer;