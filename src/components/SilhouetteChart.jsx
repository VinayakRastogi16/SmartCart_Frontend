import PlotModule from 'react-plotly.js'


import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const COLORS = ['#E84855', '#028090', '#02C39A', '#F3A712']
const CLUSTER_NAMES = {
  0: 'Budget Shoppers',
  1: 'Steady Savers',
  2: 'Premium Spenders',
  3: 'Casual Browsers'
}

const Plot = PlotModule.default || PlotModule

export default function SilhouetteChart({ silSamples, labels, k, avgScore }) {
  if (!silSamples || silSamples.length === 0) return null
    console.log("Plot =", Plot);
  // Build traces: one bar trace per cluster, sorted descending
  const traces = Array.from({ length: k }, (_, ci) => {
    const clusterScores = silSamples
      .map((s, i) => ({ score: s, label: labels[i] }))
      .filter(d => d.label === ci)
      .map(d => d.score)
      .sort((a, b) => b - a)

    return {
      type: 'bar',
      orientation: 'h',
      name: CLUSTER_NAMES[ci] || `Cluster ${ci}`,
      x: clusterScores,
      y: clusterScores.map((_, i) => i + ci * (clusterScores.length + 10)),
      marker: { color: COLORS[ci % COLORS.length], opacity: 0.85 },
      showlegend: true,
    }
  })

  return (
    // <>Hello</>
    <div>
      {/* Avg score badge */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Avg Silhouette Score
        </span>
        <span
          className="font-mono font-bold text-lg"
          style={{ color: avgScore > 0.5 ? '#02C39A' : avgScore > 0.3 ? '#F3A712' : '#E84855' }}
        >
          {avgScore}
        </span>
        <span className="text-xs text-zinc-600">
          {avgScore > 0.5 ? '(strong separation)' : avgScore > 0.3 ? '(reasonable)' : '(weak)'}
        </span>
      </div>

    //   <Plot
        data={traces}
        layout={{
          height: 340,
          paper_bgcolor: '#111111',
          plot_bgcolor: '#111111',
          margin: { t: 10, r: 20, b: 40, l: 10 },
          barmode: 'stack',
          xaxis: {
            title: { text: 'Silhouette coefficient', font: { color: '#52525b', size: 11 } },
            gridcolor: '#27272a',
            zerolinecolor: '#52525b',
            tickfont: { color: '#52525b', size: 10 },
            range: [-0.2, 1],
          },
          yaxis: {
            showticklabels: false,
            gridcolor: '#27272a',
          },
          legend: {
            font: { color: '#a1a1aa', size: 11 },
            bgcolor: 'transparent',
            orientation: 'h',
            y: -0.15,
          },
          shapes: [{
            type: 'line',
            x0: avgScore, x1: avgScore,
            y0: 0, y1: 1,
            yref: 'paper',
            line: { color: '#ffffff', width: 1.5, dash: 'dot' },
          }],
        }}
        config={{ displayModeBar: false, responsive: true }}
        style={{ width: '100%' }}
      />
    </div>
  )
}