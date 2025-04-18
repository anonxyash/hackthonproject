'use client';

import Projects from '../../components/Projects';

export default function ProjectsPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div className="fixed inset-0 w-full h-full">
        <Projects />
      </div>
    </div>
  );
}