import React from 'react';
import { useParams } from 'react-router-dom';
import { useWordPressPage } from '@/hooks/useWordPressPage';
import BlockRenderer from '@/components/BlockRenderer';

const WordPressPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { pageContent, loading, error } = useWordPressPage(slug || '');

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading page...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  if (!pageContent) {
    return <div className="min-h-screen flex items-center justify-center text-white">Page not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <BlockRenderer blocks={pageContent} />
    </div>
  );
};

export default WordPressPage;