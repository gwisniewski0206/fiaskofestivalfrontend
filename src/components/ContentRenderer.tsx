import React from 'react';
import { ContentBlock } from '@/hooks/useWordPressPage';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { parseStyleAttribute } from '@/lib/parseStyleAttribute';

interface ContentRendererProps {
  blocks: ContentBlock[];
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ blocks }) => {
  const renderBlock = (block: ContentBlock, index: number) => {
    const { type, content, attributes, children } = block;
    const style = parseStyleAttribute(attributes.style);
    const { style: _style, ...restAttributes } = attributes;

    // Handle different block types
    switch (type) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        const Tag = type as keyof JSX.IntrinsicElements;
        return <Tag key={index} style={style} {...restAttributes}>{content}</Tag>;

      case 'p':
        return <p key={index} style={style} {...restAttributes}>{content}</p>;

      case 'div':
        return (
          <div key={index} style={style} {...restAttributes}>
            {children.map(renderBlock)}
          </div>
        );

      case 'a':
        if (attributes.class && attributes.class.includes('wp-block-button__link')) {
          return (
            <Button asChild key={index}>
              <Link to={attributes.href || '#'}>{content}</Link>
            </Button>
          );
        }
        return <Link key={index} to={attributes.href || '#'} style={style} {...restAttributes}>{content}</Link>;

      default:
        return null;
    }
  };

  return <>{blocks.map(renderBlock)}</>;
};

export default ContentRenderer;
