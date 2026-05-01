import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <Helmet>
        <title>Terms of Service | Vibe Makers Academy</title>
        <meta name="description" content="Terms of Service for Vibe Makers Academy website and programmes." />
        <link rel="canonical" href="https://vibemakers.dev/terms" />
      </Helmet>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 2026</p>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary">
            <h2>1. About Us</h2>
            <p>
              Vibe Makers Academy is a programme operated by Dialogic Academy Pte Ltd (UEN: 202040782G),
              a company registered in Singapore. These terms govern your use of the website at vibemakers.dev
              and our educational programmes.
            </p>

            <h2>2. Use of Website</h2>
            <p>By accessing and using this website, you agree to:</p>
            <ul>
              <li>Use the website only for lawful purposes</li>
              <li>Provide accurate information when submitting forms or registrations</li>
              <li>Not attempt to interfere with the website's functionality or security</li>
            </ul>

            <h2>3. Programme Enrolment</h2>
            <p>
              Enrolment in our programmes is subject to availability and eligibility criteria.
              For students under 18, a parent or legal guardian must provide consent for participation.
              Programme fees, schedules, and terms will be communicated separately upon enrolment.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, and design — is the property
              of Dialogic Academy Pte Ltd or its licensors and is protected by intellectual property laws.
              You may not reproduce, distribute, or create derivative works without our written consent.
            </p>

            <h2>5. Student Projects</h2>
            <p>
              Students retain ownership of projects they create during our programmes. By participating,
              students and their guardians grant us permission to showcase project descriptions and
              anonymised examples for educational and promotional purposes.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              We provide this website and its content on an "as is" basis. While we strive for accuracy,
              we do not guarantee that all information is complete, current, or error-free. We are not
              liable for any indirect, incidental, or consequential damages arising from your use of
              the website or our programmes.
            </p>

            <h2>7. External Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the
              content or privacy practices of these external sites.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the website after changes
              are posted constitutes acceptance of the updated terms.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the Republic of Singapore.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a href="mailto:human@vibemakers.dev">human@vibemakers.dev</a>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
