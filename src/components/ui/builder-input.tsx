"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Calendar, 
  ShoppingBag, 
  BookOpen, 
  Utensils, 
  Bus,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Bell,
  CheckCircle2,
  TrendingUp,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Singapore-context student projects with sophisticated UI mockups
// These previews intentionally use some hardcoded colors to simulate realistic app UIs
// (distinct from the marketing site's design system)
const studentProjects = [
  {
    title: "CCA Attendance Tracker",
    student: "Ethan, Sec 3",
    school: "Hwa Chong Institution",
    description: "Track CCA attendance, view schedules, and get reminders for training sessions",
    color: "from-primary to-accent",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-secondary to-primary/10 p-4 flex flex-col">
        {/* App header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] text-primary font-semibold">CCA TRACKER</div>
            <div className="text-[14px] font-bold text-foreground">Basketball 🏀</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bell className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-card rounded-xl p-2 shadow-sm border border-primary/20">
            <div className="text-[18px] font-bold text-primary">94%</div>
            <div className="text-[8px] text-muted-foreground">Attendance</div>
          </div>
          <div className="bg-card rounded-xl p-2 shadow-sm border border-accent/20">
            <div className="text-[18px] font-bold text-accent">12</div>
            <div className="text-[8px] text-muted-foreground">Sessions</div>
          </div>
          <div className="bg-card rounded-xl p-2 shadow-sm border border-primary/20">
            <div className="text-[18px] font-bold text-primary">3</div>
            <div className="text-[8px] text-muted-foreground">Upcoming</div>
          </div>
        </div>

        {/* Upcoming sessions */}
        <div className="flex-1 bg-card rounded-xl p-3 shadow-sm">
          <div className="text-[10px] font-semibold text-muted-foreground mb-2">NEXT SESSION</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-medium text-foreground">Training Session</div>
              <div className="text-[9px] text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> Wed, 3:30 PM · School Gym
              </div>
            </div>
            <div className="px-2 py-1 bg-primary/10 rounded-full">
              <span className="text-[8px] text-accent font-medium">Confirmed</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "O-Level Study Planner",
    student: "Sarah, Sec 4",
    school: "Raffles Girls' School",
    description: "Plan revision schedules, track progress across subjects, and countdown to exams",
    color: "from-accent to-primary",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-secondary to-accent/10 p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] text-accent font-semibold">STUDY PLANNER</div>
            <div className="text-[13px] font-bold text-foreground">O-Levels 2025</div>
          </div>
          <div className="bg-card px-3 py-1 rounded-full shadow-sm border border-accent/20">
            <span className="text-[10px] font-bold text-accent">42 days left</span>
          </div>
        </div>

        {/* Progress bars */}
        <div className="bg-card rounded-xl p-3 shadow-sm mb-3">
          <div className="text-[9px] font-semibold text-muted-foreground mb-2">SUBJECT PROGRESS</div>
          {[
            { name: "A Math", progress: 78, color: "bg-primary" },
            { name: "Chemistry", progress: 65, color: "bg-accent" },
            { name: "English", progress: 82, color: "bg-primary/70" },
          ].map((subject, i) => (
            <div key={i} className="mb-2 last:mb-0">
              <div className="flex justify-between text-[8px] mb-1">
                <span className="text-muted-foreground">{subject.name}</span>
                <span className="font-medium text-foreground">{subject.progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${subject.color} rounded-full`} style={{ width: `${subject.progress}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Today's tasks */}
        <div className="flex-1 bg-card rounded-xl p-3 shadow-sm">
          <div className="text-[9px] font-semibold text-muted-foreground mb-2">TODAY'S TASKS</div>
          {[
            { task: "Practice Paper 2A", done: true },
            { task: "Review organic chemistry", done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5">
              <CheckCircle2 className={`w-3.5 h-3.5 ${item.done ? 'text-primary' : 'text-muted-foreground/30'}`} />
              <span className={`text-[9px] ${item.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{item.task}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Hawker Food Finder",
    student: "Marcus, JC1",
    school: "Victoria Junior College",
    description: "Discover hawker stalls, read reviews, and find the best local food near you",
    color: "from-primary to-destructive",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-secondary to-primary/10 p-4 flex flex-col">
        {/* Header with search */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 bg-card rounded-xl px-3 py-2 shadow-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-muted-foreground">Near Tiong Bahru MRT</span>
          </div>
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <Utensils className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>

        {/* Featured stall card */}
        <div className="bg-card rounded-xl shadow-sm overflow-hidden mb-3">
          <div className="h-16 bg-gradient-to-r from-primary/30 to-accent/30 relative">
            <div className="absolute bottom-2 left-2 bg-card/90 backdrop-blur px-2 py-0.5 rounded-full">
              <span className="text-[8px] font-medium text-primary">🔥 Popular</span>
            </div>
          </div>
          <div className="p-2.5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] font-bold text-foreground">Hill Street Tai Hwa</div>
                <div className="text-[8px] text-muted-foreground">Bak Chor Mee · Crawford Lane</div>
              </div>
              <div className="flex items-center gap-0.5 bg-primary/10 px-1.5 py-0.5 rounded">
                <Star className="w-3 h-3 text-primary fill-primary" />
                <span className="text-[9px] font-bold text-accent">4.8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick categories */}
        <div className="flex gap-2">
          {["🍜 Noodles", "🍚 Rice", "☕ Drinks"].map((cat, i) => (
            <div key={i} className="flex-1 bg-card rounded-lg py-2 text-center shadow-sm">
              <span className="text-[9px] font-medium text-foreground">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "MRT Journey Planner",
    student: "Jun Wei, Sec 2",
    school: "Anglo-Chinese School",
    description: "Plan train routes, check live timings, and get fare estimates across Singapore",
    color: "from-accent to-primary",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-secondary to-accent/10 p-4 flex flex-col">
        {/* Route header */}
        <div className="bg-card rounded-xl p-3 shadow-sm mb-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-destructive border-2 border-card shadow" />
              <div className="w-0.5 h-6 bg-muted" />
              <div className="w-3 h-3 rounded-full bg-primary border-2 border-card shadow" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-medium text-foreground mb-3">Bishan</div>
              <div className="text-[10px] font-medium text-foreground">Raffles Place</div>
            </div>
            <div className="text-right">
              <div className="text-[14px] font-bold text-accent">18 min</div>
              <div className="text-[8px] text-muted-foreground">$1.50</div>
            </div>
          </div>
        </div>

        {/* Route steps */}
        <div className="flex-1 bg-card rounded-xl p-3 shadow-sm">
          <div className="text-[9px] font-semibold text-muted-foreground mb-2">ROUTE DETAILS</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-destructive flex items-center justify-center">
                <span className="text-[8px] font-bold text-destructive-foreground">NS</span>
              </div>
              <span className="text-[9px] text-muted-foreground">North-South Line → 4 stops</span>
            </div>
            <div className="flex items-center gap-2 pl-2">
              <div className="w-4 h-4 rounded-full border-2 border-border flex items-center justify-center">
                <span className="text-[7px] text-muted-foreground">↓</span>
              </div>
              <span className="text-[8px] text-muted-foreground">Change at City Hall</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                <span className="text-[8px] font-bold text-primary-foreground">EW</span>
              </div>
              <span className="text-[9px] text-muted-foreground">East-West Line → 1 stop</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Sec School Canteen Menu",
    student: "Priya, Sec 1",
    school: "CHIJ St. Nicholas",
    description: "Browse daily canteen menus, check prices, and pre-order during recess",
    color: "from-primary to-accent",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-secondary to-primary/10 p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] text-primary font-semibold">CANTEEN MENU</div>
            <div className="text-[12px] font-bold text-foreground">Today's Specials</div>
          </div>
          <div className="bg-primary text-primary-foreground px-2 py-1 rounded-lg">
            <span className="text-[9px] font-medium">🕐 Recess: 10:30</span>
          </div>
        </div>

        {/* Menu items */}
        <div className="flex-1 space-y-2">
          {[
            { name: "Chicken Rice", stall: "Stall 3", price: "$2.50", popular: true },
            { name: "Mee Goreng", stall: "Stall 1", price: "$2.00", popular: false },
            { name: "Fish Soup", stall: "Stall 5", price: "$3.00", popular: true },
          ].map((item, i) => (
            <div key={i} className="bg-card rounded-xl p-2.5 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-medium text-foreground">{item.name}</span>
                  {item.popular && <Heart className="w-3 h-3 text-destructive fill-destructive" />}
                </div>
                <span className="text-[8px] text-muted-foreground">{item.stall}</span>
              </div>
              <div className="text-[11px] font-bold text-primary">{item.price}</div>
            </div>
          ))}
        </div>

        {/* Pre-order button */}
        <div className="mt-3 bg-gradient-to-r from-primary to-accent rounded-xl py-2 text-center">
          <span className="text-[10px] font-semibold text-primary-foreground">Pre-order Now →</span>
        </div>
      </div>
    ),
  },
];

export function BuilderInput() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % studentProjects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + studentProjects.length) % studentProjects.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % studentProjects.length);
  };

  const currentProject = studentProjects[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="w-full max-w-5xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
          Real Student Projects
        </span>
        <h3 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-3">
          See What Our Students Have Built
        </h3>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From study planners to hawker food finders, students learn to build apps that solve real problems in Singapore
        </p>
      </div>

      {/* Main showcase area */}
      <div className="relative">
        {/* Navigation buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-10 h-10 bg-white rounded-full shadow-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-10 h-10 bg-white rounded-full shadow-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>

        {/* Phone mockup container */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Phone device */}
          <div className="relative mx-auto">
            {/* Phone frame */}
            <div className="relative w-[280px] md:w-[320px]">
              {/* Phone bezel */}
              <div className="bg-foreground rounded-[40px] p-3 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-full z-10" />
                
                {/* Screen */}
                <div className="bg-white rounded-[32px] overflow-hidden relative">
                  {/* Status bar */}
                  <div className="bg-white px-6 py-2 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-foreground">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 bg-foreground rounded-sm" />
                    </div>
                  </div>
                  
                  {/* App content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-[380px] md:h-[440px]"
                    >
                      {currentProject.preview}
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Home indicator */}
                  <div className="bg-white py-2 flex justify-center">
                    <div className="w-32 h-1 bg-muted rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project info */}
          <div className="flex-1 text-center md:text-left max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${currentProject.color} text-white text-sm font-medium mb-4`}>
                  {currentProject.title}
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  {currentProject.description}
                </p>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentProject.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {currentProject.student.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-foreground">{currentProject.student}</div>
                    <div className="text-sm text-muted-foreground">{currentProject.school}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {studentProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex 
                  ? 'w-6 bg-primary' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* CTA text */}
      <p className="text-center text-sm text-muted-foreground mt-8">
        <span className="font-medium text-foreground">You can build this too.</span> Join our programmes and start creating.
      </p>
    </motion.div>
  );
}
