import jsPDF from 'jspdf';

// Custom flyer dimensions in mm (compact, content-fitted)
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 180; // Compact flyer height instead of A4
const MARGIN = 15;

// Colors
const COLORS = {
  orange500: '#f97316',
  orange600: '#ea580c',
  orange50: '#fff7ed',
  orange100: '#ffedd5',
  slate900: '#0f172a',
  slate600: '#475569',
  slate500: '#64748b',
  slate400: '#94a3b8',
  slate300: '#cbd5e1',
  slate100: '#f1f5f9',
  slate50: '#f8fafc',
  green700: '#15803d',
  green100: '#dcfce7',
  white: '#ffffff',
};

// Helper to set text color from hex
const setTextColor = (doc: jsPDF, hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  doc.setTextColor(r, g, b);
};

// Helper to set fill color from hex
const setFillColor = (doc: jsPDF, hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  doc.setFillColor(r, g, b);
};

export const generateSchoolOutreachFlyerPDF = (): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [PAGE_WIDTH, PAGE_HEIGHT], // Custom flyer size
  });

  let y = MARGIN;

  // ============ HEADER ============
  // Logo box
  setFillColor(doc, COLORS.orange500);
  doc.roundedRect(MARGIN, y, 10, 10, 2, 2, 'F');
  
  // V in logo
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.white);
  doc.text('V', MARGIN + 3.5, y + 7);

  // Brand name
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.slate900);
  doc.text('Vibemakers', MARGIN + 13, y + 7);

  // Powered by badge
  setFillColor(doc, COLORS.orange50);
  doc.roundedRect(MARGIN + 42, y + 2, 42, 6, 1, 1, 'F');
  doc.setFontSize(5);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.orange600);
  doc.text('Powered by', MARGIN + 44, y + 6);
  doc.setFont('helvetica', 'bold');
  doc.text('Dialogic Academy', MARGIN + 57, y + 6);

  // For Singapore Schools badge (right aligned)
  setFillColor(doc, COLORS.orange50);
  doc.roundedRect(PAGE_WIDTH - MARGIN - 35, y + 2, 35, 6, 1, 1, 'F');
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.orange600);
  doc.text('For Singapore Schools', PAGE_WIDTH - MARGIN - 33, y + 6);

  y += 14;

  // Headline
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.slate900);
  doc.text('Problem-Solving with AI', MARGIN, y);
  
  y += 5;

  // Subheadline
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.slate600);
  doc.text('Empower your students to build real solutions using vibe coding', MARGIN, y);

  y += 10;

  // ============ WORKSHOP FORMATS SECTION ============
  // Section title
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.slate900);
  doc.text('WORKSHOP FORMATS', MARGIN, y);

  // MOE badge
  setFillColor(doc, COLORS.green100);
  doc.roundedRect(MARGIN + 32, y - 3, 28, 4.5, 1, 1, 'F');
  doc.setFontSize(5);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.green700);
  doc.text('MOE EdTech 2030 Aligned', MARGIN + 33.5, y - 0.5);

  y += 6;

  // Card dimensions - reduced
  const cardWidth = (PAGE_WIDTH - MARGIN * 2 - 6) / 3;
  const cardHeight = 42; // Reduced from 48
  const cardGap = 3;

  // ----- Card 1: Introductory Lab -----
  const card1X = MARGIN;
  setFillColor(doc, COLORS.slate50);
  doc.roundedRect(card1X, y, cardWidth, cardHeight, 2, 2, 'F');
  
  // Duration badge
  setFillColor(doc, COLORS.orange100);
  doc.roundedRect(card1X + 3, y + 3, 12, 4, 1, 1, 'F');
  doc.setFontSize(5);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.orange600);
  doc.text('1 DAY', card1X + 4.5, y + 6);

  // Title
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.slate900);
  doc.text('Introductory Lab', card1X + 3, y + 13);

  // Description
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.slate600);
  doc.text('5-hour workshop introducing', card1X + 3, y + 18);
  doc.text('vibe coding fundamentals', card1X + 3, y + 22);

  // Bullets
  doc.setFontSize(5);
  setTextColor(doc, COLORS.orange500);
  doc.text('•', card1X + 3, y + 28);
  setTextColor(doc, COLORS.slate500);
  doc.text('AI tool basics', card1X + 5.5, y + 28);
  
  setTextColor(doc, COLORS.orange500);
  doc.text('•', card1X + 3, y + 32);
  setTextColor(doc, COLORS.slate500);
  doc.text('First app build', card1X + 5.5, y + 32);

  // ----- Card 2: Build Sprint (Dark) -----
  const card2X = MARGIN + cardWidth + cardGap;
  setFillColor(doc, COLORS.slate900);
  doc.roundedRect(card2X, y, cardWidth, cardHeight, 2, 2, 'F');
  
  // Duration badge
  setFillColor(doc, '#3d2a1a');
  doc.roundedRect(card2X + 3, y + 3, 12, 4, 1, 1, 'F');
  doc.setFontSize(5);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, '#fb923c');
  doc.text('3 DAYS', card2X + 4, y + 6);

  // Title
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, '#fb923c');
  doc.text('Build Sprint', card2X + 3, y + 13);

  // Description
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.slate300);
  doc.text('Intensive programme with', card2X + 3, y + 18);
  doc.text('complete project delivery', card2X + 3, y + 22);

  // Bullets
  doc.setFontSize(5);
  setTextColor(doc, '#fb923c');
  doc.text('•', card2X + 3, y + 28);
  setTextColor(doc, COLORS.slate400);
  doc.text('Deep skill building', card2X + 5.5, y + 28);
  
  setTextColor(doc, '#fb923c');
  doc.text('•', card2X + 3, y + 32);
  setTextColor(doc, COLORS.slate400);
  doc.text('Demo presentations', card2X + 5.5, y + 32);

  // ----- Card 3: Studio Programme -----
  const card3X = MARGIN + (cardWidth + cardGap) * 2;
  setFillColor(doc, COLORS.slate50);
  doc.roundedRect(card3X, y, cardWidth, cardHeight, 2, 2, 'F');
  
  // Duration badge
  setFillColor(doc, COLORS.orange100);
  doc.roundedRect(card3X + 3, y + 3, 15, 4, 1, 1, 'F');
  doc.setFontSize(5);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.orange600);
  doc.text('1-2 WEEKS', card3X + 4, y + 6);

  // Title
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.slate900);
  doc.text('Studio Programme', card3X + 3, y + 13);

  // Description
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.slate600);
  doc.text('Extended learning with', card3X + 3, y + 18);
  doc.text('portfolio development', card3X + 3, y + 22);

  // Bullets
  doc.setFontSize(5);
  setTextColor(doc, COLORS.orange500);
  doc.text('•', card3X + 3, y + 28);
  setTextColor(doc, COLORS.slate500);
  doc.text('Multiple projects', card3X + 5.5, y + 28);
  
  setTextColor(doc, COLORS.orange500);
  doc.text('•', card3X + 3, y + 32);
  setTextColor(doc, COLORS.slate500);
  doc.text('Certification', card3X + 5.5, y + 32);

  y += cardHeight + 6;

  // ============ ORANGE BANNER - HACKATHON ============
  const bannerHeight = 38; // Reduced from 45
  
  // Orange gradient background (solid orange for PDF)
  setFillColor(doc, COLORS.orange500);
  doc.roundedRect(MARGIN, y, PAGE_WIDTH - MARGIN * 2, bannerHeight, 3, 3, 'F');

  // Coming soon badge
  doc.setFillColor(255, 200, 180);
  doc.roundedRect(MARGIN + 5, y + 4, 25, 4.5, 1, 1, 'F');
  
  doc.setFontSize(5);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.white);
  doc.text('COMING Q2 2026', MARGIN + 6.5, y + 7);

  // Title
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('National Vibe Makers Hackathon', MARGIN + 5, y + 15);

  // Tagline
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.orange100);
  doc.text('Learn. Build. Demo.', MARGIN + 5, y + 21);

  // Stats
  const statsY = y + 30;
  const statSpacing = 18;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.white);
  doc.text('2', MARGIN + 5, statsY);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.orange100);
  doc.text('Days', MARGIN + 5, statsY + 3.5);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.white);
  doc.text('1-4', MARGIN + 5 + statSpacing, statsY);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.orange100);
  doc.text('Team Size', MARGIN + 5 + statSpacing, statsY + 3.5);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.white);
  doc.text('13-18', MARGIN + 5 + statSpacing * 2, statsY);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.orange100);
  doc.text('Ages', MARGIN + 5 + statSpacing * 2, statsY + 3.5);

  // QR code placeholder (white box)
  const qrSize = 22;
  const qrX = PAGE_WIDTH - MARGIN - qrSize - 5;
  const qrY = y + 5;
  setFillColor(doc, COLORS.white);
  doc.roundedRect(qrX, qrY, qrSize, qrSize + 6, 2, 2, 'F');
  
  // QR text
  doc.setFontSize(4.5);
  setTextColor(doc, COLORS.slate600);
  doc.text('Scan here to', qrX + 3, qrY + qrSize + 1);
  doc.text('learn more', qrX + 4, qrY + qrSize + 4);

  y += bannerHeight + 6;

  // ============ WHAT SCHOOLS GET ============
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.slate900);
  doc.text('WHAT SCHOOLS GET', MARGIN, y);

  y += 5;

  // Benefits grid (2x2) - reduced spacing
  const benefitWidth = (PAGE_WIDTH - MARGIN * 2 - 5) / 2;
  const benefitHeight = 14; // Reduced from 18
  
  const benefits = [
    { title: 'Ready-to-run enrichment', desc: 'Lesson plans & materials included' },
    { title: 'Customised delivery', desc: 'CCA, AL, cohort-wide' },
    { title: 'End-to-end facilitation', desc: 'Experienced instructors' },
    { title: 'Teacher exposure', desc: 'Optional staff training' },
  ];

  benefits.forEach((benefit, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = MARGIN + col * (benefitWidth + 5);
    const by = y + row * (benefitHeight + 3);

    // Check icon
    setFillColor(doc, COLORS.orange100);
    doc.roundedRect(bx, by, 6, 6, 1, 1, 'F');
    
    // Checkmark
    doc.setDrawColor(COLORS.orange600);
    doc.setLineWidth(0.4);
    doc.line(bx + 1.5, by + 3, bx + 2.5, by + 4.2);
    doc.line(bx + 2.5, by + 4.2, bx + 4.5, by + 2);

    // Title
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    setTextColor(doc, COLORS.slate900);
    doc.text(benefit.title, bx + 8, by + 3.5);

    // Description
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    setTextColor(doc, COLORS.slate500);
    doc.text(benefit.desc, bx + 8, by + 7.5);
  });

  // ============ FOOTER - Fixed position ============
  const footerY = PAGE_HEIGHT - 18; // Fixed at bottom with safe margin
  
  // Divider line
  doc.setDrawColor(COLORS.slate100);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, footerY, PAGE_WIDTH - MARGIN, footerY);

  // Get in touch
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.slate900);
  doc.text('Get in touch', MARGIN, footerY + 5);

  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.orange600);
  doc.text('vibemakers@dialogic.academy', MARGIN, footerY + 9);

  // Right side - website
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  setTextColor(doc, COLORS.slate900);
  doc.text('vibemakers.dev', PAGE_WIDTH - MARGIN - 20, footerY + 5);

  doc.setFontSize(5.5);
  doc.setFont('helvetica', 'normal');
  setTextColor(doc, COLORS.slate500);
  doc.text('Singapore Vibe Coding Education', PAGE_WIDTH - MARGIN - 32, footerY + 9);

  return doc;
};

export const downloadSchoolOutreachFlyerPDF = () => {
  const doc = generateSchoolOutreachFlyerPDF();
  const dateString = new Date().toISOString().split('T')[0];
  doc.save(`vibemakers-school-outreach-flyer-${dateString}.pdf`);
};
