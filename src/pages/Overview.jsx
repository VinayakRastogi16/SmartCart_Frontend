import React from "react";
import { Link } from "react-router-dom";
import {ArrowRight, Zap, Boxes, GitBranchPlus, Sparkles} from "lucide-react"

const Overview = ()=>{
    return (
        <>
            <section>
            <div style={{marginTop:"5vh"}}>
                <div className="flex justify-center items-center  ">
                   <span className="rounded-full  border-2 border-gray-800 flex items-center gap-2 text-gray-500" style={{paddingLeft:"2vh", paddingRight:"2vh"}}><span className="rounded-full bg-lime-400 animate-pulse" style={{height:"0.575rem", width:"0.575rem"}}/>v0.2 · kmeans · agglomerative </span> 
                </div>

                <div className="flex justify-center">
                    <h1 className="text-6xl text-center mt-7"><b>Cluster <span className="text-lime-500 text-glow-lime animate-pulse">SmartCart</span><br /> customers right in <br />your browser</b></h1>
                </div>


                <div className="items-center flex justify-center text-center mt-5 text-gray-500 text-lg">
                    <p>Loads the real SmartCart dataset (2,240 customers), engineers <br /> Age, Tenure, Total Spending & more, then runs K-Means,<br /> Agglomerative or DBSCAN with a live PCA projection. Zero server,<br /> zero upload.</p>
                </div>


                <div className="items-center flex justify-center gap-4 mt-8">
                    <Link to="/dashboard"
                    className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground glow-lime hover:opacity-90">
                        Launch dashboard
                        <ArrowRight/>
                    </Link>
                    <Link
                to="/method"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-5 py-2.5 font-medium text-foreground hover:bg-card"
              >
                How it works
              </Link>
                </div>


                {/* Terminal */}

                <div className="mx-auto mt-16 mb-16 max-w-3xl rounded-xl border border-border bg-card/70 p-1 backdrop-blur glow-cyan">
                    <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70"/>
                        <span className="h-2.5 w-2.5 rounded-full bg-neon-amber/80"/>
                        <span className="h-2.5 w-2.5 rounded-full bg-neon-lime/80"/>
                        <span>
                            smartcart ~ pipeline
                        </span>
                    </div>
                       <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-muted-foreground">
                            {`> read smartcart_customer.csv ... 2240 rows
> impute Income (median)             ✓
> engineer Age, Tenure, Spending     ✓
> one-hot Education, Living_With     ✓
> standarize(z-score) + PCA(2)       ✓
> segments: [`}

            <span>High-value</span>
{`, `}
            <span>Engaged</span>
{`, `}
            <span>Casual</span>
{`, `}
            <span>At-risk</span>
{`]
> ready ➜ open dashboard`}
                       </pre>
                </div>
                </div>
            </section>

            {/* Features */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Zap, title: "Instant runs", body: "K-means executes client-side. No data leaves your browser." },
            { icon: Boxes, title: "Persona profiles", body: "Per-cluster averages on every feature, sized by membership." },
            { icon: GitBranchPlus, title: "PCA visualization", body: "2-component projection shows separability at a glance." },
            { icon: Sparkles, title: "Elbow & seeds", body: "Sweep K, change seeds, compare inertia. Iterate fast." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur transition-colors hover:border-primary/40">
              <f.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
            
        </>
    )
}

export default Overview