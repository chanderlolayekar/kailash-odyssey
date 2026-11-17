import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useMemo } from 'react';

const TYPE_COLORS = {
  town: '#F2F0E9',
  sacred: '#D97706',
  monastery: '#2B65EC',
  pass: '#EF4444',
};

function createIcon(type, isActive, isSaved) {
  const color = TYPE_COLORS[type] || '#F2F0E9';
  const size = type === 'pass' ? 16 : 12;
  const glow = isActive ? `0 0 12px ${color}60` : 'none';
  const border = isSaved ? '2px solid #D97706' : `2px solid ${color}`;
  
  return L.divIcon({
    className: 'custom-waypoint-icon',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${isActive ? color : color + '60'};
      border: ${border};
      box-shadow: ${glow};
      transition: all 0.6s cubic-bezier(0.7, 0, 0.3, 1);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function WaypointMarker({ waypoint, isActive, isSaved, onClick }) {
  const icon = useMemo(
    () => createIcon(waypoint.type, isActive, isSaved),
    [waypoint.type, isActive, isSaved]
  );

  return (
    <Marker
      position={waypoint.coordinates}
      icon={icon}
      eventHandlers={{ click: onClick }}
      aria-label={`Waypoint: ${waypoint.name}, Elevation ${waypoint.elevation} meters${waypoint.id === 'dolma-la' ? ', highest point of the Kora' : ''}`}
    >
      <Popup className="kora-popup">
        <div className="font-heading text-sm font-medium">{waypoint.name}</div>
        <div className="text-xs text-muted-foreground">{waypoint.elevation}m · km {waypoint.km}</div>
      </Popup>
    </Marker>
  );
}
