
import React from 'react';
import { ContentBlock } from '@/hooks/useWordPressPage';
import BlockRenderer from '../BlockRenderer';

interface ColumnsBlockProps {
  block: ContentBlock;
}

const ColumnsBlock: React.FC<ColumnsBlockProps> = ({ block }) => {
  return (
    <div className="flex w-full gap-4">
      {block.children.map((col, colIndex) => (
        <div key={colIndex} className="flex-1">
          <BlockRenderer blocks={col.children} />
        </div>
      ))}
    </div>
  );
};

export default ColumnsBlock;
