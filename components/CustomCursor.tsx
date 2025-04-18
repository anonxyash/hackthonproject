'use client';

import { useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Optimized spring config for smoother movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Debounced cursor update using RAF
  const updateCursor = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      cursorX.set(e.clientX - 7.5); // Half of the new 15px size
      cursorY.set(e.clientY - 7.5); // Half of the new 15px size
    });
  }, [cursorX, cursorY]);

  useEffect(() => {
    let rafId: number;
    let lastX = -100;
    let lastY = -100;

    const moveCursor = (e: MouseEvent) => {
      // Only update if cursor has moved more than 1px
      if (Math.abs(e.clientX - lastX) > 1 || Math.abs(e.clientY - lastY) > 1) {
        lastX = e.clientX;
        lastY = e.clientY;
        updateCursor(e);
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [updateCursor]);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        transform: 'translate3d(0,0,0)', // Force GPU acceleration
        willChange: 'transform', // Hint to browser for optimization
      }}
    />
  );
};

export default CustomCursor;