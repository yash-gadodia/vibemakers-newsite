import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import logo from '@/assets/logo.png';

const SchoolOutreachFlyer = forwardRef<HTMLDivElement>((_, ref) => {
  // Fixed A5 dimensions: 148mm x 210mm - exact print size
  // This is a print layout - no responsive behavior, no scaling
  const styles = {
    container: {
      width: '148mm',
      height: '210mm',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      boxSizing: 'border-box' as const,
    },
    gradientTopRight: {
      position: 'absolute' as const,
      top: 0,
      right: 0,
      width: '256px',
      height: '256px',
      background: 'linear-gradient(to bottom left, #ffedd5, transparent)',
      borderBottomLeftRadius: '100%',
      opacity: 0.6,
    },
    gradientBottomLeft: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      width: '192px',
      height: '192px',
      background: 'linear-gradient(to top right, #fff7ed, transparent)',
      borderTopRightRadius: '100%',
      opacity: 0.6,
    },
    content: {
      position: 'relative' as const,
      zIndex: 10,
      padding: '28px 32px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
    },
    logoBox: {
      width: '32px',
      height: '32px',
      backgroundColor: '#f97316',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoText: {
      color: '#ffffff',
      fontWeight: 700,
      fontSize: '14px',
    },
    brandName: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#0f172a',
    },
    badge: {
      fontSize: '11px',
      color: '#ea580c',
      fontWeight: 500,
      backgroundColor: '#fff7ed',
      padding: '4px 12px',
      borderRadius: '9999px',
    },
    headline: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#0f172a',
      marginTop: '16px',
      wordSpacing: 'normal',
    },
    subheadline: {
      fontSize: '13px',
      color: '#475569',
      marginTop: '4px',
      wordSpacing: 'normal',
    },
    sectionTitle: {
      fontSize: '12px',
      fontWeight: 600,
      color: '#0f172a',
      textTransform: 'uppercase' as const,
      wordSpacing: 'normal',
    },
    moeBadge: {
      fontSize: '10px',
      color: '#15803d',
      backgroundColor: '#dcfce7',
      padding: '2px 8px',
      borderRadius: '9999px',
      fontWeight: 500,
    },
    cardLight: {
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid #f1f5f9',
    },
    cardDark: {
      backgroundColor: '#0f172a',
      borderRadius: '12px',
      padding: '16px',
    },
    durationBadge: {
      fontSize: '10px',
      color: '#ea580c',
      fontWeight: 600,
      backgroundColor: '#ffedd5',
      padding: '2px 8px',
      borderRadius: '9999px',
      display: 'inline-block',
      marginBottom: '8px',
    },
    durationBadgeDark: {
      fontSize: '10px',
      color: '#fb923c',
      fontWeight: 600,
      backgroundColor: 'rgba(234, 88, 12, 0.3)',
      padding: '2px 8px',
      borderRadius: '9999px',
      display: 'inline-block',
      marginBottom: '8px',
    },
    cardTitle: {
      fontSize: '14px',
      fontWeight: 700,
      color: '#0f172a',
      marginBottom: '4px',
    },
    cardTitleOrange: {
      fontSize: '14px',
      fontWeight: 700,
      color: '#fb923c',
      marginBottom: '4px',
    },
    cardDesc: {
      fontSize: '11px',
      color: '#475569',
      lineHeight: 1.5,
    },
    cardDescLight: {
      fontSize: '11px',
      color: '#cbd5e1',
      lineHeight: 1.5,
    },
    bulletItem: {
      fontSize: '10px',
      color: '#64748b',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '4px',
      marginTop: '4px',
    },
    bulletItemLight: {
      fontSize: '10px',
      color: '#94a3b8',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '4px',
      marginTop: '4px',
    },
    orangeBanner: {
      background: 'linear-gradient(to right, #f97316, #ea580c)',
      borderRadius: '16px',
      padding: '20px',
      color: '#ffffff',
      marginBottom: '24px',
    },
    comingSoonBadge: {
      fontSize: '10px',
      fontWeight: 600,
      backgroundColor: 'rgba(255,255,255,0.2)',
      padding: '2px 8px',
      borderRadius: '9999px',
      display: 'inline-block',
      marginBottom: '8px',
    },
    challengeTitle: {
      fontSize: '18px',
      fontWeight: 700,
      marginBottom: '4px',
    },
    challengeTagline: {
      fontSize: '14px',
      color: '#ffedd5',
      marginBottom: '12px',
    },
    stat: {
      textAlign: 'center' as const,
    },
    statNumber: {
      fontWeight: 700,
      fontSize: '18px',
    },
    statLabel: {
      fontSize: '11px',
      color: '#fed7aa',
    },
    qrContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '12px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkIcon: {
      width: '24px',
      height: '24px',
      backgroundColor: '#ffedd5',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    footer: {
      borderTop: '1px solid #e2e8f0',
      paddingTop: '16px',
      marginTop: '16px',
    },
  };

  return (
    <div ref={ref} style={styles.container} className="print-flyer-container">
      {/* Background gradients */}
      <div style={styles.gradientTopRight} />
      <div style={styles.gradientBottomLeft} />

      {/* Content */}
      <div style={styles.content}>
        {/* Header */}
        <header style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={logo} 
                alt="Vibe Makers" 
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '8px',
                  flexShrink: 0 
                }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={styles.brandName}>Vibe Makers</span>
                  <span style={{ 
                    fontSize: '9px', 
                    color: '#ea580c', 
                    backgroundColor: '#fff7ed',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    fontWeight: 500,
                    whiteSpace: 'nowrap'
                  }}>Powered by <span style={{ fontWeight: 700 }}>Dialogic Academy</span></span>
                </div>
              </div>
            </div>
            <span style={{ ...styles.badge, display: 'flex', alignItems: 'center' }}>For Singapore Schools</span>
          </div>
          <p style={styles.headline}>Problem-Solving with AI</p>
          <p style={styles.subheadline}>Empower your students to build real solutions using vibe coding</p>
        </header>

        {/* Workshop Formats */}
        <section style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={styles.sectionTitle}>Workshop Formats</span>
            <span style={styles.moeBadge}>MOE EdTech 2030 Aligned</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {/* Introductory Lab */}
            <div style={styles.cardLight}>
              <div style={styles.durationBadge}>1 DAY</div>
              <div style={styles.cardTitle}>Introductory Lab</div>
              <p style={styles.cardDesc}>5-hour workshop introducing vibe coding fundamentals</p>
              <div style={{ marginTop: '8px' }}>
                <div style={styles.bulletItem}>
                  <span style={{ color: '#f97316' }}>•</span>
                  <span style={{ wordSpacing: 'normal' }}>AI tool basics</span>
                </div>
                <div style={styles.bulletItem}>
                  <span style={{ color: '#f97316' }}>•</span>
                  <span style={{ wordSpacing: 'normal' }}>First app build</span>
                </div>
              </div>
            </div>

            {/* Build Sprint */}
            <div style={styles.cardDark}>
              <div style={styles.durationBadgeDark}>3 DAYS</div>
              <div style={styles.cardTitleOrange}>Build Sprint</div>
              <p style={styles.cardDescLight}>Intensive programme with complete project delivery</p>
              <div style={{ marginTop: '8px' }}>
                <div style={styles.bulletItemLight}>
                  <span style={{ color: '#fb923c' }}>•</span>
                  <span style={{ wordSpacing: 'normal' }}>Deep skill building</span>
                </div>
                <div style={styles.bulletItemLight}>
                  <span style={{ color: '#fb923c' }}>•</span>
                  <span style={{ wordSpacing: 'normal' }}>Demo presentations</span>
                </div>
              </div>
            </div>

            {/* Studio Programme */}
            <div style={styles.cardLight}>
              <div style={styles.durationBadge}>1-2 WEEKS</div>
              <div style={styles.cardTitle}>Studio Programme</div>
              <p style={styles.cardDesc}>Extended learning with portfolio development</p>
              <div style={{ marginTop: '8px' }}>
                <div style={styles.bulletItem}>
                  <span style={{ color: '#f97316' }}>•</span>
                  <span style={{ wordSpacing: 'normal' }}>Multiple projects</span>
                </div>
                <div style={styles.bulletItem}>
                  <span style={{ color: '#f97316' }}>•</span>
                  <span style={{ wordSpacing: 'normal' }}>Certification</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* National Challenge */}
        <section style={{ ...styles.orangeBanner, marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div style={styles.comingSoonBadge}>COMING Q2 2026</div>
              <div style={{ ...styles.challengeTitle, wordSpacing: 'normal' }}>National Vibe Makers Hackathon</div>
              <div style={{ ...styles.challengeTagline, wordSpacing: 'normal' }}>Learn. Build. Demo.</div>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={styles.stat}>
                  <div style={styles.statNumber}>2</div>
                  <div style={styles.statLabel}>Days</div>
                </div>
                <div style={styles.stat}>
                  <div style={styles.statNumber}>1-4</div>
                  <div style={styles.statLabel}>Team Size</div>
                </div>
                <div style={styles.stat}>
                  <div style={styles.statNumber}>13-18</div>
                  <div style={styles.statLabel}>Ages</div>
                </div>
              </div>
            </div>
            <div style={styles.qrContainer}>
              <QRCodeSVG 
                value="https://vibemakers.dev"
                size={64}
                level="M"
                bgColor="#ffffff"
                fgColor="#0f172a"
                style={{ borderRadius: '4px', marginBottom: '4px' }}
              />
              <p style={{ fontSize: '8px', color: '#475569', fontWeight: 500 }}>Scan here to learn more</p>
            </div>
          </div>
        </section>

        {/* What Schools Get */}
        <section style={{ flex: 1 }}>
          <div style={{ ...styles.sectionTitle, marginBottom: '10px' }}>What Schools Get</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <div style={styles.checkIcon}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 500, color: '#0f172a', marginBottom: '2px' }}>Ready-to-run enrichment</p>
                <p style={{ fontSize: '10px', color: '#64748b' }}>Lesson plans & materials included</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <div style={styles.checkIcon}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 500, color: '#0f172a', marginBottom: '2px' }}>Customised delivery</p>
                <p style={{ fontSize: '10px', color: '#64748b' }}>CCA, ALP, or cohort-wide</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <div style={styles.checkIcon}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 500, color: '#0f172a', marginBottom: '2px' }}>End-to-end facilitation</p>
                <p style={{ fontSize: '10px', color: '#64748b' }}>Experienced instructors</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <div style={styles.checkIcon}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 500, color: '#0f172a', marginBottom: '2px' }}>Teacher exposure</p>
                <p style={{ fontSize: '10px', color: '#64748b' }}>Optional staff training</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', marginTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#0f172a' }}>Get in touch</p>
              <p style={{ fontSize: '11px', color: '#ea580c' }}>vibemakers@dialogic.academy</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', color: '#475569' }}>vibemakers.dev</p>
              <p style={{ fontSize: '9px', color: '#94a3b8' }}>Singapore's Vibe Coding Education</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '6px', borderTop: '1px solid #f1f5f9' }}>
            <p style={{ fontSize: '9px', color: '#64748b', letterSpacing: '0.05em' }}>By <span style={{ fontWeight: 700, color: '#0f172a' }}>Dialogic Academy</span></p>
          </div>
        </footer>
      </div>
    </div>
  );
});

SchoolOutreachFlyer.displayName = 'SchoolOutreachFlyer';

export default SchoolOutreachFlyer;
