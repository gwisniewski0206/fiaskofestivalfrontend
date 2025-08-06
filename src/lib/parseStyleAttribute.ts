
export const parseStyleAttribute = (styleString: string | undefined): { [key: string]: string } => {
  if (!styleString) {
    return {};
  }

  const style: { [key: string]: string } = {};
  styleString.split(';').forEach((declaration) => {
    const [property, value] = declaration.split(':');
    if (property && value) {
      const camelCasedProperty = property.trim().replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
      style[camelCasedProperty] = value.trim();
    }
  });

  return style;
};
