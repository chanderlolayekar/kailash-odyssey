import { motion } from 'framer-motion';
import { DAY_SEGMENTS } from '@/lib/koraData';

export default function DayNavigation({ activeDay, onDaySelect }) {
  return (
    <div className="flex items-stretch gap-2 md:gap-3 w-full">
      {/* All days button */}
      <button
        onClick={() => onDaySelect(null)}
        className={`px-3 py-2 rounded-lg text-xs font-heading tracking-wider uppercase kora-transition whitespace-nowrap
          focus:outline-none focus:ring-[3px] focus:ring-primary
          ${activeDay === null
            ? 'bg-primary/20 text-primary border border-primary/30'
            : 'glass-shard-light text-muted-foreground hover:text-foreground'
          }`}
        aria-label="Show all days of the Kora"
      >
        All
      </button>

      {DAY_SEGMENTS.map((seg) => (
        <motion.button
          key={seg.day}
          onClick={() => onDaySelect(seg.day)}
          className={`flex-1 flex flex-col items-start px-3 md:px-4 py-2 md:py-3 rounded-lg kora-transition text-left
            focus:outline-none focus:ring-[3px] focus:ring-primary
            ${activeDay === seg.day
              ? 'bg-primary/15 border border-primary/30'
              : 'glass-shard-light hover:bg-secondary/50 border border-transparent'
            }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          aria-label={`Day ${seg.day}: ${seg.title}, ${seg.subtitle}, ${seg.distance}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] tracking-[0.3em] uppercase font-heading ${
              activeDay === seg.day ? 'text-primary' : 'text-muted-foreground'
            }`}>
              Day {seg.day}
            </span>
            <span className={`text-[10px] ${
              activeDay === seg.day ? 'text-accent' : 'text-muted-foreground'
            }`}>
              {seg.distance}
            </span>
          </div>
          <p className={`text-xs font-heading font-medium hidden md:block ${
            activeDay === seg.day ? 'text-foreground' : 'text-muted-foreground'
          }`}>
            {seg.title}
          </p>
          <p className="text-[10px] text-muted-foreground hidden lg:block">
            {seg.subtitle}
          </p>
        </motion.button>
      ))}
    </div>
  );
}
