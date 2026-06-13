export default function ClusterCards({ summary, colors, names, k }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: k }, (_, i) => {
        const s = summary[i]
        if (!s) return null
        return (
          <div key={i} className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4"
               style={{ borderTop: `3px solid ${colors[i]}` }}>
            <div className="text-xs font-mono mb-1" style={{ color: colors[i] }}>
              CLUSTER {i}
            </div>
            <div className="font-bold text-white mb-3">
              {names[i] || `Segment ${i}`}
            </div>
            <div className="space-y-1.5 text-sm">
              {[
                ['Income', `$${Math.round(s.Income).toLocaleString()}`],
                ['Avg Spend', `$${Math.round(s.Total_Spending)}`],
                ['Avg Age', `${Math.round(s.Age)}y`],
                ['Children', s.Total_Children.toFixed(1)],
                ['Web Purchases', Math.round(s.NumWebPurchases)],
                ['Store Purchases', Math.round(s.NumStorePurchases)],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-zinc-500">{label}</span>
                  <span className="text-zinc-200 font-mono">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}