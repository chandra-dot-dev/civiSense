import { Button } from "@/components/ui/button";
import { ArrowRight, Edit3, Eye, CheckCircle } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "1. Submit",
      description: "Log in or register to quickly file a complaint with photo evidence and specific location details.",
      icon: Edit3,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
    },
    {
      title: "2. Track",
      description: "Your complaint is auto-assigned to the appropriate department. Watch real-time status updates.",
      icon: Eye,
      color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400",
    },
    {
      title: "3. Resolve",
      description: "Authorities act within SLAs. Once complete, you will be notified to review and close the issue.",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400",
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            How CivicResolve Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A radically transparent three-step process to better neighborhoods.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className={`h-20 w-20 rounded-full flex items-center justify-center mb-6 shadow-sm border border-white dark:border-slate-950 ring-8 ring-slate-50 dark:ring-slate-900/50 ${step.color}`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-[280px]">
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
