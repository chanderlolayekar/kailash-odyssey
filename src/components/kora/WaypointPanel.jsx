import { motion, AnimatePresence } from 'framer-motion';
import { X, Mountain, Wind, Thermometer, Bookmark, BookmarkCheck, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

//using public - base44 images for waypoint:

const WAYPOINT_IMAGES = {
  'darchen': 'https://media.base44.com/images/public/69c74c548bc36971857302ac/2e38ff2f7_generated_29e519ae.png',
  'tarboche': 'https://media.base44.com/images/public/69c74c548bc36971857302ac/2e38ff2f7_generated_29e519ae.png',
  'chuku': 'https://media.base44.com/images/public/69c74c548bc36971857302ac/321abfeef_generated_49c30300.png',
  'dirapuk': 'https://media.base44.com/images/public/69c74c548bc36971857302ac/5c2ce38a1_generated_da6fc7a0.png',
  'shiva-tshal': 'https://media.base44.com/images/public/69c74c548bc36971857302ac/e3629dd9d_generated_48a619b4.png',
  'dolma-la': 'https://media.base44.com/images/public/69c74c548bc36971857302ac/e3629dd9d_generated_48a619b4.png',
  'gauri-kund': 'https://media.base44.com/images/public/69c74c548bc36971857302ac/321abfeef_generated_49c30300.png',
  'zutulpuk': 'https://media.base44.com/images/public/69c74c548bc36971857302ac/f594ed20c_generated_1f748f24.png',
  'darchen-end': 'https://media.base44.com/images/public/69c74c548bc36971857302ac/2e38ff2f7_generated_29e519ae.png',
};

const TYPE_LABELS = {
  town: 'Settlement',
  sacred: 'Sacred Site',
  monastery: 'Monastery',
  pass: 'Mountain Pass',
};

export default function WaypointPanel({ waypoint, onClose, isSaved, onToggleSave }) {
  if (!waypoint) return null;

  const image = WAYPOINT_IMAGES[waypoint.id];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1200]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-background/70 backdrop-blur-sm z-[1200]"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Panel */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-full md:w-[520px] lg:w-[600px] bg-card border-l border-border overflow-y-auto z-[1201]"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
        >
          {/* Image section - 70% */}
          <div className="relative h-[50vh] md:h-[60vh]">
            <img
              src={image}
              alt={`${waypoint.name} - ${waypoint.subtitle}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full glass-shard flex items-center justify-center kora-transition hover:bg-white/10 focus:outline-none focus:ring-[3px] focus:ring-primary"
              aria-label="Close waypoint details"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>

            {/* Header on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-heading">
                  {TYPE_LABELS[waypoint.type]}
                </span>
                <span className="text-muted-foreground text-[10px]">·</span>
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground font-heading">
                  Day {waypoint.day}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-light text-foreground tracking-wide">
                {waypoint.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{waypoint.subtitle}</p>
            </div>
          </div>

          {/* Stats section - 30% */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                icon={<Mountain className="w-4 h-4 text-primary" />}
                label="Elevation"
                value={`${waypoint.elevation.toLocaleString()}m`}
              />
              <StatCard
                icon={<Wind className="w-4 h-4 text-primary" />}
                label="Oxygen"
                value={waypoint.oxygen}
              />
              <StatCard
                icon={<Thermometer className="w-4 h-4 text-primary" />}
                label="Temperature"
                value={waypoint.temperature}
              />
            </div>

            {/* Distance marker */}
            <div className="flex items-center gap-3 glass-shard-light rounded-lg px-4 py-3">
              <Compass className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground font-heading">
                km {waypoint.km} of 52
              </span>
              <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full kora-transition"
                  style={{ width: `${(waypoint.km / 52) * 100}%` }}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-heading mb-3">
                About this place
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {waypoint.description}
              </p>
            </div>

            {/* Spiritual significance */}
            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-accent font-heading mb-3">
                Spiritual Significance
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {waypoint.spiritual}
              </p>
            </div>

            {/* Save button */}
            <Button
              onClick={() => onToggleSave(waypoint.id)}
              variant={isSaved ? 'default' : 'outline'}
              className="w-full gap-2 kora-transition"
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  <span className="font-heading text-xs tracking-wider uppercase">Saved to Backpack</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span className="font-heading text-xs tracking-wider uppercase">Add to Backpack</span>
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="glass-shard-light rounded-lg p-3 text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-heading mb-1">
        {label}
      </p>
      <p className="text-xs font-heading text-foreground font-medium">{value}</p>
    </div>
  );
}
