export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type TestimonialDemographic = "students" | "parents" | "teachers";

export const testimonials: Record<TestimonialDemographic, Testimonial[]> = {
  students: [
    {
      quote:
        "I built a CCA points tracker that actually pulls data from a form. My teacher asked if she could use it for the whole cohort next term.",
      name: "Jia Wei T.",
      role: "Sec 3, Chung Cheng High",
    },
    {
      quote:
        "I spent the first hour just figuring out what problem to solve. That part was harder than the coding — but my study planner actually works and I use it every week now.",
      name: "Nur Aisyah M.",
      role: "Sec 4, CHIJ Katong Convent",
    },
    {
      quote:
        "The AI does the syntax, but I had to decide what to build, who it’s for, and what to cut when I ran out of time. That’s the part no one tells you about.",
      name: "Arjun S.",
      role: "JC1, Victoria Junior College",
    },
  ],
  parents: [
    {
      quote:
        "He came home and opened his laptop to keep working on his project — unprompted. That never happens with enrichment classes. The instructors clearly knew when to step back.",
      name: "Mdm Tan",
      role: "Parent of Sec 2 student",
    },
    {
      quote:
        "What convinced me was the demo at the end. She could explain why she made each design decision. It wasn’t just following instructions — she was thinking through it.",
      name: "Mr Lim",
      role: "Parent of Sec 3 student",
    },
    {
      quote:
        "The progress update after each session was helpful. I could see what she built, what she struggled with, and what was planned next. Very different from ‘we did coding today.’",
      name: "Ms Priya Nair",
      role: "Parent of JC student",
    },
  ],
  teachers: [
    {
      quote:
        "We ran it as a 3-day post-exam enrichment. Students who normally disengage during non-curricular time were building apps and presenting to each other by day two.",
      name: "Ms Cheryl Goh",
      role: "HOD ICT, Secondary school",
    },
    {
      quote:
        "The facilitators differentiated naturally — gave extension prompts to stronger students and scaffolded weaker ones. Everyone shipped something by the end.",
      name: "Mr Hafiz Rahman",
      role: "ICT Coordinator",
    },
    {
      quote:
        "It maps well to our ALP outcomes. The design thinking component was genuine — students were empathising with real users, not just going through the motions.",
      name: "Dr Suresh Nair",
      role: "Head of Department, Infocomm",
    },
  ],
};

