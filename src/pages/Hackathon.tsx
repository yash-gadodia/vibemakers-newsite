import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/hackathon/HeroSection";
import { EventFormat } from "@/components/hackathon/EventFormat";
import { ChallengeTracks } from "@/components/hackathon/ChallengeTracks";
import { WhatYoullLearn } from "@/components/hackathon/WhatYoullLearn";
import { Timeline } from "@/components/hackathon/Timeline";
import { JudgingCriteria } from "@/components/hackathon/JudgingCriteria";
import { Prizes } from "@/components/hackathon/Prizes";
import { Benefits } from "@/components/hackathon/Benefits";
import { Rules } from "@/components/hackathon/Rules";
import { Partners } from "@/components/hackathon/Partners";
import { MentorsJudges } from "@/components/hackathon/MentorsJudges";
import { FAQ } from "@/components/hackathon/FAQ";
import { RegistrationForm } from "@/components/hackathon/RegistrationForm";

export default function Hackathon() {
  return (
    <Layout>
      <Helmet>
        <title>National Vibe Makers Hackathon | Singapore's First Student AI Hackathon</title>
        <meta name="description" content="Join the National Vibe Makers Hackathon - Singapore's first 2-day AI hackathon for students aged 13-18. Learn vibe coding, build innovative projects, demo to judges, and win prizes. No coding experience required." />
        <meta name="keywords" content="hackathon Singapore, student hackathon, AI hackathon, vibe coding competition, teen coding, National Vibe Makers Hackathon, learn to code" />
        <link rel="canonical" href="https://vibemakers.dev/hackathon" />
        
        <meta property="og:title" content="National Vibe Makers Hackathon | Singapore Student AI Hackathon" />
        <meta property="og:description" content="Singapore's first 2-day AI hackathon for students. Learn vibe coding, build projects, demo to judges. No coding required. Register interest now!" />
        <meta property="og:type" content="event" />
        <meta property="og:image" content="https://vibemakers.dev/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "National Vibe Makers Hackathon",
            "description": "Singapore's first 2-day AI hackathon for students aged 13-18. Learn vibe coding, build innovative projects, and demo to judges.",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": "Singapore",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SG"
              }
            },
            "organizer": {
              "@type": "Organization",
              "name": "Vibemakers Academy"
            },
            "audience": {
              "@type": "Audience",
              "audienceType": "Students aged 13-18"
            }
          })}
        </script>
      </Helmet>

      <HeroSection />
      <EventFormat />
      <WhatYoullLearn />
      <ChallengeTracks />
      <Timeline />
      <JudgingCriteria />
      <Prizes />
      <Benefits />
      <Partners />
      <Rules />
      <MentorsJudges />
      <FAQ />
      <div id="registration">
        <RegistrationForm />
      </div>
    </Layout>
  );
}
