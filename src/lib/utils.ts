import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const mapWordPressAlignmentClasses = (classNames: string): string => {
  if (!classNames) return '';

  const alignmentMap: { [key: string]: string } = {
    'has-text-align-left': 'ml-[10rem] mr-auto',
    'has-text-align-center': 'mx-auto',
    'has-text-align-right': 'ml-auto mr-[10rem]',
    'has-text-align-justify': 'mx-auto', // Default to center for justify
  };

  const classesArray = classNames.split(' ');
  const mappedClasses = classesArray.map(cls => alignmentMap[cls] || '');

  return mappedClasses.filter(Boolean).join(' ');
};
