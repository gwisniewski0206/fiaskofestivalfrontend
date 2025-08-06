
import React from 'react';
import { ContentBlock } from '@/hooks/useWordPressPage';
import BlockRenderer from '../BlockRenderer';

interface AmenityCardContainerProps {
  block: ContentBlock;
}

const AmenityCardContainer: React.FC<AmenityCardContainerProps> = ({ block }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <BlockRenderer blocks={block.children} />
    </div>
  );
};

export default AmenityCardContainer;
