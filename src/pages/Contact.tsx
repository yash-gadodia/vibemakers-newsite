import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { GButton } from "@/components/ui/grommet-button";
import { GInput, GTextArea } from "@/components/ui/grommet-input";
import { GCard, GCardContent } from "@/components/ui/grommet-card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sendNotificationEmail } from "@/lib/sendNotification";
import { Reveal } from "@/components/ui/Reveal";

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
        <meta name="description" content="Get in touch with Vibemakers Academy. Enquiries for parents, students, and schools welcome. Email: human@vibemakers.dev" />
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
              "email": "human@vibemakers.dev",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SG",
                "addressLocality": "Singapore"
              }
            }
          })}
        </script>
      </Helmet>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <Reveal variant="up">
            <SectionHeader badge="Contact" title="Get in Touch" description="Have questions? We'd love to hear from you." />
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-12 mt-12">
            {/* Contact Info */}
            <Reveal variant="left">
              <aside className="space-y-6" aria-label="Contact information">
                <GCard className="p-0">
                  <div className="flex items-start gap-4 p-4">
                    <span className="text-2xl" aria-hidden="true">📧</span>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <a href="mailto:human@vibemakers.dev" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        human@vibemakers.dev
                      </a>
                    </div>
                  </div>
                </GCard>
                <GCard className="p-0">
                  <div className="flex items-start gap-4 p-4">
                    <span className="text-2xl" aria-hidden="true">📍</span>
                    <div>
                      <h4 className="font-semibold">Location</h4>
                      <p className="text-sm text-muted-foreground">Singapore</p>
                    </div>
                  </div>
                </GCard>
              </aside>
            </Reveal>

            {/* Single Form */}
            <Reveal variant="right" delayMs={100} className="lg:col-span-2">
              {submitted ? (
                <GCard className="p-8 bg-primary/10 text-center">
                  <GCardContent>
                    <span className="text-5xl block mb-4" aria-hidden="true">✅</span>
                    <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                    <p className="text-muted-foreground">We'll get back to you within 2 business days.</p>
                  </GCardContent>
                </GCard>
              ) : (
                <GCard>
                  <GCardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <GInput id="name" name="name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <GInput id="email" name="email" type="email" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="enquiry_type">I'm interested in...</Label>
                        <Select 
                          name="enquiry_type" 
                          required 
                          onValueChange={setEnquiryType}
                        >
                          <SelectTrigger id="enquiry_type">
                            <SelectValue placeholder="Select..." />
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

                      {showOrgField && (
                        <div className="space-y-2">
                          <Label htmlFor="organisation">Organisation Name</Label>
                          <GInput id="organisation" name="organisation" placeholder="Your school or company name" />
                        </div>
                      )}

                      {showStudentFields && (
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="student_name">Student Name (optional)</Label>
                            <GInput id="student_name" name="student_name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="student_age">Student Age (optional)</Label>
                            <GInput id="student_age" name="student_age" placeholder="e.g., 14" />
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="message">Message (optional)</Label>
                        <GTextArea id="message" name="message" placeholder="Tell us more about what you're looking for..." />
                      </div>

                      <GButton type="submit" className="w-full" disabled={loading}>
                        {loading ? "Submitting..." : "Send Enquiry"}
                      </GButton>
                    </form>
                  </GCardContent>
                </GCard>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
