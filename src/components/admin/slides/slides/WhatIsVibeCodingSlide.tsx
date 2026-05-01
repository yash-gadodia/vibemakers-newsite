import SlideContainer from '../SlideContainer';
import { Code2, MessageSquare, Rocket, Clock } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Natural Language',
    description: 'Describe what you want in plain English',
  },
  {
    icon: Code2,
    title: 'AI-Assisted',
    description: 'AI generates and refines the code',
  },
  {
    icon: Rocket,
    title: 'Real Products',
    description: 'Ship working apps, not just exercises',
  },
];

const WhatIsVibeCodingSlide = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <Code2 className="w-7 h-7 text-primary" />
          <span className="text-primary uppercase tracking-widest text-lg font-semibold">Core Concept</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
          What is <span className="text-primary">Vibe Coding</span>?
        </h2>

        {/* Definition */}
        <p className="text-2xl md:text-3xl text-muted-foreground mb-10 max-w-5xl leading-relaxed">
          Building real digital solutions by <span className="text-foreground font-medium">describing intent in natural language</span>, 
          using AI to generate and refine code.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-lg text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Key Differentiator */}
        <div className="flex flex-wrap gap-5 justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full">
            <span className="text-2xl">💡</span>
            <span className="text-foreground font-medium text-lg">Focus on <span className="text-primary">problem-solving</span>, not code</span>
          </div>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary border border-border rounded-full">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-foreground text-lg">Working prototype in <span className="text-primary font-medium">hours</span>, not weeks</span>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default WhatIsVibeCodingSlide;
