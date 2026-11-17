import { WAYPOINTS } from '@/lib/koraData';
import { motion } from 'framer-motion';

const MIN_ELEV = 4575;
const MAX_ELEV = 5630;

export default function ElevationSpine({ activeDay, onWaypointClick }) {
  const filtered = activeDay
    ? WAYPOINTS.filter(w => w.day === activeDay)
    : WAYPOINTS;

  return (
    <div className="hidden lg:flex flex-col items-center h-full py-8 relative">
      {/* Vertical line */}
      <div className="absolute top-8 bottom-8 w-px bg-border" />

      {/* Elevation labels */}
      <div className="absolute top-4 text-[9px] font-heading text-accent tracking-wider">
        5,630m
      </div>
      <div className="absolute bottom-4 text-[9px] font-heading text-muted-foreground tracking-wider">
        4,575m
      </div>

      {/* Waypoint dots */}
      {filtered.map((wp) => {
        const pct = ((wp.elevation - MIN_ELEV) / (MAX_ELEV - MIN_ELEV)) * 100;
        const top = 100 - pct;

        return (
          <motion.button
            key={wp.id}
            className="absolute w-3 h-3 rounded-full border-2 border-primary bg-background hover:bg-primary kora-transition z-10
              focus:outline-none focus:ring-[3px] focus:ring-primary"
            style={{ top: `${8 + (top * 0.84)}%` }}
            onClick={() => onWaypointClick(wp)}
            whileHover={{ scale: 1.5 }}
            aria-label={`${wp.name}, ${wp.elevation} meters`}
          >
            <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] text-muted-foreground font-heading tracking-wider opacity-0 hover:opacity-100 kora-transition pointer-events-none">
              {wp.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
