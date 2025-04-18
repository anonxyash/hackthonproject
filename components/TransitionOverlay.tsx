'use client';

interface TransitionOverlayProps {
  isActive: boolean;
}

export default function TransitionOverlay({ isActive }: TransitionOverlayProps) {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-xl bg-black/30 flex items-center justify-center animate-fade-in">
      <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin" />
      <div className="absolute mt-24 text-white/70 text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
        Loading...
      </div>
    </div>
  );
}