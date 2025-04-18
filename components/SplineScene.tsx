'use client';

export default function SplineScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-purple-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>
    </div>
  );
}