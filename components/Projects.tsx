'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SplineWrapper from './SplineWrapper';

export default function Projects() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Show content immediately like About page
    setShowContent(true);
    setIsInitialLoad(false);
  }, []);

  const toggleFullscreen = () => {
    const newState = !isFullscreen;
    setIsFullscreen(newState);
    
    if (newState) {
      setShowContent(false);
      document.body.classList.add('fullscreen-mode');
      // Keep content hidden in fullscreen mode
      setShowContent(false);
    } else {
      // Immediate content show when exiting fullscreen
      setShowContent(true);
      document.body.classList.remove('fullscreen-mode');
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <SplineWrapper
        scene="https://prod.spline.design/wYp6ezr7AKEWYEXl/scene.splinecode"
      />
      
      {showContent && (
        <div className="absolute inset-0">
          {/* Left text */}
          <div
            className="absolute left-12 top-[17%] opacity-0 animate-fade-in"
            style={{ animationDelay: !isFullscreen ? '1s' : '0s' }}
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-pink-300 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_6px_4px_rgba(0,0,0,0.6)]">
              Our work reflects<br />
              purpose, clarity,<br />
              and progress.
            </h1>
            <Link href="/services">
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
            className="absolute right-12 top-[60%] text-right opacity-0 animate-fade-in"
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
              Blending<br />
              innovation, design,<br />
              and technical thinking
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