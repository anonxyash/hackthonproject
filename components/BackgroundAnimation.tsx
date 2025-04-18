'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  velocity: { x: number; y: number };
  animX1: number;
  animX2: number;
  animY1: number;
  animY2: number;
  duration: number;
}

const BackgroundAnimation = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [floatingElements, setFloatingElements] = useState<{
    left: string;
    top: string;
    width: string;
    height: string;
  }[]>([]);

  // Mouse position tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Add spring physics for smoother mouse following
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transform mouse position for background movement (subtle parallax effect)
  const backgroundX = useTransform(springX, [0, dimensions.width || 1], [10, -10]);
  const backgroundY = useTransform(springY, [0, dimensions.height || 1], [10, -10]);
  
  // Transform for grid movement
  const gridX = useTransform(springX, [0, dimensions.width || 1], [0, -10]);
  const gridY = useTransform(springY, [0, dimensions.height || 1], [0, -10]);

  // Generate a random color - moved into useEffect, not called during render
  const getRandomColor = () => {
    const colors = [
      'rgba(30, 144, 255, 0.5)',  // Dodger blue
      'rgba(0, 191, 255, 0.5)',   // Deep sky blue
      'rgba(65, 105, 225, 0.5)',  // Royal blue
      'rgba(138, 43, 226, 0.4)',  // Blue violet
      'rgba(75, 0, 130, 0.4)',    // Indigo
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

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

    // Generate particles with pre-calculated animation values
    const newParticles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      newParticles.push({
        id: i,
        x,
        y,
        size: Math.random() * 5 + 1,
        color: getRandomColor(),
        initialX: x,
        initialY: y,
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        },
        // Pre-calculate animation values to avoid Math.random() during render
        animX1: Math.random() * 100 - 50,
        animX2: Math.random() * 100 - 50,
        animY1: Math.random() * 100 - 50,
        animY2: Math.random() * 100 - 50,
        duration: Math.random() * 20 + 15
      });
    }
    setParticles(newParticles);
    
    // Generate floating elements
    const newFloatingElements = [];
    for (let i = 0; i < 8; i++) {
      newFloatingElements.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 2}px`,
        height: `${Math.random() * 3 + 2}px`,
      });
    }
    setFloatingElements(newFloatingElements);

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
  }, []);

  // Return loading state during server-side rendering or initial mount
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
          x: gridX,
          y: gridY
        }}
      />
      
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            filter: 'blur(1px)',
          }}
          initial={{ x: particle.initialX, y: particle.initialY }}
          animate={{
            x: [
              particle.initialX,
              particle.initialX + particle.animX1,
              particle.initialX + particle.animX2,
              particle.initialX
            ],
            y: [
              particle.initialY,
              particle.initialY + particle.animY1,
              particle.initialY + particle.animY2,
              particle.initialY
            ],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: particle.duration,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Mouse follower glow */}
      <motion.div 
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(79,108,249,0.2) 0%, rgba(79,108,249,0) 70%)',
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          filter: 'blur(40px)'
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
      
      {/* 3D floating elements - ONLY render these client-side */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: element.left,
              top: element.top,
              width: element.width,
              height: element.height,
              backgroundColor: 'white',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              opacity: 0.1,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + index, // Deterministic but varied animation durations
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default BackgroundAnimation; 