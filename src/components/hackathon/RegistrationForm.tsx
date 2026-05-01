import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sendNotificationEmail } from "@/lib/sendNotification";

export function RegistrationForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [teamPreference, setTeamPreference] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      school: formData.get("school") as string,
      age_group: formData.get("age_group") as string,
      parental_consent: consent,
    };

    const { error } = await supabase.from("hackathon_waitlist").insert([data]);

    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } else {
      // Send notification email (non-blocking)
      sendNotificationEmail("hackathon_waitlist", {
        ...data,
        team_preference: teamPreference,
        tshirt_size: formData.get("tshirt_size") as string,
        dietary: formData.get("dietary") as string,
      });

      setSubmitted(true);
      toast({ title: "Success!", description: "You're on the waitlist!" });
    }
    setLoading(false);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Register Your Interest
            </h2>
            <p className="text-muted-foreground">
              Be the first to know when registration opens for the National Vibe Makers Hackathon
            </p>
          </div>

          {submitted ? (
            <div className="glass-card p-10 text-center animate-fade-in">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">You're on the list!</h3>
              <p className="text-muted-foreground">
                We'll notify you when registration opens. Get ready to learn, build, and demo something amazing! 🚀
              </p>
            </div>
          ) : (
            <div className="glass-card p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">School *</Label>
                  <Input
                    id="school"
                    name="school"
                    required
                    placeholder="Your school name"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age_group">Age Group *</Label>
                  <Select name="age_group" required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your age group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12-14">12-14 years</SelectItem>
                      <SelectItem value="15-16">15-16 years</SelectItem>
                      <SelectItem value="17-18">17-18 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Team Preference</Label>
                  <RadioGroup
                    value={teamPreference}
                    onValueChange={setTeamPreference}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="find_team" id="find_team" />
                      <Label htmlFor="find_team" className="text-sm cursor-pointer">
                        I want to find teammates
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="have_team" id="have_team" />
                      <Label htmlFor="have_team" className="text-sm cursor-pointer">
                        I already have a team
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="solo" id="solo" />
                      <Label htmlFor="solo" className="text-sm cursor-pointer">
                        I'll participate solo
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tshirt_size">T-Shirt Size</Label>
                    <Select name="tshirt_size">
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xs">XS</SelectItem>
                        <SelectItem value="s">S</SelectItem>
                        <SelectItem value="m">M</SelectItem>
                        <SelectItem value="l">L</SelectItem>
                        <SelectItem value="xl">XL</SelectItem>
                        <SelectItem value="xxl">XXL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dietary">Dietary Requirements</Label>
                    <Select name="dietary">
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="halal">Halal</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(c) => setConsent(c as boolean)}
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor="consent"
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    I confirm I have parental consent if under 18 years old
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-semibold"
                  disabled={loading || !consent}
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      <span className="mr-2">✨</span>
                      Register Interest
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
