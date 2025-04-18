'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, Suspense } from 'react';
import type { Application } from '@splinetool/runtime';

const Spline = dynamic(
  () => import('@splinetool/react-spline').then((mod) => {
    if (typeof window !== 'undefined') {
      return mod.default;
    }
    return () => null;
  }),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-black opacity-0 animate-fade-in" style={{ animationDuration: '1.5s' }} />
  }
);

export default function About() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const splineRef = useRef<Application>();

  const onLoad = (splineApp: Application) => {
    splineRef.current = splineApp;
    
    if (splineRef.current) {
      splineRef.current.setVariable('mouseX', 0);
      splineRef.current.setVariable('mouseY', 0);
      console.log('Spline scene loaded and variables initialized');
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!splineRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    splineRef.current.setVariable('mouseX', x);
    splineRef.current.setVariable('mouseY', y);
    
    console.log('Mouse moved:', { x, y });
  };

  const toggleFullscreen = () => {
    const newState = !isFullscreen;
    setIsFullscreen(newState);
    
    if (newState) {
      setShowContent(false);
      document.body.classList.add('fullscreen-mode');
    } else {
      setShowContent(true);
      document.body.classList.remove('fullscreen-mode');
    }
  };

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseMove={onMouseMove}
    >
      <Spline
        scene="https://prod.spline.design/5rseI2QzceGQ8hm5/scene.splinecode"
        className="w-full h-full"
        onLoad={onLoad}
      />
      {showContent && (
        <div className="absolute inset-0">
          {/* Left text */}
          <div
            className="absolute left-12 top-[17%] opacity-0 animate-fade-in"
            style={{ animationDelay: !isFullscreen ? '1s' : '0s' }}
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-pink-300 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_6px_4px_rgba(0,0,0,0.6)]">
              we are a creative<br />
              digital agency<br />
              specializing
            </h1>
            <Link href="/projects">
              <button
                className="mt-6 px-5 py-1.5 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full font-normal text-xs transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 shadow-md opacity-0 animate-fade-in"
                style={{ animationDelay: !isFullscreen ? '1.2s' : '0s' }}
              >
                Next
              </button>
            </Link>
          </div>

          {/* Right text */}
          <div
            className="absolute right-12 top-[70%] text-right opacity-0 animate-fade-in"
            style={{ animationDelay: !isFullscreen ? '1.4s' : '0s' }}
          >
            <button
              onClick={toggleFullscreen}
              className="mb-6 px-5 py-1.5 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full font-normal text-xs transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 shadow-md opacity-0 animate-fade-in"
              style={{ animationDelay: !isFullscreen ? '1.6s' : '0s' }}
            >
              Full Screen
            </button>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-pink-300 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_6px_4px_rgba(0,0,0,0.6)]">
              in crafting<br />
              fluid and intuitive<br />
              website experiences.
            </h2>
          </div>
        </div>
      )}

      {/* Exit Fullscreen Button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed bottom-6 right-6 z-50 px-5 py-1.5 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full font-normal text-xs transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-md animate-fade-scale"
        >
          Exit Fullscreen
        </button>
      )}
    </div>
  );
}