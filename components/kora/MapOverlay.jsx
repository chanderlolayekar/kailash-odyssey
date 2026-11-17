import { Mountain, Route } from 'lucide-react';

export default function MapOverlay() {
  return (
    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
      <div className="glass-shard rounded-lg px-4 py-2.5 flex items-center gap-3">
        <Mountain className="w-4 h-4 text-accent" />
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-heading">
            Mount Kailash Kora
          </p>
          <p className="text-xs font-heading text-foreground">
            52km Sacred Circuit
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="glass-shard rounded-lg px-4 py-2.5 space-y-1.5">
        <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-heading mb-2">
          Legend
        </p>
        <LegendItem color="bg-foreground" label="Settlement" />
        <LegendItem color="bg-primary" label="Monastery" />
        <LegendItem color="bg-accent" label="Sacred Site" />
        <LegendItem color="bg-destructive" label="Mountain Pass" />
        <div className="flex items-center gap-2 pt-1">
          <div className="w-4 h-px border-t-2 border-dashed border-primary" />
          <span className="text-[9px] text-muted-foreground">Kora Path</span>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-[9px] text-muted-foreground">{label}</span>
    </div>
  );
}
