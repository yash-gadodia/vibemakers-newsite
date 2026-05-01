import { Compass, Lightbulb, Layers, Repeat } from "lucide-react";

export type VibePhaseKey = "vision" | "ideate" | "build" | "evolve";

export type VibePhase = {
  key: VibePhaseKey;
  label: "Vision" | "Ideate" | "Build" | "Evolve";
  icon: typeof Compass;
  designThinking: string;
  studentDoes: string[];
  teacherLooksFor: string[];
  evidenceLooksLike: string[];
};

export const vibePhases: VibePhase[] = [
  {
    key: "vision",
    label: "Vision",
    icon: Compass,
    designThinking: "Empathise & Define",
    studentDoes: [
      "Choose a real user and a real situation.",
      "Describe the problem in plain language (what hurts, for whom, when).",
      "Define constraints and success criteria.",
    ],
    teacherLooksFor: [
      "A specific user and context (not a vague ‘everyone’).",
      "Clear scope: problem statement and boundaries.",
      "Reasonable success criteria (what would ‘better’ look like?).",
    ],
    evidenceLooksLike: [
      "A one-paragraph problem statement + success criteria.",
      "A simple user story / scenario.",
      "A shortlist of constraints (time, data, platform, audience).",
    ],
  },
  {
    key: "ideate",
    label: "Ideate",
    icon: Lightbulb,
    designThinking: "Explore & Decide",
    studentDoes: [
      "Generate solution options and compare trade-offs.",
      "Pick a minimal feature set for a first version.",
      "Sketch the flow (screens, actions, data).",
    ],
    teacherLooksFor: [
      "Multiple options considered (not first idea only).",
      "A coherent plan: flow, data, and edge cases.",
      "Intentional scoping (‘ship a v1’ mindset).",
    ],
    evidenceLooksLike: [
      "Feature shortlist (must-have vs. later).",
      "A quick wireframe / flow diagram.",
      "Stated trade-offs: why this approach, not another.",
    ],
  },
  {
    key: "build",
    label: "Build",
    icon: Layers,
    designThinking: "Prototype",
    studentDoes: [
      "Use AI prompts to implement the planned flow.",
      "Test core actions and fix issues.",
      "Refactor: make changes on purpose, not by luck.",
    ],
    teacherLooksFor: [
      "Working core path (a usable v1).",
      "Debugging behaviour: reading errors, isolating causes.",
      "Ability to explain how the app works at a high level.",
    ],
    evidenceLooksLike: [
      "A functioning prototype with 1–2 key screens.",
      "A short build log (what changed and why).",
      "A demo script: problem → solution → how it works.",
    ],
  },
  {
    key: "evolve",
    label: "Evolve",
    icon: Repeat,
    designThinking: "Test & Improve",
    studentDoes: [
      "Run simple user tests and collect feedback.",
      "Prioritise fixes that improve clarity and usefulness.",
      "Iterate, then re-test.",
    ],
    teacherLooksFor: [
      "Feedback turned into concrete changes.",
      "Iteration quality: improvements match the problem and users.",
      "Reflection: what they’d do next with more time.",
    ],
    evidenceLooksLike: [
      "Before/after screenshots or notes.",
      "A short test summary: what users struggled with.",
      "A prioritized improvement list and what was shipped.",
    ],
  },
];
