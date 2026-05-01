"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send } from "lucide-react";

// Demo projects with prompts and matching previews
const demoProjects = [
  {
    prompt: "Build me a CCA attendance tracker with training reminders...",
    appName: "CCA Tracker",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 p-3 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[8px] text-blue-600 font-semibold">CCA TRACKER</div>
            <div className="text-[11px] font-bold text-slate-800">Basketball 🏀</div>
          </div>
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-[8px] text-white">🔔</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          <div className="bg-white rounded-lg p-1.5 shadow-sm border border-blue-100">
            <div className="text-[14px] font-bold text-blue-600">94%</div>
            <div className="text-[6px] text-slate-500">Attendance</div>
          </div>
          <div className="bg-white rounded-lg p-1.5 shadow-sm border border-green-100">
            <div className="text-[14px] font-bold text-green-600">12</div>
            <div className="text-[6px] text-slate-500">Sessions</div>
          </div>
          <div className="bg-white rounded-lg p-1.5 shadow-sm border border-orange-100">
            <div className="text-[14px] font-bold text-orange-600">3</div>
            <div className="text-[6px] text-slate-500">Upcoming</div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg p-2 shadow-sm">
          <div className="text-[7px] font-semibold text-slate-600 mb-1">NEXT SESSION</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-[10px]">📅</div>
            <div className="flex-1">
              <div className="text-[8px] font-medium text-slate-800">Training</div>
              <div className="text-[6px] text-slate-500">Wed, 3:30 PM</div>
            </div>
            <div className="px-1.5 py-0.5 bg-green-100 rounded-full">
              <span className="text-[6px] text-green-700 font-medium">Confirmed</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    prompt: "Create an O-Level study planner with exam countdown...",
    appName: "Study Planner",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 p-3 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[8px] text-purple-600 font-semibold">STUDY PLANNER</div>
            <div className="text-[10px] font-bold text-slate-800">O-Levels 2025</div>
          </div>
          <div className="bg-white px-2 py-0.5 rounded-full shadow-sm border border-purple-100">
            <span className="text-[8px] font-bold text-purple-600">42 days</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-2 shadow-sm mb-2">
          <div className="text-[7px] font-semibold text-slate-600 mb-1.5">PROGRESS</div>
          {[
            { name: "A Math", progress: 78, color: "bg-blue-500" },
            { name: "Chemistry", progress: 65, color: "bg-green-500" },
            { name: "English", progress: 82, color: "bg-purple-500" },
          ].map((subject, i) => (
            <div key={i} className="mb-1.5 last:mb-0">
              <div className="flex justify-between text-[6px] mb-0.5">
                <span className="text-slate-600">{subject.name}</span>
                <span className="font-medium text-slate-800">{subject.progress}%</span>
              </div>
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${subject.color} rounded-full`} style={{ width: `${subject.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white rounded-lg p-2 shadow-sm">
          <div className="text-[7px] font-semibold text-slate-600 mb-1">TODAY</div>
          {[
            { task: "Practice Paper 2A", done: true },
            { task: "Review chemistry", done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 mb-1">
              <div className={`w-3 h-3 rounded-full border ${item.done ? 'bg-green-500 border-green-500' : 'border-slate-300'} flex items-center justify-center`}>
                {item.done && <span className="text-[6px] text-white">✓</span>}
              </div>
              <span className={`text-[7px] ${item.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>{item.task}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    prompt: "Make a hawker food finder with ratings and reviews...",
    appName: "Food Finder",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-orange-50 to-red-50 p-3 flex flex-col">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex-1 bg-white rounded-lg px-2 py-1.5 shadow-sm flex items-center gap-1.5">
            <span className="text-[10px]">📍</span>
            <span className="text-[8px] text-slate-600">Tiong Bahru</span>
          </div>
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-[10px]">🍜</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-2">
          <div className="h-12 bg-gradient-to-r from-orange-200 to-red-200 relative">
            <div className="absolute bottom-1 left-1 bg-white/90 px-1.5 py-0.5 rounded-full">
              <span className="text-[6px] font-medium text-orange-600">🔥 Popular</span>
            </div>
          </div>
          <div className="p-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[9px] font-bold text-slate-800">Tai Hwa Pork Noodle</div>
                <div className="text-[6px] text-slate-500">Bak Chor Mee</div>
              </div>
              <div className="flex items-center gap-0.5 bg-green-100 px-1 py-0.5 rounded">
                <span className="text-[8px]">⭐</span>
                <span className="text-[7px] font-bold text-green-700">4.8</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1.5">
          {["🍜 Noodles", "🍚 Rice", "☕ Drinks"].map((cat, i) => (
            <div key={i} className="flex-1 bg-white rounded-lg py-1.5 text-center shadow-sm">
              <span className="text-[7px] font-medium text-slate-700">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    prompt: "Design an MRT planner with live timings and fares...",
    appName: "MRT Planner",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-50 p-3 flex flex-col">
        <div className="bg-white rounded-lg p-2 shadow-sm mb-2">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white shadow" />
              <div className="w-0.5 h-4 bg-slate-200" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white shadow" />
            </div>
            <div className="flex-1">
              <div className="text-[8px] font-medium text-slate-800 mb-2">Bishan</div>
              <div className="text-[8px] font-medium text-slate-800">Raffles Place</div>
            </div>
            <div className="text-right">
              <div className="text-[12px] font-bold text-emerald-600">18 min</div>
              <div className="text-[6px] text-slate-500">$1.50</div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg p-2 shadow-sm">
          <div className="text-[7px] font-semibold text-slate-600 mb-1.5">ROUTE</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-red-500 flex items-center justify-center">
                <span className="text-[6px] font-bold text-white">NS</span>
              </div>
              <span className="text-[7px] text-slate-600">North-South → 4 stops</span>
            </div>
            <div className="flex items-center gap-1.5 pl-1">
              <div className="w-3 h-3 rounded-full border border-slate-300 flex items-center justify-center">
                <span className="text-[5px] text-slate-400">↓</span>
              </div>
              <span className="text-[6px] text-slate-400">Change at City Hall</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
                <span className="text-[6px] font-bold text-white">EW</span>
              </div>
              <span className="text-[7px] text-slate-600">East-West → 1 stop</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export function PromptDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "thinking" | "showing" | "holding">("typing");
  
  const currentProject = demoProjects[currentIndex];
  const currentPrompt = currentProject.prompt;

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;
    
    if (displayText.length < currentPrompt.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentPrompt.slice(0, displayText.length + 1));
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      // Done typing, move to thinking
      const timeout = setTimeout(() => setPhase("thinking"), 300);
      return () => clearTimeout(timeout);
    }
  }, [displayText, phase, currentPrompt]);

  // Thinking phase
  useEffect(() => {
    if (phase !== "thinking") return;
    const timeout = setTimeout(() => setPhase("showing"), 800);
    return () => clearTimeout(timeout);
  }, [phase]);

  // Showing phase
  useEffect(() => {
    if (phase !== "showing") return;
    const timeout = setTimeout(() => setPhase("holding"), 500);
    return () => clearTimeout(timeout);
  }, [phase]);

  // Holding phase - then move to next
  useEffect(() => {
    if (phase !== "holding") return;
    const timeout = setTimeout(() => {
      setDisplayText("");
      setPhase("typing");
      setCurrentIndex((prev) => (prev + 1) % demoProjects.length);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Prompt Input Box */}
      <div className="relative mb-6">
        <div className="bg-white/95 backdrop-blur-sm border-2 border-orange-200 rounded-2xl px-4 py-3 md:px-5 md:py-4 shadow-lg shadow-orange-100/50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-h-[24px]">
              <span className="text-sm md:text-base text-foreground/90">
                {displayText}
                <motion.span
                  className="inline-block w-0.5 h-4 bg-orange-500 ml-0.5 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                />
              </span>
            </div>
            <button aria-label="Send prompt" className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        
        {/* Thinking indicator */}
        <AnimatePresence>
          {phase === "thinking" && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2"
            >
              <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 rounded-full">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-orange-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-orange-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-orange-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Phone Preview - Always visible */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Phone frame */}
          <div className="w-[180px] md:w-[200px]">
            <div className="bg-foreground rounded-[24px] p-2 shadow-2xl">
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-foreground rounded-full z-10" />
              
              {/* Screen */}
              <div className="bg-white rounded-[18px] overflow-hidden">
                {/* Status bar */}
                <div className="bg-white px-3 py-1 flex items-center justify-between">
                  <span className="text-[7px] font-medium text-slate-800">9:41</span>
                  <div className="flex items-center gap-0.5">
                    <div className="w-3 h-1.5 bg-slate-800 rounded-sm" />
                  </div>
                </div>
                
                {/* App content with animation */}
                <div className="h-[220px] md:h-[240px] relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {(phase === "typing" || phase === "thinking") ? (
                      <motion.div
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 p-3"
                      >
                        {/* Skeleton loader */}
                        <div className="animate-pulse">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="h-2 w-12 bg-slate-200 rounded mb-1" />
                              <div className="h-3 w-20 bg-slate-200 rounded" />
                            </div>
                            <div className="w-6 h-6 rounded-full bg-slate-200" />
                          </div>
                          <div className="grid grid-cols-3 gap-1.5 mb-3">
                            <div className="bg-white rounded-lg p-2 h-10 shadow-sm" />
                            <div className="bg-white rounded-lg p-2 h-10 shadow-sm" />
                            <div className="bg-white rounded-lg p-2 h-10 shadow-sm" />
                          </div>
                          <div className="bg-white rounded-lg p-2 shadow-sm flex-1">
                            <div className="h-2 w-16 bg-slate-200 rounded mb-2" />
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-slate-200" />
                              <div className="flex-1">
                                <div className="h-2 w-20 bg-slate-200 rounded mb-1" />
                                <div className="h-2 w-14 bg-slate-200 rounded" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Building indicator */}
                        {phase === "thinking" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
                          >
                            <Sparkles className="w-6 h-6 text-orange-500 mb-2 animate-pulse" />
                            <span className="text-[10px] text-slate-500 font-medium">Building app...</span>
                          </motion.div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0"
                      >
                        {currentProject.preview}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Home indicator */}
                <div className="bg-white py-1 flex justify-center">
                  <div className="w-16 h-0.5 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          
          {/* App name badge */}
          <AnimatePresence>
            {(phase === "showing" || phase === "holding") && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: 0.2 }}
                className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-full shadow-lg text-xs font-semibold whitespace-nowrap">
                  {currentProject.appName}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
