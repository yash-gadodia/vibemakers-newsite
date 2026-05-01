import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the 2-day format work?",
    answer:
      "Day 1 we teach you vibe coding in a hands-on workshop, then you start building your project. After Day 1 ends, you go home and can continue working remotely overnight. Day 2 is Demo Day – you'll present your project to judges and compete for prizes.",
  },
  {
    question: "Do I need to stay overnight?",
    answer:
      "No! After Day 1 ends in the evening, you go home and can continue building from the comfort of your own space. Our Discord support channel will be open for questions, and mentors will be accessible via chat.",
  },
  {
    question: "Who can participate?",
    answer:
      "Students aged 13-18 from any Singapore school are welcome to participate. Whether you're in secondary, JC, Poly, or ITE, we'd love to have you!",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "No prior coding experience is needed! Day 1 includes a full workshop on vibe coding. You'll learn to build apps by describing what you want in natural language – AI does the heavy lifting.",
  },
  {
    question: "What tools will we use?",
    answer:
      "We'll teach you to use AI-powered tools like Lovable and Cursor. These tools let you build real, functional apps by describing what you want rather than writing code from scratch.",
  },
  {
    question: "Can I participate alone?",
    answer:
      "Absolutely! You can participate solo or form teams of up to 4 members. We'll also have team-matching activities on Day 1 for those looking to connect with others.",
  },
  {
    question: "How are projects judged?",
    answer:
      "Projects are evaluated on four equally-weighted criteria: Innovation (25%), Impact (25%), Execution (25%), and Presentation (25%). Judges include industry professionals and educators.",
  },
  {
    question: "What should I bring?",
    answer:
      "Just bring yourself, a laptop (with charger), and your creativity! We'll provide food, snacks, WiFi, and a great environment to build in. Don't forget to bring parental consent if you're under 18.",
  },
  {
    question: "Is it free to join?",
    answer:
      "Yes, participation is completely free! We want to make this accessible to all students interested in learning and building with AI.",
  },
  {
    question: "Where will it be held?",
    answer:
      "The event will be held in Singapore. The exact venue will be announced closer to the event date. Both days will be at the same location.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Got questions? We've got answers
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
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
