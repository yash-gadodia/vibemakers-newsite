import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/Reveal";

const faqs = [
  {
    q: "Does my child need any coding experience?",
    a: "No. Students use AI tools to generate code from plain English descriptions. The focus is on problem-solving, design thinking, and verification — not memorising syntax. Complete beginners are welcome.",
  },
  {
    q: "What will my child actually take home?",
    a: "A working web app they built themselves, hosted online and shareable via a link. They also get a reflection portfolio documenting their design decisions, iterations, and what they learned — useful for school portfolios and DSA applications.",
  },
  {
    q: "How is this different from Scratch or Python classes?",
    a: "Traditional coding classes teach syntax (loops, variables, functions). We teach product thinking — students identify a real problem, design a solution, build it with AI, test with users, and iterate. The output is a real app, not a coding exercise.",
  },
  {
    q: "Is it safe for my child to use AI tools?",
    a: "Yes. Students use AI under instructor supervision with educational accounts. No personal data is collected by AI tools during sessions. We teach responsible AI habits: prompting with intent, verifying outputs, and understanding limitations.",
  },
  {
    q: "What's the class size?",
    a: "Group classes: 4–8 students. School workshops: up to 30–40 depending on format. 1-to-1 coaching is also available for the most personalised experience.",
  },
  {
    q: "How long is the programme?",
    a: "For parents: group classes run weekly over 6–9 months, or choose 1-to-1 coaching on a flexible schedule. For schools: we offer 1-day workshops, 3-day build sprints, and 1–2 week studio programmes.",
  },
  {
    q: "Is this aligned with MOE's curriculum?",
    a: "Yes. Our V.I.B.E. methodology is designed around MOE's 21st Century Competencies framework (CAIT, CCI, self-directed learning) and the EdTech Masterplan 2030's digital literacy goals (Find, Think, Apply, Create).",
  },
  {
    q: "Can my child use their project for DSA or school portfolio?",
    a: "Absolutely. Students finish with a deployed web app and a reflection portfolio that documents their problem-solving process — strong evidence of self-directed learning and digital literacy for DSA, EAE, or school applications.",
  },
];

export function HomeFAQSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4">
        <Reveal variant="up">
          <SectionHeader
            badge="FAQ"
            title="Common Questions"
            description="What parents and schools ask us most."
          />
        </Reveal>

        <Reveal variant="up" delayMs={100}>
          <div className="max-w-3xl mx-auto mt-10">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden px-5"
                >
                  <AccordionTrigger className="text-left no-underline hover:no-underline py-4 text-base">
                    <span className="font-semibold text-foreground leading-snug">{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
