import { ArrowRight, FileText, Activity, ShieldCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "Data Ingestion",
      description: "Submit grievance records with standardized categorical parameters and verifiable location vectors.",
      icon: FileText,
    },
    {
      title: "System Routing",
      description: "Automated distribution engine routes the incident to the appropriate municipal department.",
      icon: Activity,
    },
    {
      title: "Resolution & Audit",
      description: "Authorities log resolution details. System preserves an immutable audit trail for compliance review.",
      icon: ShieldCheck,
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">
            Operational Workflow
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            A standardized ingestion and resolution pipeline designed for municipal accountability.
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-0">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col relative border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8">
                {/* Connection arrows for large screens */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20 h-8 w-8 bg-slate-100 dark:bg-slate-800 items-center justify-center border border-slate-200 dark:border-slate-700 rounded-sm">
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </div>
                )}
                
                <div className="mb-6 flex justify-between items-start">
                   <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                    <step.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-5xl text-slate-100 dark:text-slate-800 font-bold tracking-tighter">
                    0{idx + 1}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
