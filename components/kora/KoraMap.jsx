import { useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import { KAILASH_CENTER, KORA_PATH } from '@/lib/koraData';
import WaypointMarker from './WaypointMarker';
import 'leaflet/dist/leaflet.css';

function MapController({ activeDay, waypoints }) {
  const map = useMap();

  useEffect(() => {
    if (activeDay === null) {
      map.flyTo(KAILASH_CENTER, 12, { duration: 1.5 });
      return;
    }
    const dayWaypoints = waypoints.filter(w => w.day === activeDay);
    if (dayWaypoints.length > 0) {
      const lats = dayWaypoints.map(w => w.coordinates[0]);
      const lngs = dayWaypoints.map(w => w.coordinates[1]);
      const bounds = [
        [Math.min(...lats) - 0.01, Math.min(...lngs) - 0.01],
        [Math.max(...lats) + 0.01, Math.max(...lngs) + 0.01],
      ];
      map.flyToBounds(bounds, { padding: [60, 60], duration: 1.5 });
    }
  }, [activeDay, map, waypoints]);

  return null;
}

export default function KoraMap({ waypoints, activeDay, onWaypointClick, savedWaypoints }) {
  const pathOptions = useMemo(() => ({
    color: 'hsl(222, 82%, 55%)',
    weight: 3,
    opacity: 0.8,
    dashArray: '8 6',
    lineCap: 'round',
  }), []);

  const glowOptions = useMemo(() => ({
    color: 'hsl(222, 82%, 55%)',
    weight: 8,
    opacity: 0.15,
    lineCap: 'round',
  }), []);

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={KAILASH_CENTER}
        zoom={12}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
        style={{ background: 'hsl(222, 50%, 8%)' }}
      >
        {/* Terrain base layer */}
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
          maxZoom={17}
        />
        {/* Subtle dark overlay to maintain color palette */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution=''
          opacity={0.35}
        />

        {/* Glow path */}
        <Polyline positions={KORA_PATH} pathOptions={glowOptions} />
        {/* Main path */}
        <Polyline positions={KORA_PATH} pathOptions={pathOptions} />

        {waypoints.map((wp) => (
          <WaypointMarker
            key={wp.id}
            waypoint={wp}
            isActive={activeDay === null || wp.day === activeDay}
            isSaved={savedWaypoints.includes(wp.id)}
            onClick={() => onWaypointClick(wp)}
          />
        ))}

        <MapController activeDay={activeDay} waypoints={waypoints} />
      </MapContainer>

      {/* Map overlay gradient edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-background/40 to-transparent" />
      </div>
    </div>
  );
}
