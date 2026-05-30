import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

interface LayoutProps {
  children: ReactNode;
}

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Vibe Makers Academy",
  alternateName: "Vibe Makers",
  url: "https://vibemakers.dev",
  logo: "https://vibemakers.dev/og-image.png",
  description:
    "Singapore's AI coding academy for teens 13-18. Part of Dialogic Academy. Build real apps with AI through 1-on-1 coaching, small group classes, and holiday intensives.",
  areaServed: { "@type": "Country", name: "Singapore" },
  foundingDate: "2026",
  parentOrganization: {
    "@type": "EducationalOrganization",
    name: "Dialogic Academy",
    foundingDate: "2018",
    url: "https://dialogic.academy",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "vibemakers@dialogic.academy",
    telephone: "+65-8890-0368",
    areaServed: "SG",
    availableLanguage: ["en"],
  },
  sameAs: [],
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(ORG_JSON_LD)}
        </script>
      </Helmet>
      <Header />
      {/* Header is fixed; offset content by its height (~77px) so it isn't covered. */}
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
