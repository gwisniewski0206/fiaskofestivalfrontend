import React from 'react';
import { ContentBlock } from '@/hooks/useWordPressPage';
import { parseStyleAttribute } from '@/lib/parseStyleAttribute';

interface StyledParagraphProps {
  block: ContentBlock;
}

const StyledParagraph: React.FC<StyledParagraphProps> = ({ block }) => {
  const { innerHTML, attributes } = block;
  const style = parseStyleAttribute(attributes.style);
  const { style: _style, ...restAttributes } = attributes;

  const alignment = attributes.align ? `text-${attributes.align}` : 'text-center';
  const width = style.width ? `w-[${style.width}]` : 'w-full';

  return (
    <p
      dangerouslySetInnerHTML={{ __html: innerHTML }}
      className={`${alignment} ${width}`}
      {...restAttributes}
    />
  );
};

export default StyledParagraph;