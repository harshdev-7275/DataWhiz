'use client';

import { motion, type Variants } from 'framer-motion';

const futuristicLoaderVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    rotate: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 360,
    transition: {
      duration: 1.5,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

const FuturisticLoader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        className="relative w-24 h-24"
        initial="initial"
        animate="animate"
      >
        <motion.span
          className="absolute w-full h-full border-4 border-ai-blue rounded-full"
          style={{
            clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)',
          }}
          variants={futuristicLoaderVariants}
        />
        <motion.span
          className="absolute w-full h-full border-4 border-ai-cyan rounded-full"
          style={{
            clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
            rotate: 180,
          }}
          variants={futuristicLoaderVariants}
          transition={{
            duration: 1.5,
            ease: 'linear',
            repeat: Infinity,
            delay: 0.2,
          }}
        />
      </motion.div>
    </div>
  );
};

export default FuturisticLoader; 