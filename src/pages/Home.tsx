import { useWordPressPage } from '@/hooks/useWordPressPage';
import BlockRenderer from '@/components/BlockRenderer';
import FloatingElements from '@/components/FloatingElements';
import heroImage from '@/assets/hero-bg.jpg';

const Home = () => {
  const { pageContent, loading, error } = useWordPressPage('home');

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading homepage content...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  if (!pageContent) {
    return <div className="min-h-screen flex items-center justify-center text-white">Homepage content not found.</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingElements />

      {/* Hero Section - Geometric Layout */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}


        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />

        {/* Geometric Hero Content */}
        <div className="relative z-20 px-4 max-w-5xl mx-auto">
          <BlockRenderer blocks={pageContent} />
        </div>
      </section>

      {/* Bauhaus decorative elements for background reveal */}
      <div className="fixed top-1/3 right-8 w-12 h-24 bg-primary/10 transform rotate-45 pointer-events-none" />
      <div className="fixed bottom-1/4 left-12 w-20 h-8 bg-accent/10 transform -skew-x-12 pointer-events-none" />
      <div className="fixed top-2/3 right-1/4 w-16 h-16 border-2 border-secondary/20 transform rotate-12 pointer-events-none" />
    </div>
  );
};

export default Home;