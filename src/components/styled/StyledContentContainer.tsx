import React from 'react';

interface StyledContentContainerProps {
  children: React.ReactNode;
  className?: string;
  index: number;
}

const StyledContentContainer: React.FC<StyledContentContainerProps> = ({ children, className, index }) => {
  const outerSkew = index % 2 === 0 ? '-skew-y-2' : 'skew-y-2';
  const innerSkew = index % 2 === 0 ? 'skew-y-2' : '-skew-y-2';

  return (
    <div className={`relative mx-auto w-full max-w-4xl my-8 ${className}`}> {/* Added margin for spacing */}
      <div className="relative">
        <div className={`bg-white/95 backdrop-blur-sm transform ${outerSkew} shadow-xl p-6`}> {/* Added padding */}
          <div className="border-l-4 border-primary p-6"> {/* Adjusted padding here */}
            <div className={`transform ${innerSkew}`}> {/* Counter-skew for content */}
              {children}
            </div>
          </div>
        </div>
        <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-accent transform rotate-45"></div>
      </div>
    </div>
  );
};

export default StyledContentContainer;