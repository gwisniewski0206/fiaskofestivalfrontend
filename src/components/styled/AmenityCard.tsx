
import React from 'react';
import { ContentBlock } from '@/hooks/useWordPressPage';
import BlockRenderer from '../BlockRenderer';

interface AmenityCardProps {
  block: ContentBlock;
}

const AmenityCard: React.FC<AmenityCardProps> = ({ block }) => {
  return (
    <div className="relative transform rotate-1">
      <div className="bg-white/90 backdrop-blur-sm h-40 shadow-lg">
        <div className="absolute inset-6 border-t-4 border-primary text-center">
          <BlockRenderer blocks={block.children} />
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary transform rotate-45"></div>
    </div>
  );
};

export default AmenityCard;
