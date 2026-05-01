import { useState } from "react";
import SchoolOutreachFlyer from "@/components/admin/flyers/SchoolOutreachFlyer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

const PrintFlyer = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    // Delay to let browser re-paint before triggering print dialog
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 250);
  };

  return (
    <>
      <Helmet>
        <title>Print — School Outreach Flyer</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Minimal print CSS — override any global hide rules */}
      <style>{`
        /* Screen: show print button and flyer preview */
        @media screen {
          body { background: #f1f5f9; margin: 0; padding: 20px; }
          #print-root { 
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            margin: 0 auto;
          }
        }

        /* Print: A5, no margins, show only #print-root */
        @page { 
          size: A5 portrait; 
          margin: 0; 
        }

        @media print {
          /* Reset everything */
          html, body, #root {
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
            overflow: visible !important;
            transform: none !important;
            visibility: visible !important;
            display: block !important;
            width: 148mm !important;
            height: 210mm !important;
          }

          /* Hide the print button and any other UI */
          .print-controls {
            display: none !important;
            visibility: hidden !important;
          }

          /* Show and position only the flyer */
          #print-root {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 148mm !important;
            height: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            visibility: visible !important;
            display: block !important;
            overflow: visible !important;
            transform: none !important;
          }

          #print-root * {
            visibility: visible !important;
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
        <Button onClick={handlePrint} disabled={isPrinting} size="lg">
          <Printer className="h-4 w-4 mr-2" />
          {isPrinting ? "Preparing..." : "Print Flyer"}
        </Button>
        <p style={{ 
          marginTop: 10, 
          fontSize: 14, 
          color: "#64748b" 
        }}>
          For best results, select "Save as PDF" in the print dialog
        </p>
      </div>

      {/* Flyer container - this is what gets printed */}
      <div id="print-root">
        <SchoolOutreachFlyer />
      </div>
    </>
  );
};

export default PrintFlyer;
