import PlotModule from 'react-plotly.js';

const Plot = PlotModule.default || PlotModule;

const CLUSTER_NAMES = {
  0: 'Budget Shoppers',
  1: 'Steady Savers',
  2: 'Premium Spenders',
  3: 'Casual Browsers'
}

const COLORS = ['#E84855', '#028090', '#02C39A', '#F3A712']

export default function PCAScatter3D({ points, k }) {
  if (!points || points.length === 0) return null

  // Split points by cluster
  const traces = Array.from({ length: k }, (_, ci) => {
    const clusterPts = points.filter(p => p.cluster === ci)
    return {
      type: 'scatter3d',
      mode: 'markers',
      name: CLUSTER_NAMES[ci] || `Cluster ${ci}`,
      x: clusterPts.map(p => p.pc1),
      y: clusterPts.map(p => p.pc2),
      z: clusterPts.map(p => p.pc3),
      marker: {
        size: 3.5,
        color: COLORS[ci % COLORS.length],
        opacity: 0.75,
      },
    }
  })

  console.log("PCAScatter3D Plot =", Plot);

  return (
    <Plot
      data={traces}
      layout={{
        height: 420,
        paper_bgcolor: '#111111',
        plot_bgcolor: '#111111',
        margin: { t: 10, r: 10, b: 10, l: 10 },
        legend: {
          font: { color: '#a1a1aa', size: 11 },
          bgcolor: 'transparent',
        },
        scene: {
          bgcolor: '#111111',
          xaxis: {
            title: { text: 'PC1', font: { color: '#52525b', size: 11 } },
            gridcolor: '#27272a',
            zerolinecolor: '#27272a',
            tickfont: { color: '#52525b', size: 9 },
          },
          yaxis: {
            title: { text: 'PC2', font: { color: '#52525b', size: 11 } },
            gridcolor: '#27272a',
            zerolinecolor: '#27272a',
            tickfont: { color: '#52525b', size: 9 },
          },
          zaxis: {
            title: { text: 'PC3', font: { color: '#52525b', size: 11 } },
            gridcolor: '#27272a',
            zerolinecolor: '#27272a',
            tickfont: { color: '#52525b', size: 9 },
          },
        },
      }}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: '100%' }}
    />

    // <>Hello</>
  )
}