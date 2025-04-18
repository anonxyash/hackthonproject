'use client';

import { Suspense, useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-b from-black via-gray-900 to-black animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white/50 text-sm">Loading 3D Scene...</div>
      </div>
    </div>
  )
});

interface SplineWrapperProps {
  scene: string;
}

export default function SplineWrapper({ scene }: SplineWrapperProps) {
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const maxRetries = 3;

  // Check WebGL support
  const checkWebGLSupport = useCallback(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  }, []);

  useEffect(() => {
    if (!checkWebGLSupport()) {
      setHasError(true);
    }
  }, [checkWebGLSupport]);

  const handleError = useCallback(() => {
    console.error('Failed to load Spline scene');
    if (retryCount < maxRetries) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setHasError(false);
        setIsLoading(true);
      }, 2000);
    } else {
      setHasError(true);
    }
  }, [retryCount]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleRetry = () => {
    setRetryCount(0);
    setHasError(false);
    setIsLoading(true);
  };

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/70 text-center">
            <p className="text-sm">Unable to load 3D scene</p>
            <p className="text-xs mt-2 text-white/50">
              {!checkWebGLSupport()
                ? "WebGL is not supported in your browser"
                : "Failed to initialize 3D scene"}
            </p>
            {retryCount < maxRetries && (
              <button
                onClick={handleRetry}
                className="mt-4 px-4 py-1.5 bg-white/10 text-white/80 text-xs rounded-full hover:bg-white/20 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Suspense fallback={
        <div className="w-full h-full bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/50 text-sm animate-pulse">Loading 3D Scene...</div>
          </div>
        </div>
      }>
        <Spline
          scene={scene}
          className="w-full h-full"
          onError={handleError}
          onLoad={handleLoad}
        />
      </Suspense>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/50 text-sm animate-pulse">Loading 3D Scene...</div>
          </div>
        </div>
      )}
    </div>
  );
}