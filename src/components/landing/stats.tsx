export function Stats() {
  return (
    <section className="py-20 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-slate-700 dark:border-slate-800 bg-slate-800/50 dark:bg-slate-950/50">
          
          <div className="text-center py-10 px-4 border-b md:border-b-0 md:border-r border-slate-700 dark:border-slate-800">
            <h4 className="text-4xl font-semibold tracking-tight mb-2 text-white">99.8%</h4>
            <p className="text-slate-400 text-sm font-medium">Uptime Guarantee</p>
          </div>
          
          <div className="text-center py-10 px-4 border-b md:border-b-0 lg:border-r border-slate-700 dark:border-slate-800">
            <h4 className="text-4xl font-semibold tracking-tight mb-2 text-white">12k+</h4>
            <p className="text-slate-400 text-sm font-medium">Logged Incidents</p>
          </div>
          
          <div className="text-center py-10 px-4 border-b md:border-b-0 md:border-r border-slate-700 dark:border-slate-800">
            <h4 className="text-4xl font-semibold tracking-tight mb-2 text-white">24h</h4>
            <p className="text-slate-400 text-sm font-medium">Avg. SLA Processing</p>
          </div>
          
          <div className="text-center py-10 px-4 border-slate-700 dark:border-slate-800">
            <h4 className="text-4xl font-semibold tracking-tight mb-2 text-white">0</h4>
            <p className="text-slate-400 text-sm font-medium">Critical Breaches</p>
          </div>

        </div>
      </div>
    </section>
  );
}
