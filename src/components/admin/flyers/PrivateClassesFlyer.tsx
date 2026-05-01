import { forwardRef } from "react";
import logoSvg from "@/assets/logo.svg";

const PrivateClassesFlyer = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="vm-pc-flyer">
      <style>{`
        .vm-pc-flyer {
          --orange-50:  #fff7ed;
          --orange-100: #ffedd5;
          --orange-200: #fed7aa;
          --orange-300: #fdba74;
          --orange-400: #fb923c;
          --orange-500: #f97316;
          --orange-600: #ea580c;
          --orange-700: #c2410c;
          --orange-900: #7c2d12;

          --ink: #1c1917;
          --ink-2: #292524;
          --mute: #78716c;
          --rule: #e7e5e4;
          --paper: #fffbf5;
          --paper-2: #ffffff;

          --display: 'Cabinet Grotesk', 'Satoshi', -apple-system, system-ui, sans-serif;
          --body: 'Satoshi', -apple-system, system-ui, sans-serif;
          --mono: 'JetBrains Mono', ui-monospace, monospace;

          width: 210mm;
          height: 297mm;
          background: var(--paper);
          color: var(--ink);
          font-family: var(--body);
          -webkit-font-smoothing: antialiased;
          position: relative;
          overflow: hidden;
          padding: 9mm 12mm 6mm;
          display: flex;
          flex-direction: column;
          gap: 3mm;
          box-sizing: border-box;
        }
        .vm-pc-flyer * { box-sizing: border-box; }

        /* HEADER */
        .vm-pc-flyer .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid var(--ink);
          padding-bottom: 3.5mm;
        }
        .vm-pc-flyer .brand { display: flex; align-items: center; gap: 11px; }
        .vm-pc-flyer .logo-mark {
          width: 44px; height: 44px; border-radius: 10px;
          background: var(--orange-500);
          display: grid; place-items: center;
          padding: 4px;
          flex-shrink: 0;
        }
        .vm-pc-flyer .logo-mark img { width: 100%; height: 100%; object-fit: contain; }
        .vm-pc-flyer .wordmark {
          font-family: var(--display);
          font-weight: 700; font-size: 17px; letter-spacing: -0.015em;
          color: var(--ink); line-height: 1;
        }
        .vm-pc-flyer .wordmark .dot { color: var(--orange-500); }
        .vm-pc-flyer .sub {
          font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--mute); margin-top: 4px; font-weight: 500;
          font-family: var(--body);
        }
        .vm-pc-flyer .meta {
          text-align: right;
          font-family: var(--mono);
          font-size: 9px; letter-spacing: 0.05em;
          color: var(--mute); line-height: 1.55;
          text-transform: uppercase;
        }
        .vm-pc-flyer .meta strong { color: var(--ink); font-weight: 600; }

        /* HERO */
        .vm-pc-flyer .hero {
          display: grid; grid-template-columns: 1.5fr .8fr; gap: 6mm;
          align-items: end;
          padding: 3mm 0 3mm;
        }
        .vm-pc-flyer .eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--mono);
          font-size: 9px; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--orange-700);
          padding: 4px 10px; border-radius: 999px;
          background: var(--orange-100);
          border: 1px solid var(--orange-200);
          font-weight: 500;
        }
        .vm-pc-flyer .eyebrow::before {
          content: ""; width: 6px; height: 6px; border-radius: 50%;
          background: var(--orange-500);
        }
        .vm-pc-flyer .display {
          font-family: var(--display);
          font-weight: 700;
          font-size: 40px;
          line-height: 1.02;
          letter-spacing: -0.032em;
          color: var(--ink);
          margin: 6px 0 0;
          text-wrap: balance;
        }
        .vm-pc-flyer .display em {
          font-style: normal;
          color: var(--orange-600);
          padding-right: 0.06em;
        }
        .vm-pc-flyer .lede {
          font-size: 10.5px; line-height: 1.5;
          color: var(--ink-2);
          max-width: 60ch;
          margin-top: 3mm;
          text-wrap: pretty;
        }
        .vm-pc-flyer .trust {
          display: flex; flex-direction: column; gap: 7px;
          border-left: 3px solid var(--orange-500);
          padding-left: 5mm;
        }
        .vm-pc-flyer .trust .row { display: flex; gap: 10px; align-items: baseline; }
        .vm-pc-flyer .trust .num {
          font-family: var(--display);
          font-weight: 700;
          font-size: 28px; line-height: 1;
          letter-spacing: -0.035em;
          color: var(--ink);
        }
        .vm-pc-flyer .trust .num .plus { color: var(--orange-500); }
        .vm-pc-flyer .trust .label {
          font-size: 8.5px; color: var(--mute);
          letter-spacing: 0.08em; text-transform: uppercase;
          font-family: var(--mono); line-height: 1.3;
          font-weight: 500;
        }

        /* CARDS */
        .vm-pc-flyer .cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4mm;
        }
        .vm-pc-flyer .card {
          background: var(--paper-2);
          border: 1px solid var(--rule);
          border-radius: 14px;
          padding: 4mm 4.5mm;
          display: flex; flex-direction: column;
          gap: 1.5mm;
          position: relative;
        }
        .vm-pc-flyer .card h3 {
          font-family: var(--mono);
          font-size: 9px; letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--mute);
          margin: 0; font-weight: 500;
          display: flex; align-items: center; gap: 8px;
        }
        .vm-pc-flyer .card h3 .num {
          display: inline-grid; place-items: center;
          width: 18px; height: 18px;
          background: var(--orange-500); color: #fff;
          border-radius: 5px; font-size: 9px;
          font-weight: 700; letter-spacing: 0;
          font-family: var(--display);
        }
        .vm-pc-flyer .card .title {
          font-family: var(--display);
          font-weight: 600;
          font-size: 17px; line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 1mm 0 0;
          text-wrap: balance;
        }
        .vm-pc-flyer .card p {
          font-size: 10px; line-height: 1.55;
          color: var(--ink-2); margin: 0;
          text-wrap: pretty;
        }
        .vm-pc-flyer .format ul {
          list-style: none; padding: 0; margin: 1mm 0 0;
          display: flex; flex-direction: column; gap: 5px;
        }
        .vm-pc-flyer .format li {
          display: grid; grid-template-columns: 48px 1fr; gap: 8px;
          font-size: 10px; color: var(--ink-2);
          line-height: 1.45;
        }
        .vm-pc-flyer .format li .k {
          font-family: var(--mono);
          font-size: 8.5px; color: var(--orange-700);
          letter-spacing: 0.06em; text-transform: uppercase;
          padding-top: 2px; font-weight: 600;
        }
        .vm-pc-flyer .format li strong { color: var(--ink); font-weight: 600; }
        .vm-pc-flyer .pills {
          display: flex; flex-wrap: wrap; gap: 5px;
          margin-top: auto; padding-top: 2mm;
        }
        .vm-pc-flyer .pill {
          font-size: 9px; padding: 3px 8px; border-radius: 6px;
          background: var(--orange-50);
          border: 1px solid var(--orange-200);
          color: var(--orange-700);
          font-family: var(--mono);
          letter-spacing: 0.03em;
          font-weight: 500;
        }

        /* PACKAGES */
        .vm-pc-flyer .packages {
          background: var(--ink);
          color: var(--paper);
          border-radius: 14px;
          padding: 5mm 5mm 5.5mm;
          display: grid;
          grid-template-columns: 1.1fr .9fr .9fr .9fr;
          gap: 4mm;
          align-items: stretch;
          position: relative;
          overflow: hidden;
          flex: 0 0 auto;
        }
        .vm-pc-flyer .packages::after {
          content: ""; position: absolute; inset: 0;
          background:
            radial-gradient(500px 260px at 0% 100%, rgba(249,115,22,.35), transparent 60%),
            radial-gradient(400px 200px at 100% 0%, rgba(249,115,22,.18), transparent 60%);
          pointer-events: none;
        }
        .vm-pc-flyer .packages > * { position: relative; z-index: 1; }
        .vm-pc-flyer .pk-intro h3 {
          font-family: var(--mono);
          font-size: 9px; letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--orange-400);
          margin: 0 0 6px; font-weight: 500;
        }
        .vm-pc-flyer .pk-intro .headline {
          font-family: var(--display);
          font-weight: 700;
          font-size: 22px; line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--paper);
        }
        .vm-pc-flyer .pk-intro .headline em {
          color: var(--orange-400); font-style: normal;
        }
        .vm-pc-flyer .pk-intro p {
          font-size: 9px; line-height: 1.5; margin: 7px 0 0;
          color: #d6d3d1;
        }
        .vm-pc-flyer .pk {
          border-left: 1px solid rgba(255,255,255,.08);
          padding-left: 4mm;
          display: flex; flex-direction: column; gap: 2mm;
        }
        .vm-pc-flyer .pk.featured {
          background: linear-gradient(180deg, rgba(249,115,22,.14), rgba(249,115,22,.04));
          border-left: 1px solid var(--orange-500);
          border-radius: 10px;
          padding: 3mm 3mm 3mm 4mm;
          margin: 0;
          position: relative;
        }
        .vm-pc-flyer .pk.featured::before {
          content: "Most popular";
          position: absolute; top: -10px; left: 10px;
          font-family: var(--mono);
          font-size: 8px; letter-spacing: 0.12em;
          text-transform: uppercase;
          background: var(--orange-500);
          color: #fff;
          padding: 2px 7px; border-radius: 4px;
          font-weight: 600;
        }
        .vm-pc-flyer .pk .name {
          font-family: var(--mono);
          font-size: 9px; letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--orange-400);
          font-weight: 500;
        }
        .vm-pc-flyer .pk .size {
          font-family: var(--display);
          font-weight: 700;
          font-size: 30px; line-height: 1;
          color: var(--paper);
          letter-spacing: -0.035em;
        }
        .vm-pc-flyer .pk .size span {
          font-size: 12px; color: #a8a29e; margin-left: 4px;
          font-weight: 500; letter-spacing: 0;
          font-family: var(--body);
        }
        .vm-pc-flyer .pk .price {
          font-family: var(--display);
          font-size: 15px; font-weight: 600;
          color: var(--paper);
          letter-spacing: -0.015em;
          display: flex; align-items: center; gap: 6px;
        }
        .vm-pc-flyer .pk .price .ph {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--orange-400);
          background: rgba(249,115,22,.15);
          border: 1px dashed rgba(249,115,22,.5);
          padding: 2px 6px; border-radius: 3px;
          letter-spacing: 0.08em;
          font-weight: 500;
        }
        .vm-pc-flyer .pk .per {
          font-size: 8.5px;
          color: #a8a29e;
          font-family: var(--mono);
          letter-spacing: 0.04em;
          font-weight: 500;
        }
        .vm-pc-flyer .pk ul {
          list-style: none; padding: 0; margin: 1.5mm 0 0;
          display: flex; flex-direction: column; gap: 3px;
        }
        .vm-pc-flyer .pk li {
          font-size: 9px; line-height: 1.45;
          color: #d6d3d1;
          padding-left: 12px; position: relative;
        }
        .vm-pc-flyer .pk li::before {
          content: ""; position: absolute; left: 0; top: 7px;
          width: 6px; height: 1px; background: var(--orange-500);
        }
        .vm-pc-flyer .pk li .ph {
          font-family: var(--mono);
          font-size: 8px;
          color: var(--orange-300);
          background: rgba(249,115,22,.12);
          border: 1px dashed rgba(249,115,22,.4);
          padding: 1px 5px; border-radius: 3px;
          letter-spacing: 0.06em;
          font-weight: 500;
        }

        /* CTA ROW */
        .vm-pc-flyer .cta {
          display: grid; grid-template-columns: 1.4fr 1fr; gap: 3.5mm;
          align-items: stretch;
        }
        .vm-pc-flyer .trial {
          background: var(--orange-500);
          color: #fff;
          border-radius: 14px;
          padding: 4.5mm 5.5mm;
          display: flex; flex-direction: column;
          justify-content: center; gap: 2mm;
          position: relative;
          overflow: hidden;
          min-height: 34mm;
        }
        .vm-pc-flyer .trial::after {
          content: ""; position: absolute; inset: 0;
          background: radial-gradient(400px 200px at 100% 0%, rgba(255,237,213,.2), transparent 60%);
          pointer-events: none;
        }
        .vm-pc-flyer .trial > * { position: relative; z-index: 1; }
        .vm-pc-flyer .trial-eyebrow {
          font-family: var(--mono);
          font-size: 8.5px; letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--orange-100);
          font-weight: 500;
          margin-bottom: 1mm;
        }
        .vm-pc-flyer .trial .copy h4 {
          font-family: var(--display);
          font-weight: 700;
          font-size: 19px; line-height: 1.08;
          letter-spacing: -0.028em;
          margin: 0; color: #fff;
          text-wrap: balance;
        }
        .vm-pc-flyer .trial .copy h4 em {
          font-style: normal;
          background: var(--orange-100);
          color: var(--orange-700);
          padding: 0 6px;
          border-radius: 4px;
          white-space: nowrap;
        }
        .vm-pc-flyer .trial .copy p {
          font-size: 9.5px; line-height: 1.5;
          color: var(--orange-100);
          margin: 2mm 0 0;
          max-width: 58ch;
        }

        /* CONTACT */
        .vm-pc-flyer .contact {
          background: var(--paper-2);
          border: 1px solid var(--rule);
          border-radius: 14px;
          padding: 4mm 5mm;
          display: flex; flex-direction: column; gap: 1.5mm;
        }
        .vm-pc-flyer .contact h3 {
          font-family: var(--mono);
          font-size: 9px; letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--mute);
          margin: 0 0 1mm; font-weight: 500;
        }
        .vm-pc-flyer .contact .line {
          display: grid; grid-template-columns: 70px 1fr;
          gap: 3mm; align-items: baseline;
          padding: 4px 0;
          border-top: 1px dashed var(--rule);
          font-size: 10px;
        }
        .vm-pc-flyer .contact .line:first-of-type {
          border-top: none; padding-top: 1px;
        }
        .vm-pc-flyer .contact .line .k {
          font-family: var(--mono);
          font-size: 8.5px; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--mute);
          font-weight: 500;
        }
        .vm-pc-flyer .contact .line .v { color: var(--ink); font-weight: 500; }
        .vm-pc-flyer .contact .line .v a {
          color: var(--orange-700); text-decoration: none;
          border-bottom: 1px solid var(--orange-300);
          font-weight: 600;
        }

        /* FOOTER */
        .vm-pc-flyer .foot {
          margin-top: auto;
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 3mm;
          border-top: 1px solid var(--ink);
          font-family: var(--mono);
          font-size: 8.5px; letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--mute);
          font-weight: 500;
          white-space: nowrap;
        }
        .vm-pc-flyer .foot .lockup {
          display: flex; align-items: center; gap: 7px; color: var(--ink);
        }
        .vm-pc-flyer .foot .lockup::before {
          content: ""; width: 12px; height: 2px; background: var(--orange-500);
        }

        .vm-pc-flyer .ph {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--orange-700);
          background: rgba(249,115,22,.08);
          border: 1px dashed rgba(249,115,22,.35);
          padding: 1px 5px; border-radius: 3px;
          letter-spacing: 0.06em;
          font-weight: 500;
        }
      `}</style>

      <header className="top">
        <div className="brand">
          <div className="logo-mark">
            <img src={logoSvg} alt="Vibe Makers" />
          </div>
          <div>
            <div className="wordmark">vibemakers<span className="dot">.</span></div>
            <div className="sub">Private Classes</div>
          </div>
        </div>
        <div className="meta">
          <div>
            A letter to prospective <strong>parents &amp; guardians</strong>
          </div>
          <div>Singapore</div>
        </div>
      </header>

      <section className="hero">
        <div>
          <span className="eyebrow">Private 1-to-1 &amp; small-group coaching</span>
          <h1 className="display">
            AI Problem Solving &amp; Vibe Making, taught the way your teen
            actually <em>learns best</em>.
          </h1>
          <p className="lede">
            Vibe Makers is a leading AI Problem Solving &amp; Vibe Making
            academy for teens aged 13 to 18 in Singapore. We take the same
            curriculum trusted by 40+ schools and 5,000+ students and bring it
            home: live, online, and tailored to one student (or a small circle
            of friends). We focus on <em>building real things</em>; code is part
            of the process, not the goal. By the end of their first class, your
            child will have shipped a working app they can share with you.
          </p>
        </div>
        <aside className="trust">
          <div className="row">
            <div className="num">
              40<span className="plus">+</span>
            </div>
            <div className="label">Partner schools</div>
          </div>
          <div className="row">
            <div className="num">
              5,000<span className="plus">+</span>
            </div>
            <div className="label">Students coached</div>
          </div>
          <div className="row">
            <div className="num">13–18</div>
            <div className="label">Ages we teach</div>
          </div>
        </aside>
      </section>

      <div className="cards">
        <div className="card format">
          <h3>
            <span className="num">1</span> The format
          </h3>
          <div className="title">
            Live online. One student, or a small circle of peers.
          </div>
          <ul>
            <li>
              <span className="k">1-to-1</span>
              <span>
                <strong>Private coaching, 60 min.</strong> Start immediately.
                Scheduled around school, CCAs &amp; exams.
              </span>
            </li>
            <li>
              <span className="k">Group</span>
              <span>
                <strong>Small group of 3–5, 90 min.</strong> Bring your own
                friends &amp; learn together at a preferential rate.
              </span>
            </li>
            <li>
              <span className="k">When</span>
              <span>
                <strong>Weekly sessions.</strong> Scheduling{" "}
                <span className="ph">[ TBD ]</span>.
              </span>
            </li>
            <li>
              <span className="k">Where</span>
              <span>
                <strong>Zoom</strong> with screen-share. A laptop &amp; internet
                is all that's needed; we provide the AI tools &amp; credits.
              </span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3>
            <span className="num">2</span> What they'll make
          </h3>
          <div className="title">Real things. Shipped. Shared.</div>
          <p>
            Coaches guide students through the modern maker's stack used by
            professional founders (ChatGPT, Claude, Cursor, Lovable, Supabase)
            to turn an idea into a working product in a single session. Projects
            scale with skill: a personality quiz one week, a full data-driven
            app the next.
          </p>
          <div className="pills">
            <span className="pill">Problem Solving</span>
            <span className="pill">AI Prompting</span>
            <span className="pill">Product Thinking</span>
            <span className="pill">Web Apps</span>
            <span className="pill">Databases</span>
            <span className="pill">Design</span>
          </div>
        </div>
      </div>

      <div className="packages">
        <div className="pk-intro">
          <h3>· Packages</h3>
          <div className="headline">
            Flexible packs.
            <br />
            <em>No surprises.</em>
          </div>
          <p>
            All packs include materials, a shared project workspace, and parent
            progress notes <span className="ph">[ TBD cadence ]</span>. Group
            rates priced per student; 3–5 students per group.
          </p>
        </div>
        <div className="pk">
          <div className="name">Starter</div>
          <div className="size">
            4 <span>sessions</span>
          </div>
          <div className="price">
            SGD <span className="ph">[ TBD ]</span>
          </div>
          <div className="per">per student · 60 min 1-to-1 / 90 min group</div>
          <ul>
            <li>Best for a first look</li>
            <li>
              Validity <span className="ph">[ TBD ]</span>
            </li>
          </ul>
        </div>
        <div className="pk featured">
          <div className="name">Term</div>
          <div className="size">
            10 <span>sessions</span>
          </div>
          <div className="price">
            SGD <span className="ph">[ TBD ]</span>
          </div>
          <div className="per">per student · saves vs. Starter</div>
          <ul>
            <li>Matches a school term</li>
            <li>
              Validity <span className="ph">[ TBD ]</span>
            </li>
            <li>Showcase project at the end</li>
          </ul>
        </div>
        <div className="pk">
          <div className="name">Year</div>
          <div className="size">
            20 <span>sessions</span>
          </div>
          <div className="price">
            SGD <span className="ph">[ TBD ]</span>
          </div>
          <div className="per">per student · best value</div>
          <ul>
            <li>Portfolio of 3–5 apps</li>
            <li>
              Validity <span className="ph">[ TBD ]</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="cta">
        <div className="trial">
          <div className="copy">
            <div className="trial-eyebrow">FIRST CLASS ON US</div>
            <h4>
              Start with a <em>free trial</em>.
            </h4>
            <p>
              Meet the coach, find the right track, and ship something real. No
              card required, no obligation. One trial per student, same format
              as a regular class.
            </p>
          </div>
        </div>

        <div className="contact">
          <h3>· Next steps</h3>
          <div className="line">
            <div className="k">Email</div>
            <div className="v">
              <a href="mailto:vibemakers@dialogic.academy">
                vibemakers@dialogic.academy
              </a>
            </div>
          </div>
          <div className="line">
            <div className="k">Website</div>
            <div className="v">
              <a href="https://vibemakers.dev">vibemakers.dev</a>
            </div>
          </div>
          <div className="line">
            <div className="k">Reply with</div>
            <div className="v">
              Child's age · availability · 1-to-1 or group
            </div>
          </div>
        </div>
      </div>

      <footer className="foot">
        <div className="lockup">Vibe Makers · Singapore</div>
        <div>© Vibe Makers 2026</div>
      </footer>
    </div>
  );
});

PrivateClassesFlyer.displayName = "PrivateClassesFlyer";

export default PrivateClassesFlyer;
