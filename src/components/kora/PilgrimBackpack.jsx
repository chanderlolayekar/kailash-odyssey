import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Backpack, X, Mountain, MapPin } from 'lucide-react';
import { WAYPOINTS } from '@/lib/koraData';

export default function PilgrimBackpack({ savedIds, onWaypointClick, onRemove }) {
  const [isOpen, setIsOpen] = useState(false);
  const saved = WAYPOINTS.filter(w => savedIds.includes(w.id));

  return (
    <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-30">
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 rounded-full glass-shard flex items-center justify-center kora-transition hover:bg-white/10 focus:outline-none focus:ring-[3px] focus:ring-primary shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Pilgrim's backpack, ${saved.length} waypoints saved`}
      >
        <Backpack className="w-5 h-5 text-foreground" />
        {saved.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-[10px] font-heading font-bold text-foreground flex items-center justify-center">
            {saved.length}
          </span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-72 glass-shard rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.7, 0, 0.3, 1] }}
          >
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-sm font-medium text-foreground">
                    Pilgrim's Backpack
                  </h3>
                  <p className="text-[10px] text-muted-foreground tracking-wider">
                    {saved.length} waypoint{saved.length !== 1 ? 's' : ''} saved
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center kora-transition"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {saved.length === 0 ? (
                <div className="p-6 text-center">
                  <MapPin className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Click waypoints on the map to save them here
                  </p>
                </div>
              ) : (
                saved.map((wp) => (
                  <motion.div
                    key={wp.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 kora-transition cursor-pointer border-b border-border/50"
                    onClick={() => {
                      onWaypointClick(wp);
                      setIsOpen(false);
                    }}
                    layout
                  >
                    <Mountain className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-heading text-foreground truncate">{wp.name}</p>
                      <p className="text-[10px] text-muted-foreground">{wp.elevation}m · Day {wp.day}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(wp.id);
                      }}
                      className="w-6 h-6 rounded-full hover:bg-destructive/20 flex items-center justify-center flex-shrink-0"
                      aria-label={`Remove ${wp.name} from backpack`}
                    >
                      <X className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
