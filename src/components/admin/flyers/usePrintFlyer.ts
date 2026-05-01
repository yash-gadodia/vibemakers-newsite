import { useCallback } from 'react';

export const usePrintFlyer = () => {
  const printFlyer = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      alert('Please allow pop-ups to download the flyer as PDF');
      return;
    }

    // Get the flyer HTML
    const flyerHTML = element.outerHTML;

    // Write the print document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vibemakers School Outreach Flyer</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: white;
              padding: 0;
              margin: 0;
            }
            
            @page {
              size: 210mm auto;
              margin: 0;
            }
            
            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
            
            /* Tailwind-like utility classes */
            .bg-white { background-color: #ffffff; }
            .bg-slate-50 { background-color: #f8fafc; }
            .bg-slate-900 { background-color: #0f172a; }
            .bg-orange-50 { background-color: #fff7ed; }
            .bg-orange-100 { background-color: #ffedd5; }
            .bg-orange-500 { background-color: #f97316; }
            .bg-green-100 { background-color: #dcfce7; }
            
            .text-white { color: #ffffff; }
            .text-slate-900 { color: #0f172a; }
            .text-slate-600 { color: #475569; }
            .text-slate-500 { color: #64748b; }
            .text-slate-400 { color: #94a3b8; }
            .text-slate-300 { color: #cbd5e1; }
            .text-orange-500 { color: #f97316; }
            .text-orange-600 { color: #ea580c; }
            .text-orange-100 { color: #ffedd5; }
            .text-green-700 { color: #15803d; }
            
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-medium { font-weight: 500; }
            
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .text-base { font-size: 1rem; line-height: 1.5rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
            
            .rounded { border-radius: 0.25rem; }
            .rounded-lg { border-radius: 0.5rem; }
            .rounded-xl { border-radius: 0.75rem; }
            .rounded-2xl { border-radius: 1rem; }
            .rounded-full { border-radius: 9999px; }
            
            .p-2 { padding: 0.5rem; }
            .p-3 { padding: 0.75rem; }
            .p-4 { padding: 1rem; }
            .p-5 { padding: 1.25rem; }
            .p-6 { padding: 1.5rem; }
            .p-8 { padding: 2rem; }
            
            .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
            .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .py-0\\.5 { padding-top: 0.125rem; padding-bottom: 0.125rem; }
            
            .mb-1 { margin-bottom: 0.25rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-3 { margin-bottom: 0.75rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mr-2 { margin-right: 0.5rem; }
            .mr-3 { margin-right: 0.75rem; }
            .mt-4 { margin-top: 1rem; }
            .mt-6 { margin-top: 1.5rem; }
            .pt-4 { padding-top: 1rem; }
            
            .flex { display: flex; }
            .grid { display: grid; }
            .inline-flex { display: inline-flex; }
            
            .items-center { align-items: center; }
            .items-start { align-items: flex-start; }
            .justify-between { justify-content: space-between; }
            .gap-2 { gap: 0.5rem; }
            .gap-3 { gap: 0.75rem; }
            .gap-4 { gap: 1rem; }
            .gap-6 { gap: 1.5rem; }
            .gap-x-8 { column-gap: 2rem; }
            .gap-y-3 { row-gap: 0.75rem; }
            
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            
            .space-y-1 > * + * { margin-top: 0.25rem; }
            
            .w-5 { width: 1.25rem; }
            .w-6 { width: 1.5rem; }
            .h-5 { height: 1.25rem; }
            .h-6 { height: 1.5rem; }
            .w-20 { width: 5rem; }
            .h-24 { height: 6rem; }
            
            .border-t { border-top-width: 1px; border-style: solid; }
            .border-slate-200 { border-color: #e2e8f0; }
            
            .leading-tight { line-height: 1.25; }
            
            .shrink-0 { flex-shrink: 0; }
          </style>
        </head>
        <body>
          ${flyerHTML}
          <script>
            // Auto-trigger print after a brief delay for styles to load
            setTimeout(() => {
              window.print();
              // Close after print dialog closes
              window.onafterprint = () => window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  }, []);

  return { printFlyer };
};
