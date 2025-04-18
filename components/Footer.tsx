"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerNavigation = {
    services: [
      { name: '3D Web Development', href: '#services' },
      { name: 'UI/UX Design', href: '#services' },
      { name: 'Digital Branding', href: '#services' },
      { name: 'Interactive Experiences', href: '#services' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Careers', href: '#' },
      { name: 'News', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const linkVariants = {
    initial: { x: 0 },
    hover: { x: 10, transition: { duration: 0.3 } }
  };

  // Animated particles for background
  const generateParticles = (count: number) => {
    return [...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/10 rounded-full"
        initial={{ 
          x: Math.random() * 100 + "%", 
          y: Math.random() * 100 + "%", 
          scale: Math.random() * 0.5 + 0.5
        }}
        animate={{ 
          x: [
            Math.random() * 100 + "%", 
            Math.random() * 100 + "%", 
            Math.random() * 100 + "%"
          ],
          y: [
            Math.random() * 100 + "%", 
            Math.random() * 100 + "%", 
            Math.random() * 100 + "%"
          ],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: Math.random() * 20 + 10, 
          ease: "linear" 
        }}
      />
    ));
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 -z-10">
        {generateParticles(30)}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="container-custom max-w-6xl mx-auto px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo and company info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="text-2xl font-bold text-white mb-6 block group">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  3D<span className="text-white/60">Agency</span>
                  <motion.div 
                    className="h-0.5 w-0 bg-white"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.span>
              </Link>
              <p className="text-white/70 mb-6">
                We create immersive digital experiences that connect brands with their audiences through 
                innovative design and cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                {[
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>,
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>,
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                ].map((icon, idx) => (
                  <motion.a 
                    key={idx}
                    href="#" 
                    className="w-12 h-12 rounded-2xl bg-black/30 flex items-center justify-center text-white
                      hover:bg-white hover:text-black transition-all duration-700 border border-white/10
                      backdrop-blur-2xl backdrop-saturate-200 group
                      hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:border-white/20"
                    whileHover={{
                      scale: 1.1,
                      rotate: 10,
                      y: -8,
                      transition: {
                        duration: 0.5,
                        ease: [0.23, 1, 0.32, 1]
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer navigation links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/80"
            >
              Services
            </motion.h3>
            <ul className="space-y-4">
              {footerNavigation.services.map((item) => (
                <motion.li 
                  key={item.name}
                  variants={itemVariants}
                >
                  <motion.a 
                    href={item.href} 
                    className="text-white/60 hover:text-white transition-all duration-300 flex items-center group"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <span className="relative">
                      {item.name}
                      <motion.div
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/30 group-hover:w-full
                          transition-all duration-300 ease-out"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                      />
                    </span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-lg font-semibold mb-6"
            >
              Company
            </motion.h3>
            <ul className="space-y-4">
              {footerNavigation.company.map((item) => (
                <motion.li 
                  key={item.name}
                  variants={itemVariants}
                >
                  <motion.a 
                    href={item.href} 
                    className="text-white/60 hover:text-white transition-colors flex items-center"
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.span variants={linkVariants}>
                      {item.name}
                    </motion.span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-lg font-semibold mb-6"
            >
              Legal
            </motion.h3>
            <ul className="space-y-4">
              {footerNavigation.legal.map((item) => (
                <motion.li 
                  key={item.name}
                  variants={itemVariants}
                >
                  <motion.a 
                    href={item.href} 
                    className="text-white/60 hover:text-white transition-colors flex items-center"
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.span variants={linkVariants}>
                      {item.name}
                    </motion.span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-white/10 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center
            bg-gradient-to-b from-transparent to-black/30 backdrop-blur-sm rounded-t-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p 
            className="text-white/60 text-sm bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-white hover:to-white/80 transition-all duration-500"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            &copy; {currentYear} 3D Agency. All rights reserved.
          </motion.p>
          <motion.p
            className="text-white/60 text-sm mt-4 md:mt-0 flex items-center space-x-2"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <span>Designed with</span>
            <motion.div
              className="relative w-5 h-5 flex items-center justify-center"
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <motion.span
                className="absolute text-red-500/80 blur-sm"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                ♥
              </motion.span>
              <motion.span
                className="relative text-red-400"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                ♥
              </motion.span>
            </motion.div>
            <span>for the modern web</span>
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 