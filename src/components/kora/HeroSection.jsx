import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mountain } from 'lucide-react';

const HERO_IMAGE = 'https://media.base44.com/images/public/69c74c548bc36971857302ac/a7ed38da6_generated_e02f1b79.png';

export default function HeroSection({ onEnter }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  const handleMouseMove = (e) => {
    const x = ((e.clientX / window.innerWidth) - 0.5) * 2;
    const y = ((e.clientY / window.innerHeight) - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => onEnter(), 800);
  };

  const lat = (31.0672 + mousePos.y * 0.02).toFixed(4);
  const lng = (81.3119 + mousePos.x * 0.02).toFixed(4);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden cursor-crosshair"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        >
          {/* Background image with parallax */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            animate={{
              x: mousePos.x * -15,
              y: mousePos.y * -10,
              scale: 1.05,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

          {/* Floating coordinate readout */}
          <motion.div
            className="absolute glass-shard rounded-lg px-4 py-2 font-mono text-xs tracking-widest text-muted-foreground pointer-events-none"
            animate={{
              left: `calc(${(mousePos.x + 1) * 50}% - 80px)`,
              top: `calc(${(mousePos.y + 1) * 50}% - 40px)`,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <span className="text-accent">{lat}°N</span>
            <span className="mx-2 text-border">|</span>
            <span className="text-primary">{lng}°E</span>
          </motion.div>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-32 px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.7, 0, 0.3, 1] }}
              className="text-center"
            >
              <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-heading">
                31.0672°N &middot; 81.3119°E &middot; 6,638m
              </p>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-heading font-light tracking-wide text-foreground mb-2">
                Mount Kailash
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light mb-10 max-w-lg mx-auto">
                The 52km Sacred Circumambulation
              </p>

              <motion.button
                onClick={handleEnter}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 kora-transition focus:outline-none focus:ring-[3px] focus:ring-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Start the Kora circumambulation journey"
              >
                <Mountain className="w-5 h-5 text-primary" />
                <span className="font-heading text-sm tracking-widest uppercase text-foreground">
                  Begin Circumambulation
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              className="absolute bottom-8 animate-float"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.5 }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>

          {/* Top-left branding */}
          <motion.div
            className="absolute top-6 left-6 md:top-8 md:left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground font-heading">
              Altitude of Enlightenment
            </p>
          </motion.div>

          {/* Top-right elevation */}
          <motion.div
            className="absolute top-6 right-6 md:top-8 md:right-8 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-heading">
              Peak Elevation
            </p>
            <p className="text-2xl font-heading font-light text-foreground">
              6,638<span className="text-sm text-muted-foreground ml-1">m</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
