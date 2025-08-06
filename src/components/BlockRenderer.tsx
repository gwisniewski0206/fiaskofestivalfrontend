import React from 'react';
import { ContentBlock } from '@/hooks/useWordPressPage';
import ColumnsBlock from './blocks/ColumnsBlock';
import AmenityCard from './styled/AmenityCard';
import AmenityCardContainer from './styled/AmenityCardContainer';
import TicketCard from './styled/TicketCard';
import TicketCardContainer from './styled/TicketCardContainer';
import ButtonBlock from './blocks/ButtonBlock';
import HeadingBlock from './blocks/HeadingBlock';
import ParagraphBlock from './blocks/ParagraphBlock';
import ImageBlock from './blocks/ImageBlock';
import ArtistSlider from './ArtistSlider'; // New import
import { parseStyleAttribute } from '@/lib/parseStyleAttribute';

interface BlockRendererProps {
  blocks: ContentBlock[];
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  const renderBlock = (block: ContentBlock, index: number) => {
    const { attributes, innerHTML, blockName, children } = block;
    const style = parseStyleAttribute(attributes.style);
    const { style: _style, class: className, ...restAttributes } = attributes;
    const classNames = attributes.class || '';

    if (classNames.includes('amenity-card-container')) {
      return <AmenityCardContainer key={index} block={block} />;
    }
    if (classNames.includes('amenity-card')) {
      return <AmenityCard key={index} block={block} />;
    }
    if (classNames.includes('ticket-card-container')) {
      return <TicketCardContainer key={index} block={block} />;
    }
    if (classNames.includes('ticket-card')) {
      return <TicketCard key={index} block={block} />;
    }

    switch (blockName) {
      case 'wp-block-columns':
        return <ColumnsBlock key={index} block={block} />;
      case 'wp-block-heading':
        return <HeadingBlock key={index} block={block} index={index} />;
      case 'wp-block-button':
        return <ButtonBlock key={index} block={block} index={index} />;
      case 'core/p': 
        return <ParagraphBlock key={index} block={block} index={index} />;
      case 'wp-block-image': 
        return <ImageBlock key={index} block={block} />;
      case 'wp-block-buttons': 
        return (
          <div key={index} style={style} className={className} {...restAttributes}>
            <BlockRenderer blocks={children} />
          </div>
        );
      case 'wp-block-group': 
        return (
          <div key={index} style={style} className={className} {...restAttributes}>
            <BlockRenderer blocks={children} />
          </div>
        );
      case 'wp-block-separator': 
        return <hr key={index} style={style} className={className} {...restAttributes} />;
      case 'core/div': // Handle custom HTML block which is parsed as core/div
        if (attributes['data-block-name'] === 'artist-slider') {
          return <ArtistSlider key={index} />;
        }
        // Fallthrough to default if not our specific HTML
      default:
        // Fallback for other blocks - render innerHTML as text
        return (
          <div
            key={index}
            style={style}
            className={className}
            {...restAttributes}
          >
            {innerHTML}
          </div>
        );
    }
  };

  return <>{blocks.map(renderBlock)}</>;
};

export default BlockRenderer;