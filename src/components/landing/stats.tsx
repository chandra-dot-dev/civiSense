export function Stats() {
  return (
    <section className="py-24 bg-blue-600 dark:bg-blue-950 text-white relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/50 blur-3xl mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/50 blur-3xl mix-blend-multiply"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-blue-400/30 dark:divide-blue-800/50">
          
          <div className="text-center py-6 md:py-0 px-4">
            <h4 className="text-5xl font-extrabold tracking-tight mb-2">98%</h4>
            <p className="text-blue-100 font-medium text-lg">Resolved within SLA</p>
          </div>
          
          <div className="text-center py-6 md:py-0 px-4">
            <h4 className="text-5xl font-extrabold tracking-tight mb-2">12k+</h4>
            <p className="text-blue-100 font-medium text-lg">Total Complaints Fixed</p>
          </div>
          
          <div className="text-center py-6 md:py-0 px-4">
            <h4 className="text-5xl font-extrabold tracking-tight mb-2">24h</h4>
            <p className="text-blue-100 font-medium text-lg">Avg. Resolution Time</p>
          </div>
          
          <div className="text-center py-6 md:py-0 px-4">
            <h4 className="text-5xl font-extrabold tracking-tight mb-2">0</h4>
            <p className="text-blue-100 font-medium text-lg">Open Critical Issues</p>
          </div>

        </div>
      </div>
    </section>
  );
}
