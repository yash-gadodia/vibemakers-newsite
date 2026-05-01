import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

// Import all slides
import TitleSlide from "@/components/admin/slides/slides/TitleSlide";
import OpportunitySlide from "@/components/admin/slides/slides/OpportunitySlide";
import WhoWeAreSlide from "@/components/admin/slides/slides/WhoWeAreSlide";
import SchoolPartnersSlide from "@/components/admin/slides/slides/SchoolPartnersSlide";
import WhatIsVibeCodingSlide from "@/components/admin/slides/slides/WhatIsVibeCodingSlide";
import ToolsWeUseSlide from "@/components/admin/slides/slides/ToolsWeUseSlide";
import MethodologySlide from "@/components/admin/slides/slides/MethodologySlide";
import StudentProjectsSlide from "@/components/admin/slides/slides/StudentProjectsSlide";
import SkillsSlide from "@/components/admin/slides/slides/SkillsSlide";
import ProgrammeFormatsSlide from "@/components/admin/slides/slides/ProgrammeFormatsSlide";
import HackathonSlide from "@/components/admin/slides/slides/HackathonSlide";
import CTASlide from "@/components/admin/slides/slides/CTASlide";

const slides = [
  { id: 'title', component: TitleSlide },
  { id: 'opportunity', component: OpportunitySlide },
  { id: 'what-is-vibe', component: WhatIsVibeCodingSlide },
  { id: 'tools', component: ToolsWeUseSlide },
  { id: 'methodology', component: MethodologySlide },
  { id: 'projects', component: StudentProjectsSlide },
  { id: 'skills', component: SkillsSlide },
  { id: 'formats', component: ProgrammeFormatsSlide },
  { id: 'who-we-are', component: WhoWeAreSlide },
  { id: 'partners', component: SchoolPartnersSlide },
  { id: 'hackathon', component: HackathonSlide },
  { id: 'cta', component: CTASlide },
];

const PrintSlides = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 250);
  };

  return (
    <>
      <Helmet>
        <title>Print — Teacher Slide Deck</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <style>{`
        /* Screen: show print button and slides preview */
        @media screen {
          body { 
            background: #1a1a2e; 
            margin: 0; 
            padding: 20px; 
          }
          .slide-page {
            width: 960px;
            aspect-ratio: 16/9;
            margin: 20px auto;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            border-radius: 8px;
            overflow: hidden;
          }
        }

        /* Print: 16:9 landscape slides, one per page */
        @page { 
          size: landscape; 
          margin: 0; 
        }

        @media print {
          /* Hide Lovable platform badge */
          div[style*="Edit in Lovable"],
          a[href*="lovable.app"],
          [data-lovable-badge],
          .lovable-badge,
          div[style*="position: fixed"][style*="bottom"],
          body > div:last-child:not(#root) {
            display: none !important;
            visibility: hidden !important;
          }

          html, body, #root {
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
            overflow: visible !important;
          }

          .print-controls {
            display: none !important;
            visibility: hidden !important;
          }

          .slide-page {
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            page-break-after: always;
            page-break-inside: avoid;
            break-after: page;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          .slide-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }

          .slide-page > * {
            flex-shrink: 0 !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* Print button - hidden during print */}
      <div className="print-controls" style={{ 
        textAlign: "center", 
        marginBottom: 20,
        padding: "10px 0"
      }}>
        <Button onClick={handlePrint} disabled={isPrinting} size="lg" className="bg-primary hover:bg-primary/90">
          <Printer className="h-4 w-4 mr-2" />
          {isPrinting ? "Preparing..." : "Print / Save as PDF"}
        </Button>
        <p style={{ 
          marginTop: 10, 
          fontSize: 14, 
          color: "#94a3b8" 
        }}>
          For best results, select "Save as PDF" in the print dialog with "Landscape" orientation
        </p>
      </div>

      {/* All slides - each will be a separate page when printed */}
      {slides.map((slide) => {
        const SlideComponent = slide.component;
        return (
          <div key={slide.id} className="slide-page">
            <SlideComponent />
          </div>
        );
      })}
    </>
  );
};

export default PrintSlides;
