import { useState, useEffect } from 'react'
import { fetchClusters, fetchElbow, fetchSpending } from '../api/smartcart'
import PCAScatter from '../components/PCAScatter.jsx'
import PCAScatter3D from '../components/PCAScatter3D.jsx'
import ElbowChart from '../components/ElbowChart.jsx'
import SilhouetteChart from '../components/SilhouetteChart.jsx'
import ClusterCards from '../components/ClusterCards.jsx'
import SpendingChart from '../components/SpendingChart.jsx'

const CLUSTER_NAMES = {
  0: 'Budget Shoppers',
  1: 'Steady Savers',
  2: 'Premium Spenders',
  3: 'Casual Browsers'
}

const CLUSTER_COLORS = ['#E84855', '#028090', '#02C39A', '#F3A712']

export default function Dashboard() {
  const [k, setK] = useState(4)
  const [algorithm, setAlgorithm] = useState('kmeans')
  const [clusterData, setClusterData] = useState(null)
  const [elbowData, setElbowData] = useState([])
  const [spendingData, setSpendingData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pcaView, setPcaView] = useState('2d')   // '2d' | '3d'

  // Load elbow + spending once on mount
  useEffect(() => {
    fetchElbow().then(setElbowData).catch(console.error)
    fetchSpending().then(setSpendingData).catch(console.error)
  }, [])

  // Re-run clustering when k or algorithm changes
  useEffect(() => {
    runClustering()
  }, [k, algorithm])

  function runClustering() {
    setLoading(true)
    setError(null)
    fetchClusters(k, algorithm)
      .then(data => { setClusterData(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 pt-16 px-6 pb-12">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-8 mt-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Cluster dashboard</h1>
            {clusterData && (
              <p className="text-zinc-500 text-sm font-mono">
                {clusterData.n_customers} customers · {clusterData.k} clusters
                · {algorithm} · inertia {clusterData.inertia}
                · silhouette <span className="text-[#84cc16]">{clusterData.silhouette}</span>
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-zinc-700 rounded text-sm text-zinc-300 hover:border-zinc-500 transition">
              ↑ Upload CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-zinc-700 rounded text-sm text-zinc-300 hover:border-zinc-500 transition">
              ↓ Export
            </button>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 mb-6">
          <div className="flex flex-wrap gap-8 items-center">

            {/* Algorithm toggle */}
            <div className="flex gap-2">
              {['kmeans', 'agglomerative'].map(alg => (
                <button
                  key={alg}
                  onClick={() => setAlgorithm(alg)}
                  className={`px-4 py-1.5 rounded text-sm font-mono font-medium transition ${
                    algorithm === alg
                      ? 'bg-[#84cc16] text-black'
                      : 'border border-zinc-700 text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  {alg === 'kmeans' ? 'K-Means' : 'Agglomerative'}
                </button>
              ))}
            </div>

            {/* K slider */}
            <div className="flex items-center gap-4 flex-1 min-w-50">
              <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
                Clusters (K)
              </span>
              <input
                type="range" min={2} max={8} value={k}
                onChange={e => setK(Number(e.target.value))}
                className="flex-1 accent-[#84cc16]"
              />
              <span className="text-white font-mono font-bold w-4">{k}</span>
            </div>

            {/* Re-run button */}
            <button
              onClick={runClustering}
              className="flex items-center gap-2 bg-[#84cc16] text-black px-5 py-2 rounded font-semibold text-sm hover:opacity-90 transition"
            >
              {loading ? '⟳ Running...' : '▷ Re-run'}
            </button>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-lg p-4 mb-6 font-mono text-sm">
            Error: {error} — make sure Flask is running on port 5000
          </div>
        )}

        {/* ── Row 1: PCA scatter + Elbow ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* PCA Scatter with 2D/3D toggle */}
          <div className="lg:col-span-2 bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
                PCA Projection
              </h2>
              {/* 2D / 3D toggle */}
              <div className="flex gap-1">
                {['2d', '3d'].map(v => (
                  <button
                    key={v}
                    onClick={() => setPcaView(v)}
                    className={`px-3 py-1 rounded text-xs font-mono font-medium transition ${
                      pcaView === v
                        ? 'bg-[#84cc16] text-black'
                        : 'border border-zinc-700 text-zinc-500 hover:border-zinc-500'
                    }`}
                  >
                    {v.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="h-72 flex items-center justify-center text-zinc-600 font-mono text-sm animate-pulse">
                running {algorithm}...
              </div>
            ) : clusterData ? (
              pcaView === '2d'
                ? <PCAScatter
                    points={clusterData.points}
                    colors={CLUSTER_COLORS}
                    names={CLUSTER_NAMES}
                    k={k}
                  />
                : <PCAScatter3D
                    points={clusterData.points}
                    colors={CLUSTER_COLORS}
                    names={CLUSTER_NAMES}
                    k={k}
                  />
            ) : (
              <div className="h-72 flex items-center justify-center text-zinc-700 font-mono text-sm">
                no data yet
              </div>
            )}
          </div>

          {/* Elbow chart (WCSS + Silhouette dual axis) */}
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest mb-1">
              Elbow
            </h2>
            <div className="flex gap-3 mb-4">
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <span className="w-5 h-0.5 bg-[#02C39A] inline-block rounded" />
                WCSS
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <span className="w-5 h-0.5 bg-[#F3A712] inline-block rounded" style={{borderTop:'2px dashed #F3A712',background:'transparent'}} />
                Silhouette
              </span>
            </div>
            <ElbowChart data={elbowData} selectedK={k} />
            <p className="text-xs text-zinc-600 mt-3">
              Lower inertia = tighter clusters. The "elbow" suggests a good K.
            </p>
          </div>
        </div>

        {/* ── Row 2: Silhouette Analysis (full width) ── */}
        {clusterData?.sil_samples?.length > 0 && (
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 mb-6">
            <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest mb-4">
              Silhouette Analysis
            </h2>
            <SilhouetteChart
              silSamples={clusterData.sil_samples}
              labels={clusterData.labels}
              k={k}
              avgScore={clusterData.silhouette}
              colors={CLUSTER_COLORS}
              names={CLUSTER_NAMES}
            />
          </div>
        )}

        {/* ── Row 3: Cluster cards ── */}
        {clusterData && (
          <div className="mb-6">
            <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest mb-4">
              Segment Profiles
            </h2>
            <ClusterCards
              summary={clusterData.summary}
              colors={CLUSTER_COLORS}
              names={CLUSTER_NAMES}
              k={k}
            />
          </div>
        )}

        {/* ── Row 4: Spending breakdown ── */}
        {Object.keys(spendingData).length > 0 && (
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest mb-4">
              Spending by Category
            </h2>
            <SpendingChart data={spendingData} />
          </div>
        )}

      </div>
    </div>
  )
}