import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import PrivateClassesFlyer from "@/components/admin/flyers/PrivateClassesFlyer";

const PrintPrivateClasses = () => {
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
        <title>Print — Private Classes Letter</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <style>{`
        @media screen {
          body { background: #e7e5e4; margin: 0; padding: 24px; }
          #print-root {
            box-shadow: 0 40px 80px -40px rgba(28,25,23,.35),
                        0 1px 0 rgba(28,25,23,.05);
            margin: 0 auto;
          }
        }

        @page { size: A4 portrait; margin: 0; }

        @media print {
          html, body, #root {
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
            overflow: visible !important;
            transform: none !important;
            visibility: visible !important;
            display: block !important;
            width: 210mm !important;
            height: 297mm !important;
          }

          .print-controls {
            display: none !important;
            visibility: hidden !important;
          }

          #print-root {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            visibility: visible !important;
            display: block !important;
            overflow: visible !important;
            transform: none !important;
            page-break-after: always;
          }

          #print-root * { visibility: visible !important; }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div
        className="print-controls"
        style={{ textAlign: "center", marginBottom: 20, padding: "10px 0" }}
      >
        <Button onClick={handlePrint} disabled={isPrinting} size="lg">
          <Printer className="h-4 w-4 mr-2" />
          {isPrinting ? "Preparing..." : "Print / Save as PDF"}
        </Button>
        <p style={{ marginTop: 10, fontSize: 14, color: "#64748b" }}>
          For best results: choose <strong>A4</strong>, margins <strong>None</strong>,
          background graphics <strong>on</strong>.
        </p>
      </div>

      <div id="print-root">
        <PrivateClassesFlyer />
      </div>
    </>
  );
};

export default PrintPrivateClasses;
