import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const parentsFAQs = [
  {
    question: "Does my child need coding experience?",
    answer: "No! Our programmes are designed for beginners. We start with the fundamentals and guide students through each step. Many of our most successful students had zero coding experience when they started.",
  },
  {
    question: "What devices are needed?",
    answer: "A laptop or desktop computer with internet access is required. Tablets are not recommended as they limit the tools available. We'll provide guidance on software setup before the first session.",
  },
  {
    question: "How are students grouped by level?",
    answer: "For group sessions, we assess each student's experience level and goals during registration. Students are grouped with peers of similar abilities to ensure everyone can learn at an appropriate pace.",
  },
  {
    question: "What will they produce?",
    answer: "Students complete real projects they can showcase: websites, apps, games, or AI tools. Each programme culminates in a portfolio piece they can share with friends, family, or future schools.",
  },
  {
    question: "How do you ensure safety and supervision?",
    answer: "All sessions are supervised by trained instructors. We use age-appropriate tools and content, and have strict policies against sharing personal information. Parents receive regular updates on their child's progress.",
  },
];

export const schoolsFAQs = [
  {
    question: "How customisable is the curriculum?",
    answer: "Very! We adapt content to your school's specific needs: whether that's aligning with existing subjects, focusing on particular skills, or adjusting difficulty levels. We'll work with your team to tailor the programme.",
  },
  {
    question: "What teacher involvement is required?",
    answer: "Minimal to none during delivery: we handle instruction. However, we encourage teachers to observe sessions and offer optional CPD training so they can continue supporting students afterwards.",
  },
  {
    question: "What's the maximum class size?",
    answer: "We recommend 20-25 students per instructor for hands-on workshops. For larger groups, we provide additional instructors or adjust the format (e.g., assembly talks can accommodate larger audiences).",
  },
  {
    question: "What are the venue requirements?",
    answer: "A computer lab or classroom with laptops/desktops and reliable internet. We bring any additional equipment needed. Air-conditioning and projector access are helpful but not essential.",
  },
  {
    question: "What are the procurement steps?",
    answer: "We're experienced with school procurement processes. We can provide quotations, vendor forms, and invoices as needed. Many schools engage us through enrichment budgets or CCA funding.",
  },
];

interface FAQSectionProps {
  persona: "parents" | "schools";
}

export function FAQSection({ persona }: FAQSectionProps) {
  const faqs = persona === "parents" ? parentsFAQs : schoolsFAQs;
  const title = persona === "parents" ? "Questions from Parents" : "Questions from Schools";

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">{title}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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
