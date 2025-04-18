'use client';

import About from '../../components/About';

export default function AboutPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div className="fixed inset-0 w-full h-full">
        <About />
      </div>
    </div>
  );
}