import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WAYPOINTS } from '@/lib/koraData';
import HeroSection from '@/components/kora/HeroSection';
import KoraMap from '@/components/kora/KoraMap';
import ElevationProfile from '@/components/kora/ElevationProfile';
import DayNavigation from '@/components/kora/DayNavigation';
import WaypointPanel from '@/components/kora/WaypointPanel';
import PilgrimBackpack from '@/components/kora/PilgrimBackpack';
import ElevationSpine from '@/components/kora/ElevationSpine';
import MapOverlay from '@/components/kora/MapOverlay';

export default function Home() {
  const [showHero, setShowHero] = useState(true);
  const [bottomCollapsed, setBottomCollapsed] = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  const [selectedWaypoint, setSelectedWaypoint] = useState(null);
  const [savedWaypoints, setSavedWaypoints] = useState([]);

  const handleEnter = useCallback(() => setShowHero(false), []);

  const handleWaypointClick = useCallback((wp) => {
    setSelectedWaypoint(wp);
  }, []);

  const handleToggleSave = useCallback((id) => {
    setSavedWaypoints(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-background relative">
      {/* Hero overlay */}
      {showHero && <HeroSection onEnter={handleEnter} />}

      {/* Main map experience */}
      <AnimatePresence>
        {!showHero && (
          <motion.div
            className="w-full h-full flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
          >
            {/* Main map area */}
            <div className="flex-1 relative flex flex-col">
              {/* Map */}
              <div className="flex-1 relative">
                <KoraMap
                  waypoints={WAYPOINTS}
                  activeDay={activeDay}
                  onWaypointClick={handleWaypointClick}
                  savedWaypoints={savedWaypoints}
                />
                <MapOverlay />
              </div>

              {/* Bottom bar: elevation + day nav */}
              <div className="relative z-10 border-t border-border bg-card/80 backdrop-blur-xl">
                {/* Collapse toggle */}
                <button
                  onClick={() => setBottomCollapsed(v => !v)}
                  className="absolute -top-7 left-1/2 -translate-x-1/2 glass-shard rounded-t-lg px-6 py-1 flex items-center gap-2 text-[10px] tracking-widest uppercase font-heading text-muted-foreground hover:text-foreground kora-transition"
                  aria-label={bottomCollapsed ? 'Expand elevation panel' : 'Collapse elevation panel'}
                >
                  {bottomCollapsed ? '▲ Expand' : '▼ Collapse'}
                </button>

                {!bottomCollapsed && (
                  <>
                    {/* Elevation chart */}
                    <div className="h-24 md:h-28 px-4 pt-2">
                      <ElevationProfile activeDay={activeDay} onDayClick={setActiveDay} />
                    </div>

                    {/* Day navigation */}
                    <div className="px-4 pb-3 md:pb-4">
                      <DayNavigation activeDay={activeDay} onDaySelect={setActiveDay} />
                    </div>
                  </>
                )}

                {bottomCollapsed && (
                  <div className="px-4 py-2">
                    <DayNavigation activeDay={activeDay} onDaySelect={setActiveDay} />
                  </div>
                )}
              </div>
            </div>

            {/* Elevation spine - right side */}
            <div className="w-12 border-l border-border bg-card/50 backdrop-blur-xl hidden lg:block">
              <ElevationSpine
                activeDay={activeDay}
                onWaypointClick={handleWaypointClick}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Waypoint detail panel */}
      {selectedWaypoint && (
        <WaypointPanel
          waypoint={selectedWaypoint}
          onClose={() => setSelectedWaypoint(null)}
          isSaved={savedWaypoints.includes(selectedWaypoint.id)}
          onToggleSave={handleToggleSave}
        />
      )}

      {/* Pilgrim's backpack */}
      {!showHero && (
        <PilgrimBackpack
          savedIds={savedWaypoints}
          onWaypointClick={handleWaypointClick}
          onRemove={(id) => handleToggleSave(id)}
        />
      )}
    </div>
  );
}
