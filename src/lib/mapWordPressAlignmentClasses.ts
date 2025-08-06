export const mapWordPressAlignmentClasses = (classNames: string): string => {
  if (!classNames) return '';

  const alignmentClasses: { [key: string]: string } = {
    'has-text-align-left': 'text-left',
    'has-text-align-center': 'text-center',
    'has-text-align-right': 'text-right',
    'has-text-align-justify': 'text-justify',
  };

  const classesArray = classNames.split(' ');
  const mappedClasses = classesArray.map(cls => alignmentClasses[cls] || cls);

  return mappedClasses.join(' ');
};