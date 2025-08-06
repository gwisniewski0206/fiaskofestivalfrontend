
import React from 'react';
import { ContentBlock } from '@/hooks/useWordPressPage';
import BlockRenderer from '../BlockRenderer';

interface TicketCardProps {
  block: ContentBlock;
}

const TicketCard: React.FC<TicketCardProps> = ({ block }) => {
  return (
    <div className="relative transform -rotate-1">
      <div className="bg-white/90 backdrop-blur-sm h-96 shadow-xl">
        <div className="absolute inset-8 border-b-4 border-primary">
          <BlockRenderer blocks={block.children} />
        </div>
      </div>
      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-accent transform rotate-45"></div>
    </div>
  );
};

export default TicketCard;
