import { BarChart, Bar, XAxis, YAxis, Tooltip,
         ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#028090','#02C39A','#3DBFB8','#62D9D2','#8ECDD5','#B0E8E8']

export default function SpendingChart({ data }) {
  const chartData = Object.entries(data)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={chartData} layout="vertical"
                margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
        <XAxis type="number" tick={{ fill: '#52525b', fontSize: 11 }}
               axisLine={{ stroke: '#27272a' }} tickLine={false}
               tickFormatter={v => '$' + (v/1000).toFixed(0) + 'K'} />
        <YAxis type="category" dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 12 }}
               axisLine={false} tickLine={false} width={55} />
        <Tooltip
          contentStyle={{ background: '#111', border: '1px solid #27272a', borderRadius: 8, fontSize: 12 }}
          formatter={v => ['$' + v.toLocaleString(), 'Total Spend']}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}