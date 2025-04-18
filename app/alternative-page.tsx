'use client';

import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SplineScene from '../components/SplineScene';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-[1]">
        <SplineScene />
      </div>
      
      {/* Content layer */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
} 