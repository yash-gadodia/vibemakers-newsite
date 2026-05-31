import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import AI-generated hero images
import heroImage1 from "@/assets/gallery/ai-hero-01.jpg";
import heroImage2 from "@/assets/gallery/ai-hero-02.jpg";
import heroImage3 from "@/assets/gallery/ai-hero-03.jpg";
 

const images = [heroImage1, heroImage2, heroImage3];

const stats = [
  { value: 15000, suffix: "+", label: "Students Impacted" },
  { value: 50, suffix: "+", label: "Partner Schools" },
  { value: 4.9, suffix: "★", label: "Parent Rating", decimals: 1 },
  { value: 6, suffix: "+", label: "Years Experience" },
];

function CountUp({ 
  target, 
  decimals = 0, 
  suffix = "" 
}: { 
  target: number; 
  decimals?: number; 
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* Photo Carousel Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.img
            src={images[currentIndex]}
            alt="Vibemakers Academy workshop"
            className="w-full h-full object-cover rounded-2xl"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl" />

      {/* Image Indicators */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-4"
                : "bg-white/50 w-1.5 hover:bg-white/70"
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
