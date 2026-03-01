import { CheckCircle2, Clock, MapPin, Send, ShieldAlert, TrendingUp } from "lucide-react";

const features = [
  {
    title: "Real-time Tracking",
    description: "Citizens receive standardized updates at every stage of their filed case via email and secure portal.",
    icon: Clock,
  },
  {
    title: "Escalation Enforcement",
    description: "Automated routing to senior officials if operational SLAs are breached or priority is critical.",
    icon: TrendingUp,
  },
  {
    title: "Priority Modeling",
    description: "Smart algorithmic sorting based on category classification, duplicates, and location impact.",
    icon: ShieldAlert,
  },
  {
    title: "Performance Analytics",
    description: "Accessible metrics on resolution times, case statuses, and department efficiency.",
    icon: Send,
  },
  {
    title: "Immutable Audit Logs",
    description: "Permanent history of status modifications, assignments, and internal compliance notes.",
    icon: CheckCircle2,
  },
  {
    title: "Geospatial Data",
    description: "Coordinate-based incident plotting, clustering similar localized incidents for batch resolution.",
    icon: MapPin,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4">
            Core System Capabilities
          </h2>
          <p className="text-muted-foreground text-lg">
            A secure suite of protocols designed to streamline grievance processing, tracking, and compliance enforcement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-card p-6 sm:p-8 flex flex-col rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex items-center">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 mr-4">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg tracking-tight text-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
