// Static course catalog. In production this would live in Firestore
// (a `courses` collection) — kept as a typed constant here so the UI
// is fully browsable before you wire up real content.

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "12:30"
  videoUrl: string; // placeholder — swap for real hosted video / Mux / YouTube unlisted
}

export interface Resource {
  id: string;
  title: string;
  type: "pdf" | "template";
  fileUrl: string;
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  hours: number;
  image: string;
  lessons: Lesson[];
  resources: Resource[];
}

export const courses: Course[] = [
  {
    id: "ai-for-beginners",
    title: "AI for Beginners",
    tagline: "Understand and use AI tools with confidence",
    description:
      "A ground-up introduction to modern AI tools — what they are, how they work, and how to use them to save time and make money without any technical background.",
    level: "Beginner",
    category: "Artificial Intelligence",
    hours: 4,
    image: "/courses/ai-for-beginners.jpg",
    lessons: [
      { id: "l1", title: "What AI can (and can't) do for you", duration: "08:12", videoUrl: "" },
      { id: "l2", title: "Choosing the right AI tool for a task", duration: "10:45", videoUrl: "" },
      { id: "l3", title: "Writing prompts that actually work", duration: "12:30", videoUrl: "" },
      { id: "l4", title: "Turning AI skills into income", duration: "15:00", videoUrl: "" },
    ],
    resources: [
      { id: "r1", title: "AI Tools Cheat Sheet", type: "pdf", fileUrl: "" },
      { id: "r2", title: "Prompt Template Pack", type: "template", fileUrl: "" },
    ],
  },
  {
    id: "chatgpt-masterclass",
    title: "ChatGPT Masterclass",
    tagline: "Go from casual user to power user",
    description:
      "Master prompt engineering, custom instructions, and ChatGPT workflows for writing, research, business, and freelance work.",
    level: "Intermediate",
    category: "Artificial Intelligence",
    hours: 6,
    image: "/courses/chatgpt-masterclass.jpg",
    lessons: [
      { id: "l1", title: "Prompt engineering fundamentals", duration: "14:20", videoUrl: "" },
      { id: "l2", title: "Custom instructions & memory", duration: "09:55", videoUrl: "" },
      { id: "l3", title: "Building repeatable workflows", duration: "16:10", videoUrl: "" },
      { id: "l4", title: "Freelancing with ChatGPT", duration: "13:40", videoUrl: "" },
    ],
    resources: [
      { id: "r1", title: "50 Proven Prompts", type: "pdf", fileUrl: "" },
      { id: "r2", title: "Client Workflow Template", type: "template", fileUrl: "" },
    ],
  },
  {
    id: "claude-ai",
    title: "Claude AI",
    tagline: "Work smarter with Anthropic's Claude",
    description:
      "Learn how to use Claude for writing, coding, research, and everyday productivity — including artifacts, projects, and long-context workflows.",
    level: "Intermediate",
    category: "Artificial Intelligence",
    hours: 5,
    image: "/courses/claude-ai.jpg",
    lessons: [
      { id: "l1", title: "Getting started with Claude", duration: "07:50", videoUrl: "" },
      { id: "l2", title: "Projects, Artifacts & memory", duration: "11:15", videoUrl: "" },
      { id: "l3", title: "Claude for research and writing", duration: "12:05", videoUrl: "" },
      { id: "l4", title: "Building simple tools with Claude", duration: "18:30", videoUrl: "" },
    ],
    resources: [
      { id: "r1", title: "Claude Prompting Guide", type: "pdf", fileUrl: "" },
    ],
  },
  {
    id: "affiliate-marketing",
    title: "Affiliate Marketing",
    tagline: "Build an ethical income stream promoting products you trust",
    description:
      "A practical, no-hype path into affiliate marketing: choosing programs, building an audience, and promoting honestly and sustainably.",
    level: "Beginner",
    category: "Digital Marketing",
    hours: 7,
    image: "/courses/affiliate-marketing.jpg",
    lessons: [
      { id: "l1", title: "How affiliate marketing actually works", duration: "10:00", videoUrl: "" },
      { id: "l2", title: "Choosing programs and niches", duration: "13:25", videoUrl: "" },
      { id: "l3", title: "Content that converts, honestly", duration: "15:40", videoUrl: "" },
      { id: "l4", title: "Tracking, disclosure & compliance", duration: "09:10", videoUrl: "" },
    ],
    resources: [
      { id: "r1", title: "Affiliate Program Comparison Sheet", type: "template", fileUrl: "" },
      { id: "r2", title: "FTC Disclosure Checklist", type: "pdf", fileUrl: "" },
    ],
  },
  {
    id: "shopify-dropshipping",
    title: "Shopify Dropshipping",
    tagline: "Launch a legitimate online store from scratch",
    description:
      "Set up a Shopify store, source reliable suppliers, and market a small catalog without inventory risk.",
    level: "Intermediate",
    category: "E-commerce",
    hours: 8,
    image: "/courses/shopify-dropshipping.jpg",
    lessons: [
      { id: "l1", title: "Setting up your Shopify store", duration: "16:20", videoUrl: "" },
      { id: "l2", title: "Finding trustworthy suppliers", duration: "14:00", videoUrl: "" },
      { id: "l3", title: "Pricing and margins that work", duration: "11:30", videoUrl: "" },
      { id: "l4", title: "Customer service & returns", duration: "10:45", videoUrl: "" },
    ],
    resources: [
      { id: "r1", title: "Store Launch Checklist", type: "pdf", fileUrl: "" },
      { id: "r2", title: "Supplier Vetting Template", type: "template", fileUrl: "" },
    ],
  },
  {
    id: "meta-ads",
    title: "Meta Ads",
    tagline: "Run profitable ads on Facebook & Instagram",
    description:
      "Learn campaign structure, audience targeting, creative testing, and budget management for Meta Ads Manager.",
    level: "Advanced",
    category: "Digital Marketing",
    hours: 6,
    image: "/courses/meta-ads.jpg",
    lessons: [
      { id: "l1", title: "Ads Manager walkthrough", duration: "12:50", videoUrl: "" },
      { id: "l2", title: "Audience targeting strategy", duration: "14:15", videoUrl: "" },
      { id: "l3", title: "Creative testing frameworks", duration: "13:00", videoUrl: "" },
      { id: "l4", title: "Budgeting and scaling safely", duration: "10:30", videoUrl: "" },
    ],
    resources: [
      { id: "r1", title: "Campaign Structure Template", type: "template", fileUrl: "" },
      { id: "r2", title: "Ad Spend Tracker", type: "pdf", fileUrl: "" },
    ],
  },
  {
    id: "canva-design",
    title: "Canva Design",
    tagline: "Design scroll-stopping visuals without a design degree",
    description:
      "Master Canva for social posts, brand kits, presentations, and client deliverables — fast, consistent, and professional.",
    level: "Beginner",
    category: "Design",
    hours: 3,
    image: "/courses/canva-design.jpg",
    lessons: [
      { id: "l1", title: "Canva fundamentals & brand kits", duration: "09:20", videoUrl: "" },
      { id: "l2", title: "Social media templates", duration: "11:00", videoUrl: "" },
      { id: "l3", title: "Presentations that don't look like slides", duration: "10:15", videoUrl: "" },
      { id: "l4", title: "Delivering client-ready files", duration: "08:40", videoUrl: "" },
    ],
    resources: [
      { id: "r1", title: "Brand Kit Template", type: "template", fileUrl: "" },
      { id: "r2", title: "Social Post Size Cheat Sheet", type: "pdf", fileUrl: "" },
    ],
  },
];

export function getCourseById(id: string) {
  return courses.find((c) => c.id === id);
}
