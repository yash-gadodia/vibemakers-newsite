import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/Reveal";
import { parentsFAQs, schoolsFAQs } from "@/components/programmes/FAQSection";
import { BrutalSticker } from "@/components/ui/brutal-sticker";

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
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <Reveal variant="up">
          <div className="text-center mb-12">
            <BrutalSticker tone="yellow" rotate={3}>
              ● FAQ
            </BrutalSticker>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl text-foreground mt-6 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-ink-2">Pick the lens: parents or schools.</p>
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
