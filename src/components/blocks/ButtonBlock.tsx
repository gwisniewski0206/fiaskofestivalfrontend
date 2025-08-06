import { ContentBlock } from '@/hooks/useWordPressPage';
import { Link } from 'react-router-dom';
import { parseStyleAttribute } from '@/lib/parseStyleAttribute';
import { mapWordPressAlignmentClasses, cn } from '../../lib/utils';
import StyledButtonContainer from '../styled/StyledButtonContainer';
import StyledSimpleButton from '../styled/StyledSimpleButton';

interface ButtonBlockProps {
  block: ContentBlock;
  index: number;
}

const ButtonBlock: React.FC<ButtonBlockProps> = ({ block, index }) => {
  const { innerHTML, attributes } = block;
  const { class: className } = attributes; // Extract className

  const linkMatch = innerHTML.match(/href="(.*?)"/);
  const link = linkMatch ? linkMatch[1] : '#';
  const contentMatch = innerHTML.match(/>(.*?)<\/a>/);
  const content = contentMatch ? contentMatch[1] : '';

  // Determine button style based on WordPress classes
  let buttonStyle: 'solid' | 'outlined' | 'alternative' = 'solid'; // Default to solid
  if (className?.includes('is-style-outlined')) {
    buttonStyle = 'outlined';
  } else if (className?.includes('is-style-alternative')) {
    buttonStyle = 'alternative';
  }

  const mappedContainerAlignmentClass = mapWordPressAlignmentClasses(className || '');

  return (
    <div className={cn("relative mb-4 flex", mappedContainerAlignmentClass)}> {/* Wrapper for alignment */}
      {buttonStyle === 'alternative' ? (
        <StyledSimpleButton className={className}> {/* Pass original className for other styles */}
          <Link to={link}>{content}</Link>
        </StyledSimpleButton>
      ) : (
        <StyledButtonContainer index={index} variant={buttonStyle} className={className}> {/* Pass original className for other styles */}
          <Link to={link}>{content}</Link>
        </StyledButtonContainer>
      )}
    </div>
  );
};

export default ButtonBlock;