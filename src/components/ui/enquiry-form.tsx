import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { sendNotificationEmail } from "@/lib/sendNotification";
import { cn } from "@/lib/utils";

const parentSchema = z.object({
  parent_name: z.string().min(2, "Required"),
  parent_email: z.string().email("Invalid email"),
  student_name: z.string().min(1, "Required"),
  student_age: z.string().min(1, "Required"),
  programme_interest: z.string().optional().default(""),
  message: z.string().optional(),
});

const schoolSchema = z.object({
  contact_name: z.string().min(2, "Required"),
  contact_email: z.string().email("Invalid email"),
  contact_role: z.string().min(1, "Required"),
  school_name: z.string().min(1, "Required"),
  student_level: z.string().optional().default(""),
  number_of_students: z.string().optional().default(""),
  programme_objectives: z.string().optional().default(""),
  timing_sessions: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

type Audience = "parent" | "school";

type EnquiryFormProps = {
  audience: Audience;
  className?: string;
};

export function EnquiryForm({ audience, className }: EnquiryFormProps) {
  if (audience === "parent") return <ParentForm className={className} />;
  return <SchoolForm className={className} />;
}

function ParentForm({ className }: { className?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof parentSchema>>({
    resolver: zodResolver(parentSchema),
  });

  const onSubmit = async (data: z.infer<typeof parentSchema>) => {
    setSubmitting(true);
    const { error } = await supabase.from("parent_interest").insert(data);
    if (error) {
      toast.error("Couldn't send your enquiry. Try again or WhatsApp us.");
      setSubmitting(false);
      return;
    }
    sendNotificationEmail("parent_interest", data);
    toast.success("Got it. We'll reply within 24 hours.");
    reset();
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("vm-card rounded-2xl border border-border bg-card p-8 md:p-10 space-y-6", className)}>
      <div className="space-y-2">
        <Label htmlFor="parent_name" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Parent name
        </Label>
        <Input
          id="parent_name"
          {...register("parent_name")}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        {errors.parent_name ? <p className="text-destructive text-xs mt-1">{errors.parent_name.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="parent_email" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Email
        </Label>
        <Input
          id="parent_email"
          type="email"
          {...register("parent_email")}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        {errors.parent_email ? <p className="text-destructive text-xs mt-1">{errors.parent_email.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="student_name" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Student name
        </Label>
        <Input
          id="student_name"
          {...register("student_name")}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        {errors.student_name ? <p className="text-destructive text-xs mt-1">{errors.student_name.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="student_age" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Student age
        </Label>
        <Input
          id="student_age"
          {...register("student_age")}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        {errors.student_age ? <p className="text-destructive text-xs mt-1">{errors.student_age.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="programme_interest" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Programme interest (optional)
        </Label>
        <Input
          id="programme_interest"
          {...register("programme_interest")}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Anything else? (optional)
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          rows={3}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="vm-btn inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-sticker disabled:opacity-50 w-full md:w-auto"
      >
        {submitting ? "Sending..." : "Send enquiry"}
        <span className="vm-arrow">→</span>
      </button>
    </form>
  );
}

function SchoolForm({ className }: { className?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schoolSchema>>({
    resolver: zodResolver(schoolSchema),
  });

  const onSubmit = async (data: z.infer<typeof schoolSchema>) => {
    setSubmitting(true);
    const { error } = await supabase.from("school_enquiries").insert(data);
    if (error) {
      toast.error("Couldn't send your enquiry. Try again or email us.");
      setSubmitting(false);
      return;
    }
    sendNotificationEmail("school_enquiry", data);
    toast.success("Got it. We'll be in touch within 1 business day.");
    reset();
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("vm-card rounded-2xl border border-border bg-card p-8 md:p-10 space-y-6", className)}>
      <div className="space-y-2">
        <Label htmlFor="contact_name" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Contact name
        </Label>
        <Input
          id="contact_name"
          {...register("contact_name")}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        {errors.contact_name ? <p className="text-destructive text-xs mt-1">{errors.contact_name.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_role" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Your role
        </Label>
        <Input
          id="contact_role"
          placeholder="HoD, Teacher, Principal..."
          {...register("contact_role")}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        {errors.contact_role ? <p className="text-destructive text-xs mt-1">{errors.contact_role.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_email" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Email
        </Label>
        <Input
          id="contact_email"
          type="email"
          {...register("contact_email")}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        {errors.contact_email ? <p className="text-destructive text-xs mt-1">{errors.contact_email.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="school_name" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          School name
        </Label>
        <Input
          id="school_name"
          {...register("school_name")}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        {errors.school_name ? <p className="text-destructive text-xs mt-1">{errors.school_name.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="student_level" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Student level (optional)
        </Label>
        <Input
          id="student_level"
          placeholder="Sec 1-4, JC..."
          {...register("student_level")}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="number_of_students" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          Approx. number of students (optional)
        </Label>
        <Input
          id="number_of_students"
          {...register("number_of_students")}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="programme_objectives" className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
          What you're looking for (optional)
        </Label>
        <Textarea
          id="programme_objectives"
          {...register("programme_objectives")}
          rows={3}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="vm-btn inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-sticker disabled:opacity-50 w-full md:w-auto"
      >
        {submitting ? "Sending..." : "Get a proposal"}
        <span className="vm-arrow">→</span>
      </button>
    </form>
  );
}
