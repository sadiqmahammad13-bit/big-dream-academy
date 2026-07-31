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

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number; // index into options
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
  quiz: QuizQuestion[];
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
    quiz: [
      {
        id: "q1",
        question: "What is a key strength of modern AI tools?",
        options: ["Perfect accuracy every time", "Speeding up repetitive tasks", "Replacing all human judgment", "Working without any internet"],
        correctIndex: 1,
      },
      {
        id: "q2",
        question: "What matters most when writing a good AI prompt?",
        options: ["Using as few words as possible", "Being vague so the AI can guess", "Being clear and specific about what you want", "Only asking yes/no questions"],
        correctIndex: 2,
      },
      {
        id: "q3",
        question: "Which is a realistic way to earn money using AI skills?",
        options: ["Guaranteed overnight riches", "Offering AI-assisted freelance services", "Only working for AI companies", "AI cannot be monetized"],
        correctIndex: 1,
      },
      {
        id: "q4",
        question: "Before trusting AI output for something important, you should:", 
        options: ["Assume it's always correct", "Verify it against a reliable source", "Never use AI at all", "Only use AI for entertainment"],
        correctIndex: 1,
      },
      {
        id: "q5",
        question: "What's a good first step when choosing an AI tool for a task?",
        options: ["Pick the most expensive one", "Match the tool's strengths to your specific task", "Use every tool at once", "Ignore reviews and documentation"],
        correctIndex: 1,
      },
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
    quiz: [
      {
        id: "q1",
        question: "How does an affiliate marketer typically earn money?",
        options: ["A fixed salary from the merchant", "A commission on sales made through their referral link", "Charging customers directly for products", "Selling their own inventory"],
        correctIndex: 1,
      },
      {
        id: "q2",
        question: "Why is disclosure (telling your audience it's an affiliate link) important?",
        options: ["It's optional and rarely matters", "It builds trust and is often legally required", "It reduces your commission", "It's only needed for expensive products"],
        correctIndex: 1,
      },
      {
        id: "q3",
        question: "What's a sustainable way to choose what to promote?",
        options: ["Promote anything with the highest commission regardless of quality", "Promote products you'd genuinely recommend", "Promote as many products as possible at once", "Never test the product yourself"],
        correctIndex: 1,
      },
      {
        id: "q4",
        question: "What helps you track whether your affiliate promotions are working?",
        options: ["Guessing based on how you feel", "Using tracking links and checking conversion data", "Ignoring analytics entirely", "Asking friends if they liked your post"],
        correctIndex: 1,
      },
      {
        id: "q5",
        question: "Which is a red flag for an affiliate program you're considering?",
        options: ["Clear terms and a public track record", "Pressure to recruit others instead of sell products", "A reasonable cookie duration", "Transparent commission rates"],
        correctIndex: 1,
      },
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
    quiz: [
      {
        id: "q1",
        question: "What is the core idea behind dropshipping?",
        options: ["You hold large amounts of inventory yourself", "The supplier ships directly to the customer, so you avoid holding stock", "You manufacture the products yourself", "You only sell in physical stores"],
        correctIndex: 1,
      },
      {
        id: "q2",
        question: "How can AI tools help with product research?",
        options: ["They can't help with this at all", "By quickly summarizing trends and generating ideas to investigate further", "By guaranteeing a product will sell", "By replacing the need to check supplier quality"],
        correctIndex: 1,
      },
      {
        id: "q3",
        question: "Why is vetting suppliers important before launching?",
        options: ["It's unnecessary if the price is low", "It helps you avoid poor quality, slow shipping, and scams", "Suppliers are all equally reliable", "Only large businesses need to do this"],
        correctIndex: 1,
      },
      {
        id: "q4",
        question: "What's a good use of AI when writing product pages?",
        options: ["Copying a competitor's page exactly", "Drafting clear, honest descriptions faster, then editing for accuracy", "Making exaggerated claims about the product", "Skipping descriptions entirely"],
        correctIndex: 1,
      },
      {
        id: "q5",
        question: "What's an important part of handling customer service in dropshipping?",
        options: ["Ignoring return requests", "Setting clear expectations on shipping times and handling issues promptly", "Never responding to customers", "Blaming the supplier publicly"],
        correctIndex: 1,
      },
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
    quiz: [
      {
        id: "q1",
        question: "What is a Brand Kit used for in Canva?",
        options: ["Storing unrelated random images", "Keeping your fonts, colors, and logo consistent across designs", "Only for exporting videos", "It has no real purpose"],
        correctIndex: 1,
      },
      {
        id: "q2",
        question: "Why does consistent sizing matter for social media posts?",
        options: ["It doesn't matter at all", "Each platform has different ideal dimensions for best display", "All platforms use the exact same size", "Only videos need correct sizing"],
        correctIndex: 1,
      },
      {
        id: "q3",
        question: "What makes a presentation look less like a boring slide deck?",
        options: ["Using only default templates with no changes", "Thoughtful use of color, hierarchy, and visual variety", "Cramming as much text as possible per slide", "Avoiding images entirely"],
        correctIndex: 1,
      },
      {
        id: "q4",
        question: "When delivering files to a client, what's a good practice?",
        options: ["Sending only a screenshot", "Exporting in the correct format and resolution they requested", "Making them guess the file type", "Never asking what format they need"],
        correctIndex: 1,
      },
      {
        id: "q5",
        question: "What's a benefit of using templates in Canva?",
        options: ["They guarantee no further edits are needed", "They give you a fast, professional starting point to customize", "They can only be used once", "They replace the need for a brand kit"],
        correctIndex: 1,
      },
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
    quiz: [
      {
        id: "q1",
        question: "In Meta Ads Manager, what sits above an Ad Set?",
        options: ["An individual Ad", "A Campaign", "A Pixel", "A Page"],
        correctIndex: 1,
      },
      {
        id: "q2",
        question: "Why is audience targeting important?",
        options: ["It doesn't affect ad performance", "It helps your budget reach people more likely to be interested", "You should always target everyone everywhere", "Targeting is only for large budgets"],
        correctIndex: 1,
      },
      {
        id: "q3",
        question: "What is the purpose of creative testing?",
        options: ["To use only one ad forever", "To compare different ad variations and find what performs best", "To avoid ever changing your ads", "It's not necessary if the budget is small"],
        correctIndex: 1,
      },
      {
        id: "q4",
        question: "What's a safer approach to scaling ad budget?",
        options: ["Doubling budget overnight regardless of performance", "Increasing budget gradually based on performance data", "Spending your entire budget on day one", "Ignoring performance metrics"],
        correctIndex: 1,
      },
      {
        id: "q5",
        question: "Why track ad spend closely?",
        options: ["It's not important once ads are running", "To understand return on investment and avoid overspending", "Meta tracks everything so you don't need to", "Only large companies need to track spend"],
        correctIndex: 1,
      },
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
    quiz: [
      {
        id: "q1",
        question: "What does HTML primarily provide for a webpage?",
        options: ["Visual styling like colors and fonts", "The structure and content of the page", "Server-side database logic", "Payment processing"],
        correctIndex: 1,
      },
      {
        id: "q2",
        question: "What is CSS mainly used for?",
        options: ["Structuring content", "Styling and layout of a page", "Hosting a website", "Registering a domain name"],
        correctIndex: 1,
      },
      {
        id: "q3",
        question: "What's an advantage of no-code/low-code website builders?",
        options: ["They require advanced programming knowledge", "They let you build and launch sites faster without deep coding skills", "They can't be used on mobile", "They never allow customization"],
        correctIndex: 1,
      },
      {
        id: "q4",
        question: "What does 'deploying' a website mean?",
        options: ["Deleting the website", "Making the website live and accessible on the internet", "Writing the HTML code only", "Designing the logo"],
        correctIndex: 1,
      },
      {
        id: "q5",
        question: "Why is it useful to understand how websites work even if you use no-code tools?",
        options: ["It's not useful at all", "It helps you troubleshoot and make better decisions", "No-code tools require no understanding of anything", "Only developers ever need this knowledge"],
        correctIndex: 1,
      },
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
    quiz: [
      {
        id: "q1",
        question: "What is a realistic expectation about earning money online?",
        options: ["Guaranteed overnight wealth", "It usually takes consistent effort over time to build income", "It requires no skills at all", "Only certain countries can earn online"],
        correctIndex: 1,
      },
      {
        id: "q2",
        question: "What's a good way to choose which online income path to pursue?",
        options: ["Pick randomly with no thought", "Match it to your existing skills and interests", "Only choose what's currently trending, regardless of fit", "Try to do all paths at once immediately"],
        correctIndex: 1,
      },
      {
        id: "q3",
        question: "Which is a common red flag of an online money-making scam?",
        options: ["Clear, verifiable information about the business", "Pressure to pay upfront for guaranteed high returns", "Transparent terms and conditions", "Realistic, modest income claims"],
        correctIndex: 1,
      },
      {
        id: "q4",
        question: "Why is having a 30-day action plan useful?",
        options: ["Plans are never useful", "It breaks a big goal into concrete, manageable steps", "It guarantees success regardless of effort", "It replaces the need for any skills"],
        correctIndex: 1,
      },
      {
        id: "q5",
        question: "Which is an example of a legitimate way to earn online mentioned in this course?",
        options: ["Pyramid recruitment schemes", "Freelancing based on a real skill", "Paying strangers for guaranteed returns", "Sharing personal banking details with strangers"],
        correctIndex: 1,
      },
    ],
  },
];

export function getCourseById(id: string) {
  return courses.find((c) => c.id === id);
}
