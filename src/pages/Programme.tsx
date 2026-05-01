import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { FormatCardsSection } from "@/components/programmes/FormatCardsSection";
import { ProgrammeHero } from "@/components/programme-page/ProgrammeHero";
import { WhatIsVibeCodingSection } from "@/components/programme-page/WhatIsVibeCodingSection";
import { ProductThinkingSection } from "@/components/programme-page/ProductThinkingSection";
import { MethodologySection } from "@/components/programme-page/MethodologySection";
import { CaseStudySection } from "@/components/programme-page/CaseStudySection";
import { SkillsGainedSection } from "@/components/programmes/SkillsGainedSection";
import { ProgrammeFAQ } from "@/components/programme-page/ProgrammeFAQ";

export default function Programme() {
  return (
    <Layout>
      <Helmet>
        <title>Our Programme | Vibemakers Academy</title>
        <meta
          name="description"
          content="Problem-Solving with AI: An applied learning programme aligned with MOE EdTech Masterplan 2030. Develop self-directed learners, digital literacy, and 21st Century Competencies through authentic, real-world problem-solving."
        />
        <meta
          name="keywords"
          content="AI coding programme Singapore, MOE EdTech Masterplan 2030, 21CC, applied learning programme ALP, AI for Fun, problem solving, digital literacy, Generative AI education"
        />
        <link rel="canonical" href="https://vibemakers.dev/programme" />

        <meta property="og:title" content="Our Programme | Vibemakers Academy" />
        <meta
          property="og:description"
          content="A structured learning experience where students solve real problems by designing, building, and improving digital solutions with AI."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vibemakers.dev/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* 1. Hero Section */}
      <ProgrammeHero />
      
      {/* 2. What is Vibe Coding? */}
      <WhatIsVibeCodingSection />
      
      {/* 3. What is Product Thinking? */}
      <ProductThinkingSection />
      
      {/* 4. How We Teach It (VIBE Cycle) */}
      <MethodologySection />
      
      {/* 5. Case Study - Student Journey */}
      <CaseStudySection />
      
      {/* 6. Skills Gained */}
      <SkillsGainedSection />
      
      {/* 7. FAQ */}
      <ProgrammeFAQ />
      
      {/* 8. Choose Your Format */}
      <FormatCardsSection />
    </Layout>
  );
}
