Create a full website sitemap and wireframe for Road2Work.id, an AI-powered interview readiness platform for students, fresh graduates, and early career switchers.

The product helps users prepare for job interviews through an adaptive HRD interview simulation. Users choose a target role, provide context by uploading a CV or filling a short profile, then enter a live voice-based interview room where an AI HRD asks role-specific questions, listens to the user’s voice answer, detects weak evidence or unclear answers, asks clarifying follow-up questions, and generates a final readiness dashboard.

Brand personality:
Modern, bold, minimal, confident, friendly, career-focused, slightly playful, but still professional. The UI should feel fresh and memorable, not like a generic AI SaaS template. Avoid cliché robot illustrations, generic gradient blobs, and overused AI dashboard layouts.

Visual direction:
Use an editorial SaaS style with warm off-white surfaces, clean typography, rounded cards, soft shadows, and strong red-black accents based on the Road2Work.id brand. The design should combine “career readiness platform” seriousness with a fun, encouraging learning experience.

Brand colors:
- Primary red: #E63946
- Dark red: #C1121F
- Deep red: #A50F17
- Dark graphite / ink: #1F2937 or #2D2F34
- Soft off-white / parchment background: #F9EFE4 or #FAF7F2
- Card surface: #FDFDFD
- Secondary text: #656565
- Border: #D9DDE6
- Success green only for positive score/status
Use red as the main brand accent for CTA buttons, active states, progress indicators, and important highlights. Do not overuse red as large section backgrounds. Keep most pages light, warm, clean, and spacious.

Typography:
Use a strong editorial display font for headlines and a clean modern sans font for body/UI.
Preferred:
- Headings: Garnett-style, Sora, Space Grotesk, or DM Sans bold
- Body/UI: Plus Jakarta Sans, Instrument Sans, or Inter
- Mono labels: Geist Mono for technical labels or small system tags
Headlines should feel premium and editorial, not corporate. Body text should be readable and clean.

Design system:
- Use pill-shaped primary buttons.
- Use rounded cards with 12–24px radius.
- Use soft 3-layer shadows.
- Use large spacing and clear hierarchy.
- Use subtle red line patterns, road/path motifs, and arrow/progress elements inspired by the Road2Work logo.
- Use outline icons, monochrome dark gray or red accents.
- Create a visual motif of “roadmap to career readiness” using paths, steps, progress rings, and interview cards.
- Use warm light backgrounds instead of cold pure white.
- Add subtle microcopy and friendly empty states.

Main UX principle:
1 screen = 1 decision.
1 card = 1 insight.
1 primary CTA per screen.
The experience should feel guided, calm, and confidence-building.

Website pages to generate:

1. Homepage / Landing Page
Goal: Explain Road2Work.id clearly and drive users to start interview practice.
Sections:
- Navigation bar with logo, Product, How It Works, Features, Demo, Sign In, and primary CTA “Start Interview Practice”.
- Hero section with bold headline:
  “Your Roadmap to a Better Interview”
  Supporting text:
  “Practice role-specific interviews with an adaptive AI HRD that listens, asks follow-up questions, and helps you turn real experience into stronger answers.”
- Primary CTA: “Start Interview Practice”
- Secondary CTA: “See How It Works”
- Product UI preview card showing the interview readiness dashboard and HRD interview room.
- Trust/value strip: “Role-specific”, “Voice-based”, “Evidence-focused”, “Adaptive feedback”.
- Problem section: “You have experience. The challenge is proving it.”
- Solution section: Road2Work turns CV/profile context into interview practice.
- Feature cards:
  1. Adaptive HRD Interview
  2. Voice-Only Practice
  3. Evidence Ladder Scoring
  4. Clarifying Follow-Up Questions
  5. Before–After Answer Improvement
  6. Readiness Dashboard
- How it works section:
  Step 1: Choose target role
  Step 2: Upload CV or fill short profile
  Step 3: Start live voice interview
  Step 4: Get readiness dashboard
- Role coverage section:
  Data Analyst, Data Scientist, AI Engineer, ML Engineer, Backend Developer
- Dashboard preview section with score card, strengths, improvement areas, and next practice recommendation.
- CTA section:
  “Ready to practice like it’s the real interview?”

2. Auth Pages
Create clean Login and Sign Up pages.
Design:
- Split layout: left side brand message, right side auth card.
- Keep it warm, minimal, and not too corporate.
- Add small motivational copy:
  “Build confidence before the real interview.”
Fields:
- Name for signup
- Email
- Password
- Continue button
- Google login placeholder optional
- Link to switch login/signup

3. Readiness Hub
This is the user’s starting dashboard after login.
Goal:
Give user a clear entry point to start assessment.
Content:
- Greeting: “Hi, ready to practice?”
- Short explanation of the process.
- Main CTA: “Start New Interview”
- Secondary cards:
  - Recent interview score
  - Target role
  - Practice streak
  - Suggested next practice
