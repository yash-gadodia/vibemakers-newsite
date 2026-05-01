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

        <script type="application/ld+json">{`{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Vibe Coding Programme — Product Thinking + AI Coding for Teens",
  "description": "Singapore's AI-first coding programme for teens 13-18. Students learn the V.I.B.E. Cycle (Vision, Ideate, Build, Evolve) and ship real deployed apps using Claude, Lovable, and Cursor. MOE-aligned to EdTech Masterplan 2030 and the 4 AI Learns framework.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Vibe Makers Academy",
    "url": "https://vibemakers.dev",
    "sameAs": "https://dialogic.academy"
  },
  "educationalLevel": "Secondary",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": "Teens aged 13-18"
  },
  "teaches": [
    "AI-first vibe coding",
    "Product thinking",
    "Prompt engineering",
    "Application prototyping with Lovable",
    "Code review with Cursor",
    "Critical, Adaptive and Inventive Thinking (CAIT)",
    "User research and iteration"
  ],
  "courseMode": ["Onsite", "Online"],
  "inLanguage": "en",
  "offers": {
    "@type": "Offer",
    "category": "Education",
    "priceCurrency": "SGD",
    "availability": "https://schema.org/InStock",
    "url": "https://vibemakers.dev/parents"
  },
  "hasCourseInstance": [
    {
      "@type": "CourseInstance",
      "name": "Group Classes",
      "description": "4-8 students, weekly schedule, peer collaboration + demo days. 6-9 month duration.",
      "courseMode": "Onsite",
      "courseWorkload": "PT2H"
    },
    {
      "@type": "CourseInstance",
      "name": "1-to-1 Private Coaching",
      "description": "Mentor-guided, flexible scheduling, fastest tailored outcomes.",
      "courseMode": "Onsite",
      "courseWorkload": "PT1H"
    },
    {
      "@type": "CourseInstance",
      "name": "School Workshop — Introductory Lab",
      "description": "1-day post-exam enrichment / assembly programme for up to 40 students.",
      "courseMode": "Onsite",
      "courseWorkload": "PT6H"
    },
    {
      "@type": "CourseInstance",
      "name": "School Workshop — Build Sprint",
      "description": "3-day holiday programme / enrichment week for 20-30 students.",
      "courseMode": "Onsite",
      "courseWorkload": "P3D"
    },
    {
      "@type": "CourseInstance",
      "name": "School Workshop — Studio Programme",
      "description": "1-2 week semester break / extended enrichment for 15-25 students.",
      "courseMode": "Onsite",
      "courseWorkload": "P2W"
    }
  ]
}`}</script>
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
