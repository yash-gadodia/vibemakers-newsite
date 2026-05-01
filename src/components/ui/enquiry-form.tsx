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
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <Field id="parent_name" label="Parent name" error={errors.parent_name?.message}>
        <Input id="parent_name" {...register("parent_name")} />
      </Field>
      <Field id="parent_email" label="Email" error={errors.parent_email?.message}>
        <Input id="parent_email" type="email" {...register("parent_email")} />
      </Field>
      <Field id="student_name" label="Student name" error={errors.student_name?.message}>
        <Input id="student_name" {...register("student_name")} />
      </Field>
      <Field id="student_age" label="Student age" error={errors.student_age?.message}>
        <Input id="student_age" {...register("student_age")} />
      </Field>
      <Field id="programme_interest" label="Programme interest (optional)">
        <Input id="programme_interest" {...register("programme_interest")} />
      </Field>
      <Field id="message" label="Anything else? (optional)">
        <Textarea id="message" {...register("message")} rows={3} />
      </Field>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Sending..." : "Send enquiry"}
      </Button>
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
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <Field id="contact_name" label="Contact name" error={errors.contact_name?.message}>
        <Input id="contact_name" {...register("contact_name")} />
      </Field>
      <Field id="contact_role" label="Your role" error={errors.contact_role?.message}>
        <Input id="contact_role" placeholder="HoD, Teacher, Principal..." {...register("contact_role")} />
      </Field>
      <Field id="contact_email" label="Email" error={errors.contact_email?.message}>
        <Input id="contact_email" type="email" {...register("contact_email")} />
      </Field>
      <Field id="school_name" label="School name" error={errors.school_name?.message}>
        <Input id="school_name" {...register("school_name")} />
      </Field>
      <Field id="student_level" label="Student level (optional)">
        <Input id="student_level" placeholder="Sec 1-4, JC..." {...register("student_level")} />
      </Field>
      <Field id="number_of_students" label="Approx. number of students (optional)">
        <Input id="number_of_students" {...register("number_of_students")} />
      </Field>
      <Field id="programme_objectives" label="What you're looking for (optional)">
        <Textarea id="programme_objectives" {...register("programme_objectives")} rows={3} />
      </Field>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Sending..." : "Get a proposal"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </Label>
      {children}
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
