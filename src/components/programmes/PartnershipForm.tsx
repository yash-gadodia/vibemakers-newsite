import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendNotificationEmail } from "@/lib/sendNotification";
import { submitSchoolEnquiry } from "@/lib/formApi";

const partnershipSchema = z.object({
  school_name: z.string().trim().max(200).optional(),
  contact_name: z.string().trim().min(1, "Name is required").max(100),
  contact_role: z.string().min(1, "Please select your role"),
  contact_email: z.string().trim().email("Invalid email").max(255),
  contact_phone: z.string().trim().max(40).optional(),
  number_of_students: z.string().trim().max(50).optional(),
  student_level: z.string().max(100).optional(),
  timing_sessions: z.string().trim().max(200).optional(),
  programme_objectives: z.string().max(2000).optional(),
});

type PartnershipData = z.infer<typeof partnershipSchema>;

const roles = [
  "Parent (Private Tuition)",
  "ICT Head / Coordinator",
  "CCA Coordinator",
  "Teacher",
  "Head of Department",
  "Vice Principal",
  "Principal",
  "Other",
];

const studentLevels = [
  "Primary 4-6",
  "Secondary 1-2",
  "Secondary 3-4",
  "JC / Poly",
  "Mixed levels",
];

export function PartnershipForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PartnershipData>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      contact_role: "",
    },
  });

  const onSubmit = async (data: PartnershipData) => {
    setIsLoading(true);
    try {
      // Phone column doesn't exist in school_enquiries — surface it via the
      // existing message field so it lands in email + Telegram cleanly.
      const phone = (data.contact_phone || "").trim();
      const composedMessage = phone
        ? `Phone: ${phone}`
        : null;
      const payload = {
        school_name: data.school_name || undefined,
        contact_name: data.contact_name,
        contact_role: data.contact_role,
        contact_email: data.contact_email,
        number_of_students: data.number_of_students || undefined,
        student_level: data.student_level || undefined,
        timing_sessions: data.timing_sessions || undefined,
        programme_objectives: data.programme_objectives || undefined,
        message: composedMessage || undefined,
      };

      const result = await submitSchoolEnquiry(payload);
      if (!result.ok) throw new Error(result.error);

      sendNotificationEmail("school_enquiry", payload);
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
          We'll prepare a proposal and reach out within 3 working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="vm-card rounded-2xl border border-border bg-card p-8 md:p-10 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="school_name" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          School / Organisation (optional)
        </Label>
        <Input
          id="school_name"
          {...register("school_name")}
          placeholder="Leave blank if enquiring for private tuition"
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        {errors.school_name && <p className="text-xs text-destructive mt-1">{errors.school_name.message}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contact_name" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
            Your Name *
          </Label>
          <Input
            id="contact_name"
            {...register("contact_name")}
            placeholder="Contact person"
            className="border-border bg-background text-foreground placeholder:text-muted-foreground"
          />
          {errors.contact_name && <p className="text-xs text-destructive mt-1">{errors.contact_name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
            Your Role *
          </Label>
          <Select value={watch("contact_role")} onValueChange={(value) => setValue("contact_role", value)}>
            <SelectTrigger className="border-border bg-background text-foreground">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.contact_role && <p className="text-xs text-destructive mt-1">{errors.contact_role.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_email" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Email *
        </Label>
        <Input
          id="contact_email"
          type="email"
          {...register("contact_email")}
          placeholder="your@school.edu.sg"
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        {errors.contact_email && <p className="text-xs text-destructive mt-1">{errors.contact_email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_phone" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Phone (optional)
        </Label>
        <Input
          id="contact_phone"
          type="tel"
          autoComplete="tel"
          {...register("contact_phone")}
          placeholder="+65 9123 4567"
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        {errors.contact_phone && <p className="text-xs text-destructive mt-1">{errors.contact_phone.message}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="number_of_students" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
            Number of Students
          </Label>
          <Input
            id="number_of_students"
            {...register("number_of_students")}
            placeholder="e.g., 30, 60-80"
            className="border-border bg-background text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="space-y-2">
          <Label className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
            Student Level
          </Label>
          <Select value={watch("student_level")} onValueChange={(value) => setValue("student_level", value)}>
            <SelectTrigger className="border-border bg-background text-foreground">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {studentLevels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timing_sessions" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Timing & Number of Sessions
        </Label>
        <Input
          id="timing_sessions"
          {...register("timing_sessions")}
          placeholder="e.g., 4 x 2hr sessions during June holidays"
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="programme_objectives" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Programme Objectives / Needs (optional)
        </Label>
        <Textarea
          id="programme_objectives"
          {...register("programme_objectives")}
          placeholder="What do you hope students will gain? Any specific themes or focus areas?"
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
            Request a Proposal
            <span className="vm-arrow">→</span>
          </>
        )}
      </button>
    </form>
  );
}
