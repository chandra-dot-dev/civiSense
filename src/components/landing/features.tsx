import { CheckCircle2, Clock, MapPin, Send, ShieldAlert, TrendingUp } from "lucide-react";

const features = [
  {
    title: "Real-time Tracking",
    description: "Citizens get instant updates at every stage of their complaint resolution via email and dashboard.",
    icon: Clock,
  },
  {
    title: "Escalation Engine",
    description: "Automated routing to senior officials if SLAs are breached or priority is marked critical.",
    icon: TrendingUp,
  },
  {
    title: "Priority Scoring",
    description: "Smart algorithm prioritizing issues based on category weight, duplicates, and location impact.",
    icon: ShieldAlert,
  },
  {
    title: "Transparency Dashboard",
    description: "Publically accessible stats on resolution times, closed complaints, and active issues.",
    icon: Send,
  },
  {
    title: "Detailed Audit Logs",
    description: "Immutable history of every status change, assignment, and internal note for full accountability.",
    icon: CheckCircle2,
  },
  {
    title: "Geo-Location & Mapping",
    description: "Pinpoint exact problem locations with integrated maps, clustering similar local issues.",
    icon: MapPin,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Built for Enterprise-Scale Governance
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A comprehensive suite of tools designed to streamline public grievance management from submission to resolution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors shadow-sm hover:shadow-md"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
