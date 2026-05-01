import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sendNotificationEmail } from "@/lib/sendNotification";
import { sendTelegramNotification } from "@/lib/sendTelegramNotification";

const registrationSchema = z.object({
  parent_name: z.string().trim().min(1, "Name is required").max(100),
  parent_email: z.string().trim().email("Invalid email").max(255),
  parent_phone: z.string().trim().max(40).optional(),
  student_name: z.string().trim().min(1, "Student name is required").max(100),
  student_age: z.string().min(1, "Please select age group"),
  programme_interest: z.string().min(1, "Please select a format"),
  message: z.string().max(1000).optional(),
});

type RegistrationData = z.infer<typeof registrationSchema>;

export function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      programme_interest: "",
      student_age: "",
    },
  });

  const onSubmit = async (data: RegistrationData) => {
    setIsLoading(true);
    try {
      // Phone column doesn't exist in Supabase schema yet — surface it via
      // the existing message field so it lands in email + Telegram cleanly.
      const phone = (data.parent_phone || "").trim();
      const composedMessage = phone
        ? `Phone: ${phone}${data.message ? `\n\n${data.message}` : ""}`
        : data.message || null;
      const insertData = {
        parent_name: data.parent_name,
        parent_email: data.parent_email,
        student_name: data.student_name,
        student_age: data.student_age,
        programme_interest: data.programme_interest,
        message: composedMessage,
      };

      const { error } = await supabase.from("parent_interest").insert(insertData);

      if (error) throw error;

      // Send notification email + Telegram (non-blocking)
      sendNotificationEmail("parent_interest", insertData);
      sendTelegramNotification("parent_interest", insertData);

      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="vm-card rounded-2xl border border-border bg-card p-8 md:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h4 className="text-xl font-display font-bold mb-2 text-foreground">Thank You!</h4>
        <p className="text-ink-2">
          We'll reach out within 2 working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="vm-card rounded-2xl border border-border bg-card p-8 md:p-10 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="parent_name" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
            Your Name *
          </Label>
          <Input
            id="parent_name"
            {...register("parent_name")}
            placeholder="Parent/Guardian name"
            className="border-border bg-background text-foreground placeholder:text-muted-foreground"
          />
          {errors.parent_name && <p className="text-xs text-destructive mt-1">{errors.parent_name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="parent_email" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
            Email *
          </Label>
          <Input
            id="parent_email"
            type="email"
            {...register("parent_email")}
            placeholder="your@email.com"
            className="border-border bg-background text-foreground placeholder:text-muted-foreground"
          />
          {errors.parent_email && <p className="text-xs text-destructive mt-1">{errors.parent_email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="parent_phone" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Phone (optional)
        </Label>
        <Input
          id="parent_phone"
          type="tel"
          autoComplete="tel"
          {...register("parent_phone")}
          placeholder="+65 9123 4567"
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        {errors.parent_phone && <p className="text-xs text-destructive mt-1">{errors.parent_phone.message}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="student_name" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
            Student's Name *
          </Label>
          <Input
            id="student_name"
            {...register("student_name")}
            placeholder="Your child's name"
            className="border-border bg-background text-foreground placeholder:text-muted-foreground"
          />
          {errors.student_name && <p className="text-xs text-destructive mt-1">{errors.student_name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
            Student's Age Group *
          </Label>
          <RadioGroup
            value={watch("student_age")}
            onValueChange={(value) => setValue("student_age", value)}
            className="flex flex-wrap gap-3"
          >
            {["10-12", "13-15", "16-18"].map((age) => (
              <div key={age} className="flex items-center space-x-2">
                <RadioGroupItem value={age} id={`age-${age}`} />
                <Label htmlFor={`age-${age}`} className="text-sm cursor-pointer">{age}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors.student_age && <p className="text-xs text-destructive mt-1">{errors.student_age.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Preferred Format *
        </Label>
        <RadioGroup
          value={watch("programme_interest")}
          onValueChange={(value) => setValue("programme_interest", value)}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="group" id="format-group" />
            <Label htmlFor="format-group" className="cursor-pointer">Group Sessions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1-to-1" id="format-1to1" />
            <Label htmlFor="format-1to1" className="cursor-pointer">1-to-1 Coaching</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unsure" id="format-unsure" />
            <Label htmlFor="format-unsure" className="cursor-pointer">Not sure yet</Label>
          </div>
        </RadioGroup>
        {errors.programme_interest && <p className="text-xs text-destructive mt-1">{errors.programme_interest.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Anything else we should know? (optional)
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="E.g., specific interests, schedule preferences, questions..."
          rows={3}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="vm-btn inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-sticker disabled:opacity-50 w-full md:w-auto"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Register Interest
            <span className="vm-arrow">→</span>
          </>
        )}
      </button>
    </form>
  );
}
