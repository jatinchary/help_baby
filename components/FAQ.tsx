import { HelpCircle, MessageCircle } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/site-config";

export function FAQ() {
  return (
    <section id="faq" className="section border-t border-rose-100 bg-white">
      <div className="container-narrow">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Questions
            </p>
            <h2 className="section-title">Before you donate</h2>
            <p className="section-lede">
              Honest answers to the questions people ask most. If something is
              still unclear, please reach out to the family.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-hope transition-colors hover:text-hope-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Contact the family
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="w-full">
              {siteConfig.faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="last:border-b-0"
                >
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
