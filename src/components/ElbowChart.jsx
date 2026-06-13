import { ComposedChart, Line, XAxis, YAxis, Tooltip,
         ResponsiveContainer, ReferenceLine, Legend } from 'recharts'

export default function ElbowChart({ data, selectedK }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart data={data} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
        <XAxis dataKey="k" tick={{ fill: '#52525b', fontSize: 11 }}
               axisLine={{ stroke: '#27272a' }} tickLine={false} />

        {/* Left Y — WCSS */}
        <YAxis yAxisId="wcss" orientation="left"
               tick={{ fill: '#52525b', fontSize: 10 }}
               axisLine={{ stroke: '#27272a' }} tickLine={false}
               tickFormatter={v => (v / 1000).toFixed(0) + 'k'} />

        {/* Right Y — Silhouette */}
        <YAxis yAxisId="sil" orientation="right"
               tick={{ fill: '#F3A712', fontSize: 10 }}
               axisLine={{ stroke: '#27272a' }} tickLine={false}
               domain={[0.3, 0.5]} />

        <Tooltip
          contentStyle={{ background: '#111', border: '1px solid #27272a',
                          borderRadius: 8, fontSize: 12 }}
          labelFormatter={v => `K = ${v}`}
        />
        <Legend
          wrapperStyle={{ fontSize: 11, color: '#a1a1aa', paddingTop: 8 }}
        />

        {/* Vertical line at selected K */}
        <ReferenceLine yAxisId="wcss" x={selectedK}
                       stroke="#84cc16" strokeDasharray="4 2" strokeWidth={1.5}
                       label={{ value: `K=${selectedK}`, fill: '#84cc16', fontSize: 10 }} />

        {/* WCSS line */}
        <Line yAxisId="wcss" type="monotone" dataKey="wcss"
              name="WCSS" stroke="#02C39A" strokeWidth={2}
              dot={{ fill: '#02C39A', r: 4 }} activeDot={{ r: 6 }} />

        {/* Silhouette line */}
        <Line yAxisId="sil" type="monotone" dataKey="silhouette"
              name="Silhouette" stroke="#F3A712" strokeWidth={2}
              strokeDasharray="5 3"
              dot={{ fill: '#F3A712', r: 4 }} activeDot={{ r: 6 }} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}