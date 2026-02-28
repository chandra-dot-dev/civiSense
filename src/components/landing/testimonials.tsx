export function Testimonials() {
  const testimonials = [
    {
      quote: "Before CivicResolve, reporting a pothole felt like shouting into a void. Now I get timestamped updates. It's refreshing.",
      author: "Sarah J.",
      role: "Citizen",
      initial: "S",
    },
    {
      quote: "The automated escalation rules ensure nothing falls through the cracks. It's completely transformed how our municipality operates.",
      author: "Officer David M.",
      role: "Public Works Dept.",
      initial: "D",
    },
    {
      quote: "The analytics dashboard gave us the data we needed to allocate budget where complaints were clustering. Unmatched transparency.",
      author: "Mayor Reynolds",
      role: "City Administration",
      initial: "R",
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Trusted by Citizens & Officials
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <p className="text-slate-700 dark:text-slate-300 italic mb-8 relative">
                <span className="text-4xl text-blue-200 dark:text-blue-900/50 absolute -top-4 -left-3 leading-none font-serif">"</span>
                {t.quote}
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
                  {t.initial}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{t.author}</h4>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
