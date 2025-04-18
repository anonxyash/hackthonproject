'use client';

import { useState, useEffect, useRef } from 'react';

interface SplineViewerProps {
  sceneId: string;
  className?: string;
}

export default function SplineViewer({ sceneId, className = '' }: SplineViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimeout = useRef<NodeJS.Timeout | null>(null);

  // We'll try multiple URL formats to ensure compatibility
  const embedUrl = `https://my.spline.design/${sceneId}/`;
  const directUrl = `https://prod.spline.design/${sceneId}/scene.splinecode`;

  useEffect(() => {
    // Set a timeout to detect if loading takes too long
    loadTimeout.current = setTimeout(() => {
      if (!isLoaded) {
        console.warn('Spline scene loading timeout');
        // Don't set error yet, give it more time
      }
    }, 10000);

    // Check if iframe is visible and has content
    const checkIframeContent = () => {
      if (iframeRef.current) {
        try {
          const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
          if (iframeDoc && iframeDoc.body && iframeDoc.body.innerHTML) {
            console.log('Iframe has content');
          }
        } catch (e) {
          console.log('Cannot access iframe content due to CORS');
        }
      }
    };

    // Try to check iframe content after a delay
    const contentCheckTimeout = setTimeout(checkIframeContent, 5000);

    // Cleanup timeouts on unmount
    return () => {
      if (loadTimeout.current) {
        clearTimeout(loadTimeout.current);
      }
      clearTimeout(contentCheckTimeout);
    };
  }, [isLoaded]);

  const handleLoad = () => {
    console.log('Spline iframe loaded successfully');
    setIsLoaded(true);
    if (loadTimeout.current) {
      clearTimeout(loadTimeout.current);
    }
  };

  const handleError = () => {
    console.error('Failed to load Spline iframe');
    setHasError(true);
    setIsLoaded(true); // Mark as loaded to remove loading spinner
    if (loadTimeout.current) {
      clearTimeout(loadTimeout.current);
    }
  };

  // Try the direct URL first as it seems to work more reliably
  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-t-2 border-b-2 border-white rounded-full animate-spin mb-4"></div>
            <p className="text-white text-opacity-70">Loading 3D Experience...</p>
            <p className="text-white/50 text-xs mt-2">This may take a moment...</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-20">
          <div className="text-red-400 max-w-md text-center p-6">
            <p className="text-xl font-semibold mb-2">Failed to load 3D scene</p>
            <p className="text-sm opacity-70 mb-4">The 3D experience could not be loaded.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Iframe with Spline scene */}
      <iframe
        ref={iframeRef}
        src={directUrl}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        title="Spline 3D Scene"
        allow="autoplay; fullscreen; vr"
        loading="eager"
      />
    </div>
  );
} 