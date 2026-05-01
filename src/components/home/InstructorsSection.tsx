import { Linkedin } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import peiSongPhoto from "@/assets/faculty/pei-song.jpg";
import yashGadodiaPhoto from "@/assets/faculty/yash-gadodia.jpg";

const instructors = [
  {
    name: "Seah Pei Song",
    role: "CEO & Founder, Dialogic Academy",
    bio: "Founded Dialogic Academy in 2018 and built it to 40+ school partnerships — from ACS Primary and Pei Chun to RGS, VJC, and NJC. Former national debating coach (7× Grand Finals, RGS Div 1 championship). Designs every Vibe Makers programme around MOE's 21CC framework.",
    image: peiSongPhoto,
    highlights: [
      { emoji: "🏢", text: "Founded Dialogic Academy (2018)" },
      { emoji: "🎓", text: "40+ School Partners Across Singapore" },
      { emoji: "🏆", text: "7× National Debating Grand Finals" },
      { emoji: "🎯", text: "21CC Programme Design" },
    ],
    linkedin: "https://www.linkedin.com/in/seahpeisong/",
    accentColor: "from-primary to-accent",
    bgAccent: "bg-primary/10",
    borderAccent: "border-primary/20",
  },
  {
    name: "Yash Gadodia",
    role: "Head of Curriculum & Product",
    bio: "Founding PM at Voltade — shipped AI-powered products to 10,000+ users from zero. Designs the Vibe Makers curriculum around MOE's EdTech Masterplan 2030 (Find, Think, Apply, Create) and the V.I.B.E. methodology. Ensures students learn to prompt with intent, verify critically, and iterate on feedback.",
    image: yashGadodiaPhoto,
    highlights: [
      { emoji: "🚀", text: "Founding PM @ Voltade (AI Products)" },
      { emoji: "📊", text: "Shipped to 10,000+ Users" },
      { emoji: "📐", text: "V.I.B.E. Curriculum Architect" },
      { emoji: "💻", text: "EdTech Masterplan 2030 Aligned" },
    ],
    linkedin: "https://www.linkedin.com/in/yashgadodia/",
    accentColor: "from-primary to-accent",
    bgAccent: "bg-primary/10",
    borderAccent: "border-primary/20",
  },
];

export function InstructorsSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Meet Your Mentors"
          title="Educators + Product Builders"
          description="Combining Dialogic Academy's 6-year track record in Singapore schools with hands-on AI product experience."
        />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-12 max-w-5xl mx-auto">
          {instructors.map((instructor, index) => (
            <div
              key={instructor.name}
              className={`group relative bg-card rounded-3xl border-2 ${instructor.borderAccent} overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Accent gradient top bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${instructor.accentColor}`} />
              
              <div className="p-8">
                {/* Header with photo and name */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="relative">
                    <div className={`absolute -inset-1 rounded-full bg-gradient-to-br ${instructor.accentColor} opacity-75 blur-sm group-hover:opacity-100 transition-opacity`} />
                    <img
                      src={instructor.image}
                      alt={`${instructor.name} headshot`}
                      className="relative w-20 h-20 rounded-full object-cover ring-4 ring-background"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-2xl text-foreground mb-1">
                      {instructor.name}
                    </h3>
                    <p className={`text-sm font-semibold bg-gradient-to-r ${instructor.accentColor} bg-clip-text text-transparent`}>
                      {instructor.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {instructor.bio}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {instructor.highlights.map((highlight) => (
                    <div
                      key={highlight.text}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${instructor.bgAccent} border ${instructor.borderAccent}`}
                    >
                      <span className="text-lg">{highlight.emoji}</span>
                      <span className="text-sm font-medium text-foreground/90">{highlight.text}</span>
                    </div>
                  ))}
                </div>

                {/* LinkedIn */}
                <a
                  href={instructor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${instructor.accentColor} text-white font-medium text-sm hover:opacity-90 transition-opacity`}
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="mt-12 text-center">
          <a
            href="https://dialogic.academy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-full transition-all text-sm font-medium"
          >
            Part of <span className="font-semibold text-primary">Dialogic Academy</span> — 40+ school partners since 2018
            <span className="text-muted-foreground">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}