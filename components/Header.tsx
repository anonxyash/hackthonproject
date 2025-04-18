'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'Connect', href: '/connect' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === pathname) {
      e.preventDefault();
      window.location.reload();
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] pointer-events-none">
      <header
        className="relative top-4 w-[96%] max-w-6xl mx-auto rounded-[18px] py-2.5 pointer-events-auto"
        style={{
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
        }}
      >
        {/* Corner Lines */}
        <div className="absolute top-0 left-0 w-12 h-12">
          <div className="absolute top-0 left-0 w-3 h-[1px] bg-white/20"></div>
          <div className="absolute top-0 left-0 w-[1px] h-3 bg-white/20"></div>
        </div>
        <div className="absolute top-0 right-0 w-12 h-12">
          <div className="absolute top-0 right-0 w-3 h-[1px] bg-white/20"></div>
          <div className="absolute top-0 right-0 w-[1px] h-3 bg-white/20"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-12 h-12">
          <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-white/20"></div>
          <div className="absolute bottom-0 left-0 w-[1px] h-3 bg-white/20"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-12 h-12">
          <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-white/20"></div>
          <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-white/20"></div>
        </div>
        <div className="px-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              onClick={(e) => handleNavClick(e, '/')} 
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              <span className="text-[12px] font-medium tracking-wider">Axiom</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-5">
              {navLinks.map((link, index) => (
                <div
                  key={index}
                  className="animate-fade-in hover:-translate-y-0.5 transition-transform duration-150"
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <Link
                    href={link.href}
                    className={`text-[11px] ${
                      pathname === link.href
                        ? 'text-white bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.15)]'
                        : 'text-white/70 hover:text-white'
                    } transition-all duration-300 px-3 py-1.5 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] rounded-lg hover:bg-white/5`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden z-50 p-1.5 focus:outline-none ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-4 h-4">
                <span
                  className={`absolute h-[1px] w-3 bg-white/60 transform transition-all duration-200 ${
                    mobileMenuOpen ? 'rotate-45 top-[7px]' : 'top-[5px]'
                  }`}
                ></span>
                <span
                  className={`absolute h-[1px] w-2 bg-white/60 transform transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100 top-[9px]'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-[96%] max-w-6xl rounded-lg bg-white/5 backdrop-blur-md transition-all duration-200 ${
            mobileMenuOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0'
          }`}
        >
          <div className="py-2 px-3 flex flex-col space-y-1">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${0.03 * index}s` }}
              >
                <Link
                  href={link.href}
                  className={`text-[11px] py-1 ${
                    pathname === link.href
                      ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                      : 'text-white/50 hover:text-white'
                  } transition-all duration-200 block hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:bg-white/5 px-2.5 rounded-md`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;