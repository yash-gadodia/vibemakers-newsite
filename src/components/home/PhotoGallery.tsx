import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";

// Import gallery images (real photos) - only unique images
import rgsW101 from "@/assets/gallery/rgs-w1-01.jpg";
import rgsW102 from "@/assets/gallery/rgs-w1-02.jpg";
import rgsW103 from "@/assets/gallery/rgs-w1-03.jpg";
import rgsW104 from "@/assets/gallery/rgs-w1-04.jpg";
import rgsW105 from "@/assets/gallery/rgs-w1-05.jpg";
import rgsW106 from "@/assets/gallery/rgs-w1-06.jpg";
import lvssW105 from "@/assets/gallery/lvss-w1-05.jpg";
import lvssW106 from "@/assets/gallery/lvss-w1-06.jpg";
import lvssW107 from "@/assets/gallery/lvss-w1-07.jpg";
import lvssW108 from "@/assets/gallery/lvss-w1-08.jpg";
import auditorium1 from "@/assets/gallery/auditorium-event-01.jpg";
import instructorPresentation1 from "@/assets/gallery/instructor-presentation-01.jpg";
import workshop1 from "@/assets/gallery/workshop-students-01.jpg";
import hackathon1 from "@/assets/gallery/hackathon-event-01.jpg";
import coding1 from "@/assets/gallery/coding-session-01.jpg";
import team1 from "@/assets/gallery/team-collaboration-01.jpg";

// Gallery images array - add more unique images here and they'll appear automatically
const galleryImages = [
  { src: rgsW101, alt: "40 RGS students raising peace signs at end of Vibe Makers W2 workshop", category: "RGS · May 2026", emoji: "🔬" },
  { src: rgsW102, alt: "RGS students watching the V.I.B.E. cycle being taught", category: "RGS · May 2026", emoji: "🔬" },
  { src: rgsW103, alt: "RGS students working on their HTML decks during W2", category: "RGS · May 2026", emoji: "🔬" },
  { src: rgsW104, alt: "Yash teaching two RGS students at the lab bench with ChatGPT projected", category: "RGS · May 2026", emoji: "🔬" },
  { src: rgsW105, alt: "RGS student presenting her vibe-coded HTML slide deck on Ferrari and McLaren", category: "RGS · May 2026", emoji: "🔬" },
  { src: rgsW106, alt: "Yash instructing in front of the W2 title slide", category: "RGS · May 2026", emoji: "🔬" },
  { src: lvssW107, alt: "Wide view of a full Loyang View Secondary class working through the Vibe Makers workshop", category: "Loyang View · May 2026", emoji: "🛠️" },
  { src: lvssW108, alt: "'Welcome to Vibe Makers' opening slide on a laptop with the Loyang View Secondary class in the background", category: "Loyang View · May 2026", emoji: "🛠️" },
  { src: lvssW106, alt: "Laptop showing the 'Observe a product in 3 lenses' framework slide in the Loyang View classroom", category: "Loyang View · May 2026", emoji: "🛠️" },
  { src: lvssW105, alt: "Loyang View student capturing an AI-generated water-bottle redesign on an iPad", category: "Loyang View · May 2026", emoji: "🛠️" },
  { src: auditorium1, alt: "Large-scale workshop with students from multiple schools", category: "Event", emoji: "🎪" },
  { src: instructorPresentation1, alt: "Instructor presenting student project examples", category: "Teaching", emoji: "👨‍🏫" },
  { src: hackathon1, alt: "Hackathon event with excited participants", category: "Hackathon", emoji: "🚀" },
  { src: workshop1, alt: "Students collaborating during a vibe coding workshop", category: "Workshop", emoji: "💻" },
  { src: coding1, alt: "Students focused on building their apps", category: "Coding", emoji: "⌨️" },
  { src: team1, alt: "Team collaboration during a build sprint", category: "Teamwork", emoji: "🤝" },
];

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="section-padding bg-secondary/20">
      <div className="container mx-auto px-4">
        <Reveal variant="up">
          <SectionHeader
            badge="Behind the Scenes"
            title="Real students. Real learning."
            description="See what happens in our workshops: collaboration, creativity, and lots of 'it works!' moments."
          />
        </Reveal>

        {/* Photo Grid */}
        <RevealGroup staggerMs={50} variant="up" className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted cursor-pointer w-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                  <span>{image.emoji}</span>
                  {image.category}
                </span>
              </div>
            </motion.button>
          ))}
        </RevealGroup>

        {/* Trust indicator */}
        <Reveal variant="up" delayMs={600}>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Photos from our workshops at <span className="font-medium text-foreground">50+ partner schools</span> across Singapore · most recently Raffles Girls' School and Loyang View Secondary (May 2026)
            </p>
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <motion.img
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <p className="text-white/80 text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                {galleryImages[selectedImage].alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
