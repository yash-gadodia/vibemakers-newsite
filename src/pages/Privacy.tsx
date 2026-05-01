import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | Vibe Makers Academy</title>
        <meta name="description" content="Privacy Policy for Vibe Makers Academy — how we collect, use, and protect your data." />
        <link rel="canonical" href="https://vibemakers.dev/privacy" />
      </Helmet>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 2026</p>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary">
            <h2>1. Introduction</h2>
            <p>
              Vibe Makers Academy ("we", "our", "us"), a programme by Dialogic Academy Pte Ltd (UEN: 202040782G),
              is committed to protecting the privacy of our users. This policy explains how we collect, use, and
              safeguard your personal data when you use our website at vibemakers.dev.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Contact information</strong> — name, email address, phone number provided through our enquiry forms</li>
              <li><strong>Student information</strong> — student name, age, school, and programme interest submitted by parents or guardians</li>
              <li><strong>School information</strong> — school name, contact person details, and programme requirements</li>
              <li><strong>Event registrations</strong> — name, email, school, and age group for hackathon and event sign-ups</li>
              <li><strong>Usage data</strong> — pages visited, browser type, and device information collected automatically</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Respond to enquiries and provide information about our programmes</li>
              <li>Process event registrations and manage waitlists</li>
              <li>Send relevant updates about programmes and events you have expressed interest in</li>
              <li>Improve our website and services</li>
            </ul>

            <h2>4. Data Protection</h2>
            <p>
              We store your data securely using industry-standard encryption and access controls.
              We do not sell, rent, or share your personal data with third parties for marketing purposes.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfil the purposes for
              which it was collected, or as required by applicable laws and regulations.
            </p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Withdraw consent for data processing</li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>
              Our programmes serve students aged 13–18. We collect student information only with
              parental or guardian consent. Parents may contact us to review, modify, or delete their
              child's data at any time.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              For privacy-related queries, contact us at{" "}
              <a href="mailto:human@vibemakers.dev">human@vibemakers.dev</a>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
