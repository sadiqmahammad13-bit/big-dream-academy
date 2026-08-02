// eBook catalog. `pdfUrl` is empty until real files are uploaded to
// Firebase Storage — the Profile/eBooks pages show a "contact us" message
// for owned books whose file isn't ready yet, so nothing breaks meanwhile.

export interface Ebook {
  id: string;
  title: string;
  price: string; // display string, e.g. "₦1,000"
  amount: number; // kobo, for Paystack
  rating: number;
  pages: string;
  status: "available" | "coming-soon";
  pdfUrl: string;
}

export const ebooks: Ebook[] = [
  {
    id: "ai-for-beginners-ebook",
    title: "AI for Beginners",
    price: "₦1,000",
    amount: 100000,
    rating: 5.0,
    pages: "90+",
    status: "available",
    pdfUrl: "",
  },
  {
    id: "prompt-engineering-masterclass",
    title: "Prompt Engineering Masterclass",
    price: "₦1,500",
    amount: 150000,
    rating: 0,
    pages: "—",
    status: "coming-soon",
    pdfUrl: "",
  },
  {
    id: "make-money-with-ai",
    title: "Make Money with AI",
    price: "₦2,000",
    amount: 200000,
    rating: 0,
    pages: "—",
    status: "coming-soon",
    pdfUrl: "",
  },
  {
    id: "digital-marketing-with-ai",
    title: "Digital Marketing with AI",
    price: "₦2,000",
    amount: 200000,
    rating: 0,
    pages: "—",
    status: "coming-soon",
    pdfUrl: "",
  },
  {
    id: "freelancing-for-beginners",
    title: "Freelancing for Beginners",
    price: "₦1,500",
    amount: 150000,
    rating: 0,
    pages: "—",
    status: "coming-soon",
    pdfUrl: "",
  },
];

export function getEbookById(id: string) {
  return ebooks.find((e) => e.id === id);
}
