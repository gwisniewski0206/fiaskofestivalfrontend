import React from 'react';
import { ContentBlock } from '@/hooks/useWordPressPage';
import { parseStyleAttribute } from '@/lib/parseStyleAttribute';

interface ImageBlockProps {
  block: ContentBlock;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ block }) => {
  const { attributes } = block;
  const style = parseStyleAttribute(attributes.style);
  const { src, alt, class: className, ...restAttributes } = attributes;

  if (!src) {
    // If src is not directly in attributes, check children for img tag
    const imgMatch = block.innerHTML.match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch && imgMatch[1]) {
      attributes.src = imgMatch[1];
    }
  }

  return (
    <img
      src={attributes.src}
      alt={attributes.alt || ''}
      style={style}
      className={className}
      {...restAttributes}
    />
  );
};

export default ImageBlock;