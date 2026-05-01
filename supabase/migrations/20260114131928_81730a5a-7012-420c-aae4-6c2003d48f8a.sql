-- Create table for hackathon waitlist submissions
CREATE TABLE public.hackathon_waitlist (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    school TEXT NOT NULL,
    age_group TEXT NOT NULL,
    parental_consent BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for school partnership enquiries
CREATE TABLE public.school_enquiries (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    school_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_role TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for parent/student interest forms
CREATE TABLE public.parent_interest (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_name TEXT NOT NULL,
    parent_email TEXT NOT NULL,
    student_name TEXT NOT NULL,
    student_age TEXT NOT NULL,
    programme_interest TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.hackathon_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_interest ENABLE ROW LEVEL SECURITY;

-- Create policies for public insert (anonymous submissions)
CREATE POLICY "Anyone can submit hackathon waitlist"
ON public.hackathon_waitlist
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can submit school enquiries"
ON public.school_enquiries
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can submit parent interest"
ON public.parent_interest
FOR INSERT
WITH CHECK (true);

-- Note: No SELECT policies - submissions are write-only for anonymous users