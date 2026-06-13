import { ScatterChart, Scatter, XAxis, YAxis, Tooltip,
         ResponsiveContainer, Cell } from 'recharts'

export default function PCAScatter({ points, colors, names, k }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
        <XAxis dataKey="pc1" name="PC1" tick={{ fill: '#52525b', fontSize: 11 }}
               axisLine={{ stroke: '#27272a' }} tickLine={false} label={{ value: 'PC1', position: 'insideBottom', offset: -10, fill: '#52525b', fontSize: 11 }} />
        <YAxis dataKey="pc2" name="PC2" tick={{ fill: '#52525b', fontSize: 11 }}
               axisLine={{ stroke: '#27272a' }} tickLine={false} label={{ value: 'PC2', angle: -90, position: 'insideLeft', fill: '#52525b', fontSize: 11 }} />
        <Tooltip
          cursor={{ strokeDasharray: '3 3', stroke: '#3f3f46' }}
          contentStyle={{ background: '#111', border: '1px solid #27272a', borderRadius: 8, fontSize: 12 }}
          formatter={(val) => val.toFixed(3)}
        />
        <Scatter data={points} isAnimationActive={false}>
          {points.map((p, i) => (
            <Cell key={i} fill={colors[p.cluster % colors.length]} fillOpacity={0.7} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  )
}