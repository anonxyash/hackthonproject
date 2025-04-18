'use client';

import Services from '../../components/Services';

export default function ServicesPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div className="fixed inset-0 w-full h-full">
        <Services />
      </div>
    </div>
  );
}