import {Link} from "react-router"

function Step({ n, title, children }) {
  return (
    <section className="mt-10 border-l-2 border-border pl-6">
      <div className="flex items-center gap-3">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/15 font-mono text-sm text-primary">
          {n}
        </span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-foreground/90">
        {children}
      </div>
    </section>
  );
}

function Code({ children }) {
  return (
    <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-primary">
      {children}
    </code>
  );
}

const Method = ()=>{


  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight">Method</h1>
      <p className="mt-3 text-muted-foreground">SmartCart runs an end-to-end unsupervised pipeline on cart-level features.
        Everything below executes in your browser.</p>
      <Step n = {1} title="Cleaning & Imputation">
        Raw SmartCart data has missing <Code>Income</Code> values - we impute
        with the median. Customers with <Code>Age {`>`} 90</Code> or
        <Code>Income ≥ 600,000</Code> are dropped as outliers (per the source notebook).
      </Step>
      <Step n ={2} title="Feature Engineering">
        We derive behavioural and demographic signals from the raw columns: 
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li><Code>Age = 2026 - Year_Birth</Code></li>
          <li><Code>Customer_Tenure_Days</Code> - days since enrollment, relative to the latest signup</li>
          <li><Code>Total_Spending</Code> — sum of Mnt[Wines, Fruits, Meat, Fish, Sweet, Gold]</li>
          <li><Code>Total_Children = Kidhome + Teenhome</Code></li>
          <li><Code>Education</Code> collapsed to {`{Undergraduate, Graduate, Postgraduate}`}</li>
          <li><Code>Living_With</Code> collapsed to {`{Partner, Alone}`}</li>
        </ul>
      </Step>

      <Step n={3} title="Encoding & standardization">
        Categorical features (<Code>Education</Code>, <Code>Living_With</Code>) are
        one-hot encoded. Every numeric column is z-scored
        (<Code>x' = (x − μ) / σ</Code>) so Euclidean distance is fair across scales.
      </Step>

      <Step n={4} title="PCA projection">
        We center the data, build the covariance matrix, and extract the top
        two eigenvectors via power iteration. Each point is projected onto
        PC1/PC2 — clusters that look well separated here usually are.
      </Step>

      <Step n={5} title="K-Means++ (Lloyd iterations)">
        K-means++ picks the first centroid uniformly, then samples each next
        centroid with probability proportional to squared distance from the
        nearest existing centroid. Lloyd iterations then alternate assignment
        and centroid update until convergence (capped at 100 iterations).
      </Step>

      <Step n={6} title="Agglomerative (Ward linkage)">
        Bottom-up hierarchical clustering. Every point starts in its own
        cluster; at each step we merge the pair whose union minimises the
        within-cluster variance increase (Ward's criterion, computed via the
        Lance-Williams update). Stops when <Code>k</Code> clusters remain.
      </Step>

      <Step n={7} title="Choosing K">
        The elbow chart plots WCSS across <Code>k=2..10</Code>. The "elbow" —
        where additional clusters stop yielding large drops — is a reasonable
        starting point. Combine with silhouette scores and domain intuition.
      </Step>

      <div className="mt-12 rounded-xl border border-border bg-card/60 p-6 text-center backdrop-blur">
        <p className="text-sm text-muted-foreground">Ready to try it on your data?</p>
        <Link
          to="/dashboard"
          className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground glow-lime hover:opacity-90"
        >
          Open the dashboard
        </Link>
      </div>
    </article>
  );
}



export default Method;