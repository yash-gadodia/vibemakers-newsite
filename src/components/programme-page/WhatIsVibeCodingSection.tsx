import { motion } from "framer-motion";
import { Sparkles, Code, Rocket } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function WhatIsVibeCodingSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <Reveal variant="up">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 rounded-full mb-4">
                The Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                What is Vibe Coding?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A new way to build software—describing what you want in plain language, 
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
                <h3 className="text-xl font-semibold">
                  Focus on <span className="text-primary">problem-solving</span>, not code
                </h3>
                <p className="text-muted-foreground">
                  Traditional coding requires memorising syntax and debugging cryptic errors. 
                  Vibe coding shifts the focus to <strong className="text-foreground">defining problems 
                  and designing solutions</strong>—the skills that actually matter.
                </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    How <span className="text-primary">professionals</span> work today
                  </h3>
                  <p className="text-muted-foreground">
                    This isn't a shortcut—it's how software is increasingly built in the real world. 
                    Students learn to collaborate with AI: prompting, evaluating outputs, and iterating 
                    until the solution works.
                  </p>
                </div>

                {/* Callout */}
                <div className="rounded-2xl bg-secondary/50 border border-border p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">This is future-ready learning</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Students gain skills aligned with MOE's EdTech Masterplan 2030—using 
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
                  className="rounded-3xl bg-foreground p-6 shadow-2xl"
                >
                  {/* Window Chrome */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-background/60 font-mono">vibe-builder</span>
                  </div>

                  {/* Steps */}
                  <div className="space-y-4">
                    {/* Step 1: Prompt */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">1</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-background/60 mb-1">Student describes the idea</p>
                        <div className="rounded-lg bg-background/10 px-4 py-3 font-mono text-sm text-background/90">
                          "Build a CCA points tracker with deadlines"
                        </div>
                      </div>
                    </div>

                    {/* Step 2: AI Generates */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Code className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-background/60 mb-1">AI generates working code</p>
                        <div className="rounded-lg bg-background/10 px-4 py-3 font-mono text-xs text-green-400 overflow-hidden">
                          <span className="text-background/40">// Generated component</span>
                          <br />
                          <span className="text-blue-400">function</span> CCATracker() {"{"}...{"}"}
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Working App */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Rocket className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-background/60 mb-1">Real app materialises</p>
                        <div className="rounded-lg bg-white p-3 shadow-inner">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-foreground">CCA Tracker</span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">42 pts</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-primary rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
