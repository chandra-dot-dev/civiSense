import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "System Visibility Guidelines",
      answer: "By default, incident records are restricted to assigned municipal officers. Aggregated metrics remain public for compliance verification. Personal identifiable information (PII) is obfuscated in all public reports.",
    },
    {
      question: "Service Level Agreement (SLA) Escalation",
      answer: "If processing exceeds the defined SLA timeframe for a given severity tier, the system initiates an automated escalation to the designated supervisory division, logging the breach in the audit trail.",
    },
    {
      question: "Anonymous Reporting Protocol",
      answer: "Reporters may opt for anonymous submission. However, omitting contact vectors disables direct automated tracking updates and may impede follow-up verification processes.",
    },
    {
      question: "Priority Scoring Heuristics",
      answer: "Algorithms evaluate base severity, reporter-defined urgency, geographic incident clustering, and SLA breach proximity to dynamically assign a real-time Priority Index Score.",
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-2">
            System Documentation
          </h2>
          <p className="text-sm text-slate-500 uppercase tracking-wider">Standard Operating Procedures</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200 dark:border-slate-800 last:border-0 px-6">
                <AccordionTrigger className="text-left font-medium text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-300 py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-6 leading-relaxed text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
