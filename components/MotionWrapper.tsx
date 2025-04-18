'use client';

import { LazyMotion, domAnimation, AnimatePresence, m } from 'framer-motion';

export default function MotionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        <m.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0 }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}