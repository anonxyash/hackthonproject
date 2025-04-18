'use client';

import { useState } from 'react';
import Hero from '../components/Hero';
import SplineWrapper from '../components/SplineWrapper';
import { ErrorBoundary } from 'react-error-boundary';

function FallbackComponent() {
  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white/70 text-center">
          <p className="text-sm">Something went wrong with the 3D scene</p>
          <p className="text-xs mt-2 text-white/50">Please refresh the page to try again</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Fallback background gradient */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-black via-gray-900 to-black" />
      
      {/* Spline background */}
      <div className="fixed inset-0 w-full h-full">
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <SplineWrapper
            scene="https://prod.spline.design/Hx1u2eFe3eRfj89v/scene.splinecode"
          />
        </ErrorBoundary>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero onFullscreenChange={setIsFullscreen} />
      </div>
    </div>
  );
}