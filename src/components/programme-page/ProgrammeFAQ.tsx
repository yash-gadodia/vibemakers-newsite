import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/Reveal";
import { parentsFAQs, schoolsFAQs } from "@/components/programmes/FAQSection";

function FAQAccordion({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`faq-${index}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function ProgrammeFAQ() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4">
        <Reveal variant="up">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Pick the lens: parents or schools.</p>
          </div>
        </Reveal>

        <Reveal variant="up" delayMs={100}>
          <Tabs defaultValue="parents" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="parents">Parents</TabsTrigger>
              <TabsTrigger value="schools">Schools</TabsTrigger>
            </TabsList>

            <TabsContent value="parents">
              <FAQAccordion faqs={parentsFAQs} />
            </TabsContent>

            <TabsContent value="schools">
              <FAQAccordion faqs={schoolsFAQs} />
            </TabsContent>
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
