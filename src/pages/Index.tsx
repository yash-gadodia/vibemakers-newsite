import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { WhatIsVibecodingSection } from "@/components/home/WhatIsVibecodingSection";
import { TrustSection } from "@/components/home/TrustSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ProgramFormatsSection } from "@/components/home/ProgramFormatsSection";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import { StudentProjectsSection } from "@/components/home/StudentProjectsSection";
import { PhotoGallery } from "@/components/home/PhotoGallery";
import { HomeFAQSection } from "@/components/home/HomeFAQSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const element = document.getElementById(id);
    if (!element) return;

    requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash]);

  return (
    <Layout>
      <Helmet>
        <title>Vibe Makers | Product Thinking + AI Coding for Teens in Singapore</title>
        <meta name="description" content="Singapore's AI-first academy for teens (13-18). Learn product thinking and vibe coding to build real apps fast—no experience needed. Trusted by 40+ schools, 5000+ students. Part of Dialogic Academy." />
        <meta name="keywords" content="AI coding Singapore, teen coding academy, vibe coding, learn to code Singapore, student app development, coding for teenagers, Dialogic Academy, coding bootcamp Singapore" />
        <link rel="canonical" href="https://vibemakers.dev/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Vibemakers Academy | Build Apps, Not Just Code" />
        <meta property="og:description" content="Singapore's AI-first academy for teens. Learn product thinking and vibe coding to go from idea to working app—fast. Trusted by 40+ schools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vibemakers.dev/" />
        <meta property="og:image" content="https://vibemakers.dev/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vibemakers Academy | AI Coding for Teens" />
        <meta name="twitter:description" content="Learn product thinking and build real apps with AI-first vibe coding. For students 13-18 in Singapore. No experience needed." />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Vibemakers Academy",
            "alternateName": "Vibe Makers",
            "description": "Singapore's premier AI coding academy for teenagers aged 13-18. Part of Dialogic Academy.",
            "url": "https://vibemakers.dev/",
            "logo": "https://vibemakers.dev/favicon.svg",
            "parentOrganization": {
              "@type": "EducationalOrganization",
              "name": "Dialogic Academy",
              "url": "https://dialogic.academy"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "SG",
              "addressLocality": "Singapore"
            },
            "areaServed": "Singapore",
            "foundingDate": "2018",
            "numberOfEmployees": "10-20",
            "sameAs": [],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "200"
            },
            "offers": {
              "@type": "Offer",
              "category": "Coding Education",
              "eligibleRegion": "SG",
              "eligibleCustomerType": "Student"
            }
          })}
        </script>
      </Helmet>

      {/* 1. Hero - Value prop + Demo */}
      <HeroSection />
      
      {/* 2. Trust Section - School logos + credibility */}
      <TrustSection />
      
      {/* 3. What is Vibe Coding - Explain the concept */}
      <WhatIsVibecodingSection />

      {/* 4. Comparison - Why we're different */}
      <ComparisonSection />

      {/* 5. Student Projects - Real examples */}
      <StudentProjectsSection />

      {/* 6. Testimonials - Social proof from all demographics */}
      <TestimonialsSection />

      {/* 7. Program Formats - What we offer */}
      <ProgramFormatsSection />

      {/* 8. Gallery - Authentic imagery */}
      <PhotoGallery />

      {/* 9. FAQ - Common questions */}
      <HomeFAQSection />

      {/* 10. Final CTA */}
      <FinalCTASection />
    </Layout>
  );
};

export default Index;
