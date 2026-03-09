'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  type LucideIcon,
} from 'lucide-react';

// Type definitions
export type ProductId = string;

export interface FeatureMetric {
  label: string;
  value: string;
  icon?: LucideIcon;
}

export interface ProductData {
  id: ProductId;
  label: string;
  title: string;
  description: string;
  image: string;
  colors: {
    gradient: string;
    glow: string;
    ring: string;
    bar: string;
  };
  statusLabel?: string;
  statusValue?: string;
  features: FeatureMetric[];
}

export interface SpatialProductShowcaseProps {
  products: ProductData[];
  className?: string;
  activeIndex?: number;
  onToggle?: (id: ProductId) => void;
  hideSwitcher?: boolean;
}

// Animation configuration
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: (isLeft: boolean): Variants => ({
    initial: {
      opacity: 0,
      scale: 1.5,
      filter: 'blur(15px)',
      rotate: isLeft ? -30 : 30,
      x: isLeft ? -80 : 80,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      x: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      filter: 'blur(20px)',
      transition: { duration: 0.25 },
    },
  }),
};

// Sub-components
const BackgroundGradient = ({ isLeft, glowColor }: { isLeft: boolean; glowColor?: string }) => {
  const defaultColor = isLeft ? 'rgba(146, 132, 102, 0.15)' : 'rgba(146, 132, 102, 0.10)';
  const color = glowColor || defaultColor;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{
          background: isLeft
            ? `radial-gradient(circle at 0% 50%, ${color}, transparent 50%)`
            : `radial-gradient(circle at 100% 50%, ${color}, transparent 50%)`,
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      />
    </div>
  );
};

const ProductVisual = ({ data, isLeft }: { data: ProductData; isLeft: boolean }) => (
  <motion.div layout="position" className="relative group shrink-0">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className={`absolute inset-[-20%] rounded-full border border-dashed border-white/10 ${data.colors.ring}`}
    />
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-2xl opacity-40`}
    />

    <div className="relative h-40 w-40 md:h-[280px] md:w-[280px] rounded-full border border-white/[0.06] shadow-2xl flex items-center justify-center overflow-hidden bg-black/20 backdrop-blur-sm">
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={data.id}
            src={data.image}
            alt={data.title}
            variants={ANIMATIONS.image(isLeft)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full object-cover rounded-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>
    </div>

  </motion.div>
);

const ProductDetails = ({ data }: { data: ProductData; isLeft: boolean }) => {
  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center text-center"
    >
      <motion.p variants={ANIMATIONS.item} className="text-xs uppercase tracking-[0.25em] text-[#928466] mb-3">
        {data.label}
      </motion.p>
      <motion.h2 variants={ANIMATIONS.item} className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
        <span className="bg-gradient-to-r from-[#E8E0CC] via-[#928466] to-[#E8E0CC] bg-clip-text text-transparent">
          {data.title}
        </span>
      </motion.h2>
      <motion.p variants={ANIMATIONS.item} className="text-white/40 text-sm mb-8 max-w-sm leading-relaxed mx-auto">
        {data.description}
      </motion.p>

      <motion.div variants={ANIMATIONS.item} className="flex justify-center gap-6 md:gap-10">
        {data.features.map((feature) => (
          <div key={feature.label} className="flex flex-col items-center min-w-[72px]">
            <span className="text-2xl md:text-3xl font-bold text-white">{feature.value}</span>
            <span className="text-[10px] md:text-[11px] text-white/30 mt-1.5 uppercase tracking-widest">{feature.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const Switcher = ({
  products,
  activeId,
  onToggle,
}: {
  products: ProductData[];
  activeId: ProductId;
  onToggle: (id: ProductId) => void;
}) => (
  <div className="flex justify-center mt-8 z-50">
    <motion.div layout className="flex items-center gap-1 p-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]">
      {products.map((product) => (
        <motion.button
          key={product.id}
          onClick={() => onToggle(product.id)}
          whileTap={{ scale: 0.96 }}
          className="relative px-4 h-10 md:px-6 md:h-12 rounded-full flex items-center justify-center text-xs md:text-sm font-medium focus:outline-none"
        >
          {activeId === product.id && (
            <motion.div
              layoutId="island-surface"
              className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-white/5 shadow-inner"
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            />
          )}
          <span className={`relative z-10 transition-colors duration-300 ${activeId === product.id ? 'text-white' : 'text-white/40 hover:text-white/60'}`}>
            {product.label}
          </span>
          {activeId === product.id && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-1 h-1 w-6 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  </div>
);

// Main component
export default function SpatialProductShowcase({ products, className, activeIndex: controlledIndex, onToggle: controlledToggle, hideSwitcher }: SpatialProductShowcaseProps) {
  const [internalIndex, setInternalIndex] = useState(0);

  // Support both controlled and uncontrolled modes
  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const currentData = products[activeIndex] || products[0];
  const isLeft = activeIndex % 2 === 0;

  const handleToggle = (id: ProductId) => {
    if (controlledToggle) {
      controlledToggle(id);
    } else {
      const idx = products.findIndex((p) => p.id === id);
      if (idx >= 0) setInternalIndex(idx);
    }
  };

  return (
    <div className={`relative w-full text-white/90 overflow-hidden flex flex-col items-center justify-center py-12 md:py-20 ${className || ''}`}>
      <BackgroundGradient isLeft={isLeft} />

      <main className="relative z-10 w-full px-6 flex flex-col justify-center max-w-6xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 lg:gap-28 w-full ${
            isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          <ProductVisual data={currentData} isLeft={isLeft} />

          <motion.div layout="position" className="w-full max-w-md min-h-[280px] md:min-h-[320px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <ProductDetails
                key={currentData.id}
                data={currentData}
                isLeft={isLeft}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>

      {products.length > 1 && !hideSwitcher && (
        <Switcher products={products} activeId={currentData.id} onToggle={handleToggle} />
      )}
    </div>
  );
}
