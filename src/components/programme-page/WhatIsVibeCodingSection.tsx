import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BrutalSticker } from "@/components/ui/brutal-sticker";

export function WhatIsVibeCodingSection() {
  return (
    <section className="border-t border-border bg-bg-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        {/* Header */}
        <Reveal variant="up">
          <div className="text-center mb-12">
            <BrutalSticker tone="yellow" rotate={3}>
              ● The Approach
            </BrutalSticker>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mt-6 mb-6">
              What is Vibe Coding?
            </h2>
            <p className="font-sans text-ink-2 max-w-2xl mx-auto text-lg">
              A new way to build software: describing what you want in plain language,
              then using AI to generate, test, and refine working code.
            </p>
          </div>
        </Reveal>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Explanation */}
          <Reveal variant="left">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-xl text-foreground">
                  Focus on <span className="text-primary">problem-solving</span>, not code
                </h3>
                <p className="font-sans text-foreground leading-relaxed">
                  Traditional coding requires memorising syntax and debugging cryptic errors.
                  Vibe coding shifts the focus to <strong>defining problems
                  and designing solutions</strong>. These are the skills that actually matter.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-bold text-xl text-foreground">
                  How <span className="text-primary">professionals</span> work today
                </h3>
                <p className="font-sans text-foreground leading-relaxed">
                  This isn't a shortcut: it's how software is increasingly built in the real world.
                  Students learn to collaborate with AI: prompting, evaluating outputs, and iterating
                  until the solution works.
                </p>
              </div>

              {/* Callout */}
              <div className="vm-card rounded-2xl border border-border bg-bg-warm-2 p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground">This is future-ready learning</p>
                    <p className="text-sm font-sans text-ink-2 mt-1">
                      Students gain skills aligned with MOE's EdTech Masterplan 2030: using
                      Generative AI as a tool for discovery and creation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Visual Demo */}
          <Reveal variant="right" delayMs={100}>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl bg-[#0f0a05] p-5 border border-border"
              >
                {/* Terminal window chrome */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#ffc94d]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffc94d]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffc94d]" />
                  <span className="ml-3 text-xs text-[#a8998b] font-mono">vibe-builder</span>
                </div>

                {/* Terminal content */}
                <div className="space-y-3 font-mono text-sm">
                  <div className="text-[#7fda8c]">{'>'} Student: "Build a CCA tracker"</div>
                  <div className="text-[#a8998b]">{'>'} Generating working code…</div>
                  <div className="text-white">{'>'} First version: good enough to demo<span className="vm-caret">▌</span></div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
