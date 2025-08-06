import React from 'react';
import { ContentBlock } from '@/hooks/useWordPressPage';
import { parseStyleAttribute } from '@/lib/parseStyleAttribute';
import StyledContentContainer from '../styled/StyledContentContainer';

interface ParagraphBlockProps {
  block: ContentBlock;
  index: number;
}

const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ block, index }) => {
  const { innerHTML, attributes } = block;
  const style = parseStyleAttribute(attributes.style);
  const { style: _style, class: className, ...restAttributes } = attributes;

  return (
    <StyledContentContainer index={index}>
      <p style={style} className={className} {...restAttributes}>
        {innerHTML}
      </p>
    </StyledContentContainer>
  );
};

export default ParagraphBlock;