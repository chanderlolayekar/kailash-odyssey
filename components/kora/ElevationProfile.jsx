import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ELEVATION_DATA } from '@/lib/koraData';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="glass-shard rounded-lg px-3 py-2 text-xs">
      <p className="font-heading text-foreground font-medium">{data.name}</p>
      <p className="text-accent">{data.elevation.toLocaleString()}m</p>
      <p className="text-muted-foreground">km {data.km} · Day {data.day}</p>
    </div>
  );
}

export default function ElevationProfile({ activeDay, onDayClick }) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={ELEVATION_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(222, 82%, 55%)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(222, 82%, 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="km"
            tick={{ fontSize: 10, fill: 'hsl(222, 15%, 55%)' }}
            axisLine={{ stroke: 'hsl(222, 25%, 20%)' }}
            tickLine={false}
            tickFormatter={(v) => `${v}km`}
          />
          <YAxis
            domain={[4400, 5800]}
            tick={{ fontSize: 10, fill: 'hsl(222, 15%, 55%)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}m`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={5630}
            stroke="hsl(0, 70%, 50%)"
            strokeDasharray="4 4"
            strokeOpacity={0.5}
          />
          <Area
            type="monotone"
            dataKey="elevation"
            stroke="hsl(222, 82%, 55%)"
            strokeWidth={2}
            fill="url(#elevGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
