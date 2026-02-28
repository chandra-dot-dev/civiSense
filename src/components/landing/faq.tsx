import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Who can see my complaint?",
      answer: "By default, complaints are visible to assigned authority officers. Global statistics are public for transparency, but personal details remain private unless specifically authorized.",
    },
    {
      question: "How do escalations work?",
      answer: "If a complaint is not resolved within the defined Service Level Agreement (SLA) timeframe for its severity level, the system automatically escalates it to the next supervisory tier.",
    },
    {
      question: "Can I remain anonymous?",
      answer: "Yes, you can choose to make your complaint anonymous. However, providing contact info allows faster follow-ups and keeps you in the loop regarding status changes.",
    },
    {
      question: "How is Priority Score calculated?",
      answer: "The algorithm weights factors like the baseline category severity, user-selected urgency, geographic clustering of similar reports, and SLA breach risks to generate a unified Priority Score.",
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200 dark:border-slate-800">
              <AccordionTrigger className="text-left font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
