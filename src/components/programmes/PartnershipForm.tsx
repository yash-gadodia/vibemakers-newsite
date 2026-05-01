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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sendNotificationEmail } from "@/lib/sendNotification";

const partnershipSchema = z.object({
  school_name: z.string().trim().max(200).optional(),
  contact_name: z.string().trim().min(1, "Name is required").max(100),
  contact_role: z.string().min(1, "Please select your role"),
  contact_email: z.string().trim().email("Invalid email").max(255),
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
      const insertData = {
        school_name: data.school_name || null,
        contact_name: data.contact_name,
        contact_role: data.contact_role,
        contact_email: data.contact_email,
        number_of_students: data.number_of_students || null,
        student_level: data.student_level || null,
        timing_sessions: data.timing_sessions || null,
        programme_objectives: data.programme_objectives || null,
      };

      const { error } = await supabase.from("school_enquiries").insert(insertData);

      if (error) throw error;

      // Send notification email (non-blocking)
      sendNotificationEmail("school_enquiry", insertData);

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
      <div className="text-center py-12 px-6 bg-background/10 border border-background/20 rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h4 className="text-xl font-display font-bold mb-2">Thank You!</h4>
        <p className="text-background/70">
          We'll prepare a proposal and reach out within 3 working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-background/10 border border-background/20 rounded-2xl p-6 md:p-8">
      <div className="space-y-2">
        <Label htmlFor="school_name" className="text-background">School / Organisation (optional)</Label>
        <Input
          id="school_name"
          {...register("school_name")}
          placeholder="Leave blank if enquiring for private tuition"
          className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
        />
        {errors.school_name && <p className="text-sm text-red-300">{errors.school_name.message}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact_name" className="text-background">Your Name *</Label>
          <Input
            id="contact_name"
            {...register("contact_name")}
            placeholder="Contact person"
            className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
          />
          {errors.contact_name && <p className="text-sm text-red-300">{errors.contact_name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-background">Your Role *</Label>
          <Select value={watch("contact_role")} onValueChange={(value) => setValue("contact_role", value)}>
            <SelectTrigger className="bg-background/10 border-background/20 text-background">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.contact_role && <p className="text-sm text-red-300">{errors.contact_role.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_email" className="text-background">Email *</Label>
        <Input
          id="contact_email"
          type="email"
          {...register("contact_email")}
          placeholder="your@school.edu.sg"
          className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
        />
        {errors.contact_email && <p className="text-sm text-red-300">{errors.contact_email.message}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number_of_students" className="text-background">Number of Students</Label>
          <Input
            id="number_of_students"
            {...register("number_of_students")}
            placeholder="e.g., 30, 60-80"
            className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-background">Student Level</Label>
          <Select value={watch("student_level")} onValueChange={(value) => setValue("student_level", value)}>
            <SelectTrigger className="bg-background/10 border-background/20 text-background">
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
        <Label htmlFor="timing_sessions" className="text-background">Timing & Number of Sessions</Label>
        <Input
          id="timing_sessions"
          {...register("timing_sessions")}
          placeholder="e.g., 4 x 2hr sessions during June holidays"
          className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="programme_objectives" className="text-background">Programme Objectives / Needs (optional)</Label>
        <Textarea
          id="programme_objectives"
          {...register("programme_objectives")}
          placeholder="What do you hope students will gain? Any specific themes or focus areas?"
          rows={3}
          className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
        />
      </div>

      <Button type="submit" variant="secondary" className="w-full bg-background text-foreground hover:bg-background/90" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request a Proposal"
        )}
      </Button>
    </form>
  );
}
