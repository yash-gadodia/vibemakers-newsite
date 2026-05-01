---
title: "12 AI coding project ideas Singapore teens can actually ship in a weekend"
slug: ai-coding-projects-teens-singapore
description: Concrete project ideas your teen can build with Claude and Lovable that solve real problems — not tutorial-style toys. Each comes with a one-paragraph brief, a starting prompt, and an estimated build time.
meta_title: AI Coding Projects for Singapore Teens — 12 Real-Problem Ideas
meta_description: 12 weekend-buildable AI projects that solve real problems Singapore teens face. Briefs, prompts, build times. For DSA portfolios + curiosity.
category: Project Ideas
tags: ["AI coding", "project ideas", "Lovable", "Claude", "Singapore teens", "weekend project"]
author: Vibe Makers Academy
cover_image_alt: A Singapore teen at a desk with two laptops, one running Lovable, one with Claude open
status: draft
---

## TL;DR

- **The hardest part of vibe coding is *picking what to build*** — not the technical execution. AI tools handle the syntax. Choosing a problem worth solving is the human part.
- **The best teen projects solve problems the teen actually has** — not abstract "good ideas." A CCA scheduler used by their actual CCA mates beats a "social network for students" that no one will ever try.
- **Below: 12 specific briefs, each shippable in 4–10 hours**, ordered roughly by ambition.

---

## Why "real problem" matters more than "good idea"

Most teen coding tutorials hand kids a fake problem ("build a recipe app") and a fake user ("imagine someone who likes cooking"). The output is a project that nobody uses, that the student forgets about, that doesn't help in DSA / EAE / JC interviews because the student can't answer *"who actually used this?"*

The shortcut to a project that matters: the teen picks a real friction in their own life or someone close to them, and builds the smallest possible thing that fixes it. The project is interesting because the user is *already there* and willing to give feedback.

