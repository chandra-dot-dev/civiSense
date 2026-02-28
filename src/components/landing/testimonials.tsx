export function Testimonials() {
  const testimonials = [
    {
      quote: "The deployment of CivicResolve resulted in a 42% decrease in unaccounted road maintenance requests. Accountability is now trackable by timestamp.",
      author: "Director Sarah J.",
      role: "Dept. of Transportation",
      initial: "DOT",
    },
    {
      quote: "Automated escalation rules ensure compliance with established SLAs. The reduction in manual status chasing has saved 15 hours per week per officer.",
      author: "Officer David M.",
      role: "Public Works division",
      initial: "PWD",
    },
    {
      quote: "High-level data aggregation provides clear metrics for budget allocation based on incident density. It's a critical tool for municipal planning.",
      author: "Mayor Reynolds",
      role: "City Administration",
      initial: "ADM",
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-2">
            System Endorsements
          </h2>
          <p className="text-sm text-slate-500 uppercase tracking-wider">Documented Operational Impact</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between rounded-sm">
              <div className="mb-6">
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed border-l-2 border-slate-300 dark:border-slate-700 pl-4 font-mono">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="h-8 w-12 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs rounded-sm">
                  {t.initial}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{t.author}</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
