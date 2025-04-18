'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface HeroProps {
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

const Hero = ({ onFullscreenChange }: HeroProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after 8.5 seconds with 1s fade
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 8500);

    return () => clearTimeout(timer);
  }, []);

  const toggleFullscreen = () => {
    const newState = !isFullscreen;
    setIsFullscreen(newState);
    onFullscreenChange?.(newState);
    
    if (newState) {
      document.body.classList.add('fullscreen-mode');
    } else {
      document.body.classList.remove('fullscreen-mode');
    }
  };

  return (
    <section className="relative h-screen flex flex-col justify-end pb-12">
      <div className="w-full flex justify-center hero-content">
        {showContent && (
          <div className="text-center max-w-2xl px-4 mb-2 opacity-0 animate-fade-in">
            <div className="space-y-2">
              <h1 className="text-xl md:text-2xl font-bold !transform-none bg-gradient-to-r from-white via-pink-300 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_4px_3px_rgba(0,0,0,0.5)]">
                Crafting Digital Experiences in 3D
              </h1>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed !transform-none max-w-sm mx-auto">
                Where creativity meets code — building stunning sites<br />that sell and scale.
              </p>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <button
                  onClick={toggleFullscreen}
                  className="px-5 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full font-normal text-xs transition-all duration-300 hover:bg-white/20 shadow-md hover:-translate-y-0.5"
                >
                  Full Screen
                </button>
                <Link href="/about">
                  <button className="px-5 py-1.5 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full font-normal text-xs transition-all duration-300 hover:opacity-90 shadow-md hover:-translate-y-0.5">
                    Next
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exit Fullscreen Button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed bottom-6 right-6 z-50 px-5 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full font-normal text-xs transition-all duration-300 hover:bg-white/20"
        >
          Exit Fullscreen
        </button>
      )}
    </section>
  );
};

export default Hero;