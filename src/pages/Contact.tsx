import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sendNotificationEmail } from "@/lib/sendNotification";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [enquiryType, setEnquiryType] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const type = formData.get("enquiry_type") as string;
    const message = formData.get("message") as string;

    // Route to appropriate table based on enquiry type
    if (type === "school" || type === "organisation") {
      const data = {
        school_name: formData.get("organisation") as string || "",
        contact_name: name,
        contact_email: email,
        contact_role: type === "school" ? "school_staff" : "other",
        message: message || null,
      };
      const { error } = await supabase.from("school_enquiries").insert([data]);
      if (error) {
        toast({ title: "Error", description: "Please try again.", variant: "destructive" });
        setLoading(false);
        return;
      }
      sendNotificationEmail("school_enquiry", data);
    } else {
      // Parent enquiry
      const data = {
        parent_name: name,
        parent_email: email,
        student_name: formData.get("student_name") as string || "Not provided",
        student_age: formData.get("student_age") as string || "Not provided",
        programme_interest: type,
        message: message || null,
      };
      const { error } = await supabase.from("parent_interest").insert([data]);
      if (error) {
        toast({ title: "Error", description: "Please try again.", variant: "destructive" });
        setLoading(false);
        return;
      }
      sendNotificationEmail("parent_interest", data);
    }

    setSubmitted(true);
    toast({ title: "Submitted!", description: "We'll be in touch soon." });
    setLoading(false);
  };

  const showStudentFields = enquiryType && !["school", "organisation"].includes(enquiryType);
  const showOrgField = ["school", "organisation"].includes(enquiryType);

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | Vibemakers Academy Singapore</title>
        <meta name="description" content="Get in touch with Vibemakers Academy. Enquiries for parents, students, and schools welcome. Email: vibemakers@dialogic.academy" />
        <link rel="canonical" href="https://vibemakers.dev/contact" />

        <meta property="og:title" content="Contact Vibemakers Academy" />
        <meta property="og:description" content="Have questions? We'd love to hear from you." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vibemakers.dev/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Vibemakers Academy",
            "description": "Get in touch with Vibemakers Academy, an AI-first enrichment programme for students aged 13-18",
            "mainEntity": {
              "@type": "Organization",
              "name": "Vibemakers Academy",
              "email": "vibemakers@dialogic.academy",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SG",
                "addressLocality": "Singapore"
              }
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <div className="mb-12 md:mb-16">
            <span className="vm-sticker" style={{ transform: 'rotate(-3deg)' }}>
              ● Get in Touch
            </span>
          </div>
          <h1 className="font-display font-bold tracking-display leading-[1.02] text-5xl md:text-6xl mb-6">
            We'd love to hear from you.
          </h1>
          <p className="text-base text-ink-2 max-w-2xl leading-[1.6]">
            Questions about our programmes? Interested in a partnership? Just want to chat? Pick your reason and send us a message.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="bg-bg-warm py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Email Card */}
            <div className="vm-card rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 text-2xl">📧</div>
              <p className="font-mono text-xs uppercase tracking-eyebrow text-ink-2 mb-3">Email</p>
              <h3 className="font-display font-bold text-xl md:text-2xl mb-4 text-foreground">
                vibemakers@dialogic.academy
              </h3>
              <a
                href="mailto:vibemakers@dialogic.academy"
                className="vm-btn inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground hover:bg-accent transition-colors"
              >
                Send an email
                <span className="vm-arrow">→</span>
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="vm-card rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 text-2xl">💬</div>
              <p className="font-mono text-xs uppercase tracking-eyebrow text-ink-2 mb-3">WhatsApp</p>
              <h3 className="font-display font-bold text-xl md:text-2xl mb-4 text-foreground">
                +65 8890 0368
              </h3>
              <a
                href="https://wa.me/6588900368"
                target="_blank"
                rel="noopener noreferrer"
                className="vm-btn inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground hover:bg-accent transition-colors"
              >
                Message on WhatsApp
                <span className="vm-arrow">→</span>
              </a>
            </div>

            {/* Form Card */}
            <div className="vm-card rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 text-2xl">✏️</div>
              <p className="font-mono text-xs uppercase tracking-eyebrow text-ink-2 mb-3">Form</p>
              <h3 className="font-display font-bold text-xl md:text-2xl mb-4 text-foreground">
                Use the form below
              </h3>
              <p className="text-base text-ink-2">
                Tell us what you need and we'll respond within 2 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-bg-warm py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          {submitted ? (
            <div className="vm-card rounded-2xl border border-border bg-card p-8 md:p-12 max-w-2xl mx-auto text-center">
              <div className="mb-6 text-6xl">✅</div>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 text-foreground">
                Thank you!
              </h2>
              <p className="text-base text-ink-2 leading-[1.6]">
                We've received your enquiry and will get back to you within 2 business days.
              </p>
            </div>
          ) : (
            <div className="vm-card rounded-2xl border border-border bg-card p-8 md:p-12 max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Enquiry Type */}
                <div className="space-y-2">
                  <Label htmlFor="enquiry_type" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
                    I'm interested in...
                  </Label>
                  <Select
                    name="enquiry_type"
                    required
                    onValueChange={setEnquiryType}
                  >
                    <SelectTrigger
                      id="enquiry_type"
                      className="border-border bg-background text-foreground"
                    >
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="group">Group Sessions (for my child)</SelectItem>
                      <SelectItem value="1-to-1">1-to-1 Coaching (for my child)</SelectItem>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="school">School Partnership</SelectItem>
                      <SelectItem value="organisation">Organisation / Corporate</SelectItem>
                      <SelectItem value="other">Something else</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Organisation Field (Conditional) */}
                {showOrgField && (
                  <div className="space-y-2">
                    <Label htmlFor="organisation" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
                      Organisation Name
                    </Label>
                    <Input
                      id="organisation"
                      name="organisation"
                      placeholder="Your school or company name"
                      className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                )}

                {/* Student Fields (Conditional) */}
                {showStudentFields && (
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="student_name" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
                        Student Name (optional)
                      </Label>
                      <Input
                        id="student_name"
                        name="student_name"
                        placeholder="e.g., Alex"
                        className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student_age" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
                        Student Age (optional)
                      </Label>
                      <Input
                        id="student_age"
                        name="student_age"
                        placeholder="e.g., 14"
                        className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                )}

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
                    Message (optional)
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about what you're looking for..."
                    className="border-border bg-background text-foreground placeholder:text-muted-foreground min-h-32"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="vm-btn w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sticker hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Send Enquiry"}
                  <span className="vm-arrow">→</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
