import { useState, useEffect, useCallback } from 'react';

// Define the structure of a content block
export interface ContentBlock {
  blockName: string;
  innerHTML: string;
  attributes: { [key: string]: string };
  children: ContentBlock[];
}

// Custom hook for fetching and parsing WordPress page content
export const useWordPressPage = (slug: string) => {
  const [pageContent, setPageContent] = useState<ContentBlock[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const wordpressRestApiEndpoint = 'https://vivalafiasko.de/wp-json/wp/v2/pages';

  // Recursive function to parse HTML elements into content blocks
  const parseBlock = useCallback((element: Element): ContentBlock => {
    const attributes: { [key: string]: string } = {};
    for (const attr of Array.from(element.attributes)) {
      attributes[attr.name] = attr.value;
    }

    const blockClassMatch = attributes.class?.match(/wp-block-([\w-]+)/);
    const blockName = blockClassMatch ? blockClassMatch[0] : `core/${element.tagName.toLowerCase()}`;

    const children: ContentBlock[] = [];
    for (const child of Array.from(element.children)) {
      children.push(parseBlock(child));
    }

    // Extract heading level if it's a heading tag
    const tagNameLower = element.tagName.toLowerCase();
    if (tagNameLower.match(/^h[1-6]$/)) {
      attributes.level = tagNameLower.substring(1); // Extracts '1' from 'h1', '2' from 'h2', etc.
    }

    return {
      blockName,
      innerHTML: element.innerHTML,
      attributes,
      children,
    };
  }, []); // Correctly close useCallback here

  useEffect(() => { // This useEffect should be outside the useCallback
    const fetchPageContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${wordpressRestApiEndpoint}?slug=${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data[0].content.rendered, 'text/html');
          const parsedContent = Array.from(doc.body.children).map(parseBlock);
          setPageContent(parsedContent);
        } else {
          setPageContent(null); // Page not found
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error(`Failed to fetch page content for slug: ${slug}`, err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPageContent();
    }
  }, [slug, parseBlock]);

  return { pageContent, loading, error };
};