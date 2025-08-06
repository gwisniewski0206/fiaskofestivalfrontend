
import React from 'react';
import { ContentBlock } from '@/hooks/useWordPressPage';
import BlockRenderer from '../BlockRenderer';

interface TicketCardContainerProps {
  block: ContentBlock;
}

const TicketCardContainer: React.FC<TicketCardContainerProps> = ({ block }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <BlockRenderer blocks={block.children} />
    </div>
  );
};

export default TicketCardContainer;
