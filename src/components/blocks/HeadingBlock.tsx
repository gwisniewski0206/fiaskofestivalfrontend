import React from 'react';
import { ContentBlock } from '@/hooks/useWordPressPage';
import { parseStyleAttribute } from '@/lib/parseStyleAttribute';
import StyledHeadingContainer from '../styled/StyledHeadingContainer';
import StyledSubtitleContainer from '../styled/StyledSubtitleContainer';

interface HeadingBlockProps {
  block: ContentBlock;
  index: number;
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({ block, index }) => {
  const { innerHTML, attributes } = block;
  const style = parseStyleAttribute(attributes.style);
  const { style: _style, class: className, ...restAttributes } = attributes;
  const level = parseInt(attributes.level || '2', 10);

  if (level === 2) {
    return (
      <StyledHeadingContainer index={index} className={className}>
        {innerHTML}
      </StyledHeadingContainer>
    );
  } else if (level === 3) {
    return (
      <StyledSubtitleContainer index={index} className={className}>
        {innerHTML}
      </StyledSubtitleContainer>
    );
  }

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag dangerouslySetInnerHTML={{ __html: innerHTML }} style={style} className={className} {...restAttributes} />;
};

export default HeadingBlock;