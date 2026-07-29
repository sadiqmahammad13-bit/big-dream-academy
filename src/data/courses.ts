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
    id: "ai-dropshipping",
    title: "AI Dropshipping",
    tagline: "Use AI tools to run a leaner, smarter dropshipping store",
    description:
      "Combine dropshipping fundamentals with AI tools for product research, store copy, and customer support — without inventory risk.",
    level: "Intermediate",
    category: "E-commerce",
    hours: 8,
    image: "/courses/ai-dropshipping.jpg",
    lessons: [
      { id: "l1", title: "Setting up your store", duration: "16:20", videoUrl: "" },
      { id: "l2", title: "AI-assisted product research", duration: "14:00", videoUrl: "" },
      { id: "l3", title: "Writing product pages with AI", duration: "11:30", videoUrl: "" },
      { id: "l4", title: "Customer service & returns", duration: "10:45", videoUrl: "" },
    ],
    resources: [
      { id: "r1", title: "Store Launch Checklist", type: "pdf", fileUrl: "" },
      { id: "r2", title: "Supplier Vetting Template", type: "template", fileUrl: "" },
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
  {
    id: "facebook-ads",
    title: "Facebook Ads",
    tagline: "Run profitable ads on Facebook & Instagram",
    description:
      "Learn campaign structure, audience targeting, creative testing, and budget management using Meta Ads Manager.",
    level: "Advanced",
    category: "Digital Marketing",
    hours: 6,
    image: "/courses/facebook-ads.jpg",
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
    id: "web-development",
    title: "Web Development",
    tagline: "Build real websites, even without a computer science background",
    description:
      "A practical introduction to building and deploying websites — HTML, CSS, and modern no-code/low-code tools you can use from a phone.",
    level: "Beginner",
    category: "Web Development",
    hours: 9,
    image: "/courses/web-development.jpg",
    lessons: [
      { id: "l1", title: "How websites actually work", duration: "09:40", videoUrl: "" },
      { id: "l2", title: "HTML & CSS fundamentals", duration: "18:20", videoUrl: "" },
      { id: "l3", title: "Building with no-code tools", duration: "14:50", videoUrl: "" },
      { id: "l4", title: "Deploying your first site", duration: "12:10", videoUrl: "" },
    ],
    resources: [
      { id: "r1", title: "HTML/CSS Cheat Sheet", type: "pdf", fileUrl: "" },
      { id: "r2", title: "Website Launch Checklist", type: "template", fileUrl: "" },
    ],
  },
  {
    id: "make-money-online",
    title: "How to Make Money Online",
    tagline: "A realistic map of legitimate ways to earn online",
    description:
      "An honest overview of the main paths to earning online — freelancing, digital products, affiliate income, and more — so you can pick the one that fits you.",
    level: "Beginner",
    category: "Digital Marketing",
    hours: 5,
    image: "/courses/make-money-online.jpg",
    lessons: [
      { id: "l1", title: "Mapping the realistic options", duration: "11:20", videoUrl: "" },
      { id: "l2", title: "Picking a path that fits your skills", duration: "09:45", videoUrl: "" },
      { id: "l3", title: "Avoiding scams and false promises", duration: "10:30", videoUrl: "" },
      { id: "l4", title: "Your first 30-day action plan", duration: "13:15", videoUrl: "" },
    ],
    resources: [
      { id: "r1", title: "30-Day Action Plan Template", type: "template", fileUrl: "" },
      { id: "r2", title: "Scam Red Flags Checklist", type: "pdf", fileUrl: "" },
    ],
  },
];

export function getCourseById(id: string) {
  return courses.find((c) => c.id === id);
}