- Empty state for new users:
  “Your first interview practice starts here.”

4. Role Selection Flow
Create a guided step-by-step role selection screen.
Structure:
- Step indicator at top.
- Step 1: Choose Domain
  Example: Information Technology
- Step 2: Choose Role Family
  Data & AI, Software Engineering
- Step 3: Choose Target Role
  Data Analyst, Data Scientist, AI Engineer, ML Engineer, Backend Developer
Design:
- Use selectable cards.
- Active card uses red accent border or red indicator.
- Avoid overwhelming user with too many options.
- CTA: “Continue to Interview Setup”

5. Interview Context Setup
Goal:
Collect user context before interview.
Important:
Do not include “continue without data”.
User must choose one of two options:
- Upload CV
- Fill Short Profile

Screen layout:
- Title: “Give your AI HRD enough context”
- Subtitle: “Upload your CV, or fill a short profile if you prefer not to upload a file.”
- Two large option cards:
  1. Upload CV
     Description: “Best for personalized questions and stronger evidence analysis.”
     CTA: “Upload CV”
  2. Fill Short Profile
     Description: “A privacy-friendly way to tell us your experience in your own words.”
     CTA: “Fill Short Profile”
- Short privacy note:
  “Your data is only used to personalize your interview practice.”

Short Profile Form:
Fields:
- Most relevant experience
- Skills/tools you have used
- Project, internship, organization, or freelance experience
- Result, achievement, or impact
CTA: “Build Interview Context”

6. Interview Onboarding
Goal:
Prepare user before voice interview.
Content:
- Target role summary
- Interview duration estimate
- Number of main questions
- Explanation:
  “Answer by voice. Your AI HRD may ask clarifying questions if your answer needs more detail.”
- Checklist:
  Microphone ready
  Quiet room
  Answer naturally
  Use examples and evidence
- CTA: “Start Live Interview”

7. HRD Interview Stage
This is the flagship UI.
Goal:
Make the user feel like they are in a live HR interview.
Layout:
- Large central HRD video/WebM card.
- Top bar:
  Road2Work logo, target role, question progress, small timer.
- Main interview area:
  HRD WebM visual in a rounded card.
  Question bubble overlay below or beside the HRD.
- State indicators:
  Asking
  Listening
  Thinking
  Clarifying
- Mic button as the main interaction.
- Voice waveform or pulse animation while user is speaking.
- No text answer box as primary flow.
- Clarifying question state:
  Show a subtle red accent label “Follow-up”
  Example copy:
  “Can you explain the tools you used and the impact of that project?”
- Keep UI focused and cinematic but still lightweight.
- Add a small “End Interview” secondary action.

8. Result Dashboard
Goal:
Show final interview evaluation in a simple and actionable way.
Top section:
- Overall Interview Readiness Score
- Status: Ready / Almost Ready / Needs Practice
- Target role
- Evidence Level
Main result cards:
1. Strengths
   Show 3 strongest areas.
2. Improvement Areas
   Show 3 priority weaknesses.
3. Before–After Answer Improvement
   Compare original answer vs improved version.
4. Next Practice Recommendation
   Suggest the next focused practice.
Add score breakdown:
- Role Relevance
- STAR Structure
- Evidence Specificity
- Technical Accuracy
- Communication Clarity
- Self-Awareness
Design:
- Use cards with soft shadows.
- Use progress rings or horizontal score bars.
- Use red for focus/attention, green only for positive status.
- Keep feedback short and readable.
- Add CTA:
  “Practice Again”
  “Try Another Role”

9. Optional: Product Explainer / How It Works Page
Create a page explaining the system:
- Context extraction
- Role-specific interview generation
- Voice answer processing
- AI evaluation
- Clarifying question
- Dashboard result
Use diagrams, cards, and step flow.

10. Optional: About / Project Page
Explain Road2Work’s mission:
“Helping young talent translate real experience into career-ready communication.”

UX constraints:
- Avoid dense dashboards.
- Avoid generic AI robot visuals.
- Avoid dark full-page backgrounds.
- Avoid too many gradients.
- Avoid template-like SaaS sections.
- Make the website feel custom, branded, and memorable.
- Use red path/road line accents inspired by the Road2Work logo.
- Use product UI previews instead of stock photography.
- Use friendly but professional copywriting.

Component style:
- Primary button: red filled pill, white text.
- Secondary button: outlined pill, dark text.
- Cards: off-white/white, soft border, rounded 16–24px, subtle shadow.
- Badges: small pill tags with muted backgrounds.
- Icons: outlined, simple, monochrome or red accent.
- Inputs: rounded, soft border, clear focus state in red.
- Progress: red accent lines, road/path motif.

Overall output expected:
Generate a complete sitemap and wireframe for a polished, creative, fun-professional AI interview readiness platform. The result should feel like a premium career product, not a generic AI startup landing page.