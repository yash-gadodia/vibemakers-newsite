-- Add new columns to school_enquiries for detailed proposal requests
ALTER TABLE public.school_enquiries 
  ALTER COLUMN school_name DROP NOT NULL,
  ADD COLUMN IF NOT EXISTS number_of_students text,
  ADD COLUMN IF NOT EXISTS student_level text,
  ADD COLUMN IF NOT EXISTS timing_sessions text,
  ADD COLUMN IF NOT EXISTS programme_objectives text;