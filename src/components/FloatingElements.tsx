import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  opacity: number;
}

const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 10,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-br from-primary/30 to-accent/20 floating-animation"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            animationDelay: `${element.delay}s`,
            opacity: element.opacity,
          }}
        />
      ))}
      
      {/* Additional geometric shapes */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border border-primary/20 rotate-45 floating-animation opacity-20" 
           style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 right-20 w-24 h-24 border border-accent/20 rounded-full floating-animation opacity-30" 
           style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rotate-12 floating-animation" 
           style={{ animationDelay: '6s' }} />
    </div>
  );
};

export default FloatingElements;