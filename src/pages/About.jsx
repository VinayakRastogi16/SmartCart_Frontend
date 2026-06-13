function About() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight">About</h1>
      <p className="mt-4 text-muted-foreground">
        SmartCart is a clustering project that asks a simple question:
        if all you had was anonymous shopping cart behaviour, could you
        recover the customer personas a retailer would actually act on?
      </p>
      <p className="mt-4 text-muted-foreground">
        The dashboard ships with a synthetic dataset of 400 customers
        generated from four latent personas — VIPs, weekend casuals,
        deal hunters, and at-risk shoppers. K-means recovers them
        cleanly. Upload your own CSV with the same feature columns to
        run it on real data.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Stack</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        <li>React 19 · Vite 7</li>
        <li>Tailwind v4 design tokens</li>
        <li>Custom K-means++ implementation (Pandas, NumPy, Scikit-learn)</li>
        <li>Power-iteration PCA for 2D & 3D visualization</li>
        <li>Recharts for plots, Papaparse for CSV</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold">CSV format</h2>
      <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-card/60 p-4 font-mono text-xs text-muted-foreground">
{`customer_id,recency_days,frequency,avg_basket,items_per_order,discount_rate,weekend_ratio,category_diversity
C10001,4,12,180.40,9,0.05,0.41,8
C10002,28,3,62.10,4,0.13,0.57,4
...`}
      </pre>
    </article>
  );
}

export default About;