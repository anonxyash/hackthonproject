'use client';

import Contact from '../../components/Contact';

export default function ConnectPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div className="fixed inset-0 w-full h-full">
        <Contact />
      </div>
    </div>
  );
}