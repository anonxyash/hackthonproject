'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SplineWebViewerProps {
  url: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        url?: string;
        'loading-anim'?: string;
      }, HTMLElement>;
    }
  }
}

const SplineWebViewer = ({ url }: SplineWebViewerProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Mouse position tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Add spring physics for smoother mouse following
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    // Set dimensions
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initialize
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Check if the script is already loaded
    if (document.querySelector('script[src*="splinetool/viewer"]')) {
      setScriptLoaded(true);
      return;
    }

    // Load the script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
    script.onload = () => {
      console.log('Spline Viewer script loaded');
      setScriptLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      // We don't remove the script on unmount because other components might need it
    };
  }, [mouseX, mouseY]);

  // Transform mouse position for background movement (subtle parallax effect)
  const backgroundX = useTransform(springX, [0, dimensions.width], [10, -10]);
  const backgroundY = useTransform(springY, [0, dimensions.height], [10, -10]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0"
    >
      {/* Spline viewer - only render after script is loaded */}
      <div style={{ 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: isLoaded ? 1 : -1,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in'
      }}>
        {scriptLoaded && (
          <spline-viewer
            url={url}
            loading-anim="true"
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </div>

      {/* Fallback background with grid - always visible but fades out when Spline loads */}
      <motion.div 
        className="absolute inset-0 bg-black overflow-hidden"
        style={{ 
          x: backgroundX, 
          y: backgroundY,
          background: 'radial-gradient(circle at center, #0a0a20 0%, #000000 100%)',
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.5s ease-in',
          zIndex: isLoaded ? -1 : 1,
        }}
      >
        {/* Grid overlay with depth */}
        <motion.div 
          className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10"
          style={{ 
            backgroundSize: '50px 50px',
            x: useTransform(springX, [0, dimensions.width], [0, -10]),
            y: useTransform(springY, [0, dimensions.height], [0, -10])
          }}
        />
        
        {/* Central glow */}
        <div 
          className="absolute rounded-full blur-3xl opacity-20" 
          style={{
            width: '50vw',
            height: '50vh',
            background: 'radial-gradient(circle, rgba(79,108,249,0.5) 0%, rgba(79,108,249,0) 70%)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Loading indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-t-2 border-b-2 border-white rounded-full animate-spin mb-4"></div>
            <p className="text-white text-opacity-70">Loading 3D Experience...</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SplineWebViewer; 