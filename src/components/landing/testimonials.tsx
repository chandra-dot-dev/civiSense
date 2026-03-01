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
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
            System Endorsements
          </h2>
          <p className="text-sm text-muted-foreground">Documented Operational Impact</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-card p-6 border border-border flex flex-col justify-between rounded-xl shadow-sm">
              <div className="mb-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-border">
                <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs rounded-full">
                  {t.initial}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{t.author}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