This is the same logic professional product designers use. It's not a teen-specific framework. It's why ["solve a problem you have"](https://paulgraham.com/startupideas.html) is the most reliable starting point in software — at any age.

---

## How to read this list

For each project below:

- **Who it's for** — who would actually use it
- **The brief** — one paragraph the teen could paste into Claude or Lovable as a starting point
- **Build time** — realistic for a teen with no prior coding experience, using Claude + Lovable
- **What makes it portfolio-worthy** — the angle that lifts it above a tutorial project

You'll notice no Pomodoro timer, todo app, or weather widget. Those are skipped on purpose — they don't help the teen build a coherent narrative. If your teen really wants to make a Pomodoro timer, fine, but spend 30 minutes on it, not a weekend.

---

## The 12 projects

### 1. CCA points / hours tracker

**Who:** Any SG student in a CCA that requires logging service hours, attendance, or LEAPS points.

**Brief:** *"Build a web app where I can log every CCA session I attend. Each entry has date, type (training / competition / service), hours, and notes. Show running totals, a calendar view, and a simple progress bar against a yearly target. Authentication is optional; if I'm the only user, I can use a passcode."*

**Build time:** 4–6 hours

**Why it works:** Solves a problem every SG secondary student has. Easy to get a friend to use it. Naturally invites a v2 with reminders, a CSV export, or a leaderboard for the CCA.

---

### 2. Past-paper question bank with AI explanations

**Who:** The teen, plus 1–3 study-group friends.

**Brief:** *"I want to upload a PDF of a past-paper question (or paste the text). The app stores my own answer, then asks Claude to give a structured critique: what's good, what's missing, where I lost marks. Save the question + my answer + the AI's feedback so I can review later. Subjects: chem, bio, English."*

**Build time:** 6–10 hours

**Why it works:** Real exam-prep value. The Claude integration teaches the teen to think about prompt design (what makes a good "critique my answer" prompt). And shows the interviewer the teen can wire AI into a tool, not just chat with it.

---

### 3. Study-group quiz generator

**Who:** A study group of 3–6 friends.

**Brief:** *"Take a paste of class notes. Have Claude generate 10 multiple-choice questions from those notes. Each user takes the quiz, sees their score, and the correct answers with explanations. Track scores per user across multiple quizzes. Accidentally-easy questions can be flagged."*

**Build time:** 5–8 hours

**Why it works:** Naturally social — friends will use it. Forces the teen to think about prompt-engineering quality (bad prompts = bad questions = no one uses it again). The "flag too easy" feature is the iteration hook.

---

### 4. Family / household chore + allowance tracker

**Who:** The teen + siblings + parent (the parent is the user that pays).

**Brief:** *"Each chore has an assignee, a due date, and a value (in dollars). When marked done, the assignee's running balance increases. Parents can mark chores 'paid out.' Each user has a dashboard showing balance, completed chores this week, and a leaderboard."*

**Build time:** 6–8 hours

**Why it works:** Built-in users (siblings + parents). Real money flows. The parent's feedback ("I don't actually want to mark each one paid; I want a weekly digest") is the kind of iteration material DSA interviewers love hearing.

---

### 5. Tutor session log + revision spaced-repetition tracker

**Who:** The teen + their tutor.

**Brief:** *"After each tutor session, log: subject, topic, what we covered, what I struggled with, homework set. The app schedules a 'revision check-in' 3 days later: a simple form asking 'Did you actually do this?' and 'Do you still understand it?' Notes carry forward to the next session as a brief."*

**Build time:** 6–8 hours

**Why it works:** Tutor becomes a second user with strong feedback. The spaced-repetition logic forces the teen to think through state and time, beyond CRUD. Great DSA interview material because there's a clear "what I learned about my own learning" story.

---

### 6. School bus / MRT delay logger

**Who:** A class WhatsApp group.

**Brief:** *"Anyone in our class can post 'bus 47 delayed by 8 min' or 'NEL is down again.' Posts auto-expire after 2 hours. Show recent reports filtered by route. Optional: hook into LTA's open data API for official disruptions and overlay them."*

**Build time:** 4–6 hours (without LTA API), 8–12 hours with it

**Why it works:** Many users, fast feedback loop. The optional LTA API integration is the stretch goal that signals technical depth without being scary.

---

### 7. Birthday / anniversary reminder bot

**Who:** The teen, plus their family group chat.

**Brief:** *"I add birthdays and anniversaries (with notes). Three days before each one, the app sends a reminder to a designated email or Telegram. The reminder includes a Claude-generated suggestion of 2–3 thoughtful gift ideas based on what I've noted about the person."*

**Build time:** 5–8 hours

**Why it works:** Useful for the teen *and* the family. The Claude-suggestions feature shows AI integration. Easy to extend with a "did you actually remember this birthday?" follow-up.

---

### 8. Anonymous classmate-question Q&A board

**Who:** A class WhatsApp group.

**Brief:** *"Classmates can post questions anonymously ('I don't get question 3 in the math homework') and others can answer. Upvote useful answers. Teacher (optional) can mark a 'best answer.' Spam / inappropriate posts get auto-flagged via a Claude moderation step."*

**Build time:** 8–10 hours

**Why it works:** Solves a real shyness problem (people who won't ask in class). The moderation layer is a great place to talk about AI ethics in the interview. Need real users to validate.

---

### 9. Parent-friendly weekly schedule visualiser

**Who:** The teen + their parent (often the parent who manages the family calendar).

**Brief:** *"I input my classes, tuition, CCA, social plans for the week. The app generates a one-page printable view colour-coded by category, with a free-time summary at the bottom. Parents can subscribe via email to get the schedule sent every Sunday."*

**Build time:** 4–6 hours

**Why it works:** Parent is a power user with strong opinions ("colour by *what*?" "show me free time only", etc.). Interviewers love hearing about iteration cycles with non-technical users.

---

### 10. AI-assisted journal with mood tagging

**Who:** The teen, possibly only.

**Brief:** *"Daily journal entries (free text). After saving, Claude returns a mood tag (3–5 options), a one-sentence reflection, and one optional 'gentle question' for the next day. Past entries are searchable; mood is plotted over time."*

**Build time:** 5–8 hours

**Why it works:** Personal, useful, and the AI integration is non-trivial (output structure, prompt safety). For a child who's not into team-friendly product ideas, this is the right "for me" project. The DSA story is around AI ethics — what does the AI *not* try to do?

---

### 11. Hawker / cafe price tracker for the school neighbourhood

**Who:** Any teen who eats out of school + their friends.

**Brief:** *"Photograph or type the price of a popular dish at a nearby stall. Crowd-source contributions from friends. Show median price per dish, trend over time, and 'cheapest place near school' rankings. No ratings of taste — just price tracking, to keep it boring and accurate."*

**Build time:** 8–10 hours

**Why it works:** Local relevance. Real friend network as users. Naturally evolves into a v2 with photo OCR (Claude can pull text from a photo of a menu). Strong "noticing what's around me" angle for the interview.

---

### 12. JC subject-combo decision tool

**Who:** Sec 4 students choosing JC subject combinations.

**Brief:** *"Input: my likely O-Level grades, what I'm interested in, what universities / careers I'm considering. Output: a comparison of common JC subject combinations (e.g., PCME, CMEH, Arts streams) showing pros / cons / what universities accept what / common student concerns. Ask Claude to flag mismatches between my interest and my combo."*

**Build time:** 8–12 hours

**Why it works:** Genuinely high-stakes problem for SG Sec 4 students. The teen has to do real research (which universities accept what). Claude becomes a research assistant. Excellent topic for the DSA narrative because it shows the teen thinks beyond their own academics.

---

## Picking the right one for your child

Don't try to pick "the best" project. Pick the one whose **user** is closest to your child.

If your child has a tight CCA: project 1 or 8.
If your child is exam-prep mode: project 2 or 3.
If your child is into family / household: project 4 or 9.
If your child likes their tutor or has a strong study habit: project 5.
If your child is socially active in a class chat: project 6 or 8.
If your child likes a quieter, personal project: project 10.
If your child is into food / their neighbourhood: project 11.
If your child is in Sec 4 making big decisions: project 12.

The right project is the one where **getting feedback is easy** — because the user is already in your child's life.

---

## How to start (any of these)

1. **Pick one.** Spend 10 minutes max on this. The first one is for learning the build-iterate-ship loop, not for being perfect.
2. **Open Claude.** Paste the brief. Ask Claude to clarify it: *"What questions do you have about this brief before I start building?"* Refine the brief based on what Claude asks.
3. **Open Lovable.** Paste the refined brief into the "describe your app" box. Hit generate.
4. **Try the result.** Note what's broken or wrong. Give specific feedback to Lovable: *"The login button doesn't do anything."* Iterate.
5. **Ship it.** Click deploy. Get a public URL.
6. **Show it to one user.** Watch them use it. Don't help. Note what confuses them.
7. **Iterate once.** Fix the worst friction.
8. **Done.** Move on to the next project. Don't perfect.

The teens who finish this loop multiple times are the ones who walk into DSA interviews with real portfolios. The teens who try to perfect the first one are the ones who don't ship.

---

## What if your child is stuck on "I can't think of a problem"?

Common. Two unlocking questions:

- *"What's something you've complained about more than once in the last month?"* — your child has been giving you free product briefs. They just didn't realise.
- *"If your friend group had one tool that made their life slightly better, what would it do?"* — outsource the brief to social.

If both fail: pick project 1 (CCA tracker). Universally relevant for SG students, low-creativity floor, plenty of room to make it personal.

---

## A note on AI usage

A teen interviewer-ready answer should sound like:

> *"I prompted Claude to design the database schema, and it gave me three tables. Two were obvious — one I had to ask about because I didn't know what 'foreign key' meant. Lovable then built the CRUD operations against those tables. The login flow it generated had a bug — the password reset email pointed to the wrong domain. I had Claude walk me through what was happening and I fixed it manually."*

That's a strong answer because it shows: the teen used AI for what AI is good at (structure, scaffolding, explanation) and pushed past it where AI got it wrong (the bug fix). Both halves matter. The interviewer is checking for both.

If you want our deeper view of how to choose between Lovable, Cursor, Claude, and ChatGPT for these projects, see our [tool comparison](/blog/ai-tools-comparison-teens). And if your child wants help on the "what to build" question with structured coaching, we run [free trial classes](/parents) where the first 60 minutes is exactly that — picking a problem worth solving.

---

## FAQ

**Q: Are these projects too hard for a 13-year-old?**
A: No. The hardest is project 12, which a Sec 4 student can finish in a school week. The easiest (project 1, 6, 9) are routinely shipped by Sec 1 students in a weekend.

**Q: Do I need to pay for Claude / Lovable?**
A: For a single project, free tiers are enough. Lovable's free tier covers 2 projects; Claude's free tier handles brainstorming + debugging. If your teen does all 12 projects, you'll likely upgrade Lovable around month 2 ($25/mo).

**Q: My child built one project and lost interest. Was the project wrong?**
A: Often yes. The user wasn't real. If the teen built something for "imagined teens" instead of their actual class group, the feedback loop never started. Switch to a project where someone in the family or class will actually use the thing.

**Q: My child wants to build a really ambitious project (full social network, multiplayer game). Should I let them?**
A: Yes — but as project 3, not project 1. Make them ship something simple first so the iteration muscle is in place.

**Q: What if my child's project has a bug they can't fix?**
A: Ask Claude to explain what's wrong line-by-line. If after 30 minutes it's still stuck, the bug is usually a sign that the brief was unclear. Re-write the brief with the new understanding and start fresh — it's faster than debugging a broken scaffold.

---

## Next step

If your teen wants help picking a project and shipping it with a coach watching over their shoulder for the first 90 minutes, that's exactly what our [free trial class](/parents) is. They walk out with a deployed app, a story, and a clear sense of which of the 12 projects above they actually want to build next.

---

## Related reading

- [How to build a DSA coding portfolio that actually gets your child into a top Singapore school](/blog/dsa-coding-portfolio-singapore)
- [What is vibe coding? A Singapore parent's guide for 2026](/blog/what-is-vibe-coding-singapore-parent-guide)
- [Choosing between Lovable, Cursor, Claude, and ChatGPT for your teen's first AI build](/blog/ai-tools-comparison-teens)
- [AI coding vs traditional coding for Singapore teens — which actually opens DSA/EAE doors?](/blog/ai-coding-vs-traditional-dsa-eae)
