'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const BackgroundFallback = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Add spring physics for smoother mouse following
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    // Client-side only code
    setIsMounted(true);
    
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

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Transform mouse position for background movement (subtle parallax effect)
  const backgroundX = useTransform(springX, [0, dimensions.width], [10, -10]);
  const backgroundY = useTransform(springY, [0, dimensions.height], [10, -10]);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 bg-black overflow-hidden">
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(circle at center, #0a0a20 0%, #000000 100%)'
        }} />
      </div>
    );
  }

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 bg-black overflow-hidden"
      style={{ 
        x: backgroundX, 
        y: backgroundY,
        background: 'radial-gradient(circle at center, #0a0a20 0%, #000000 100%)'
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
    </motion.div>
  );
};

export default BackgroundFallback; 