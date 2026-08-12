// eBook catalog. pdfUrl points to a downloadable PDF (Google Drive file,
// or a Google Doc auto-exported as PDF). viewUrl points to an embeddable
// preview for "Read Book". Both stay empty for books not published yet.

export interface Ebook {
  id: string;
  title: string;
  price: string; // display string, e.g. "₦1,000"
  amount: number; // kobo, for Paystack
  rating: number;
  pages: string;
  status: "available" | "coming-soon";
  pdfUrl: string;
  viewUrl: string;
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
    pdfUrl: "https://drive.google.com/uc?export=download&id=1q-bz-8uS_ba538qe3U988vxyMxH-qk8B",
    viewUrl: "https://drive.google.com/file/d/1q-bz-8uS_ba538qe3U988vxyMxH-qk8B/preview",
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
    viewUrl: "",
  },
  {
    id: "make-money-with-ai",
    title: "Make Money with AI",
    price: "₦2,000",
    amount: 200000,
    rating: 5.0,
    pages: "—",
    status: "available",
    pdfUrl: "https://docs.google.com/document/d/1aiRt1m-bb9q0c2P09WxB2YIak89uMHGs/export?format=pdf",
    viewUrl: "https://docs.google.com/document/d/1aiRt1m-bb9q0c2P09WxB2YIak89uMHGs/preview",
  },
  {
    id: "digital-marketing-with-ai",
    title: "Digital Marketing with AI",
    price: "₦2,000",
    amount: 200000,
    rating: 5.0,
    pages: "—",
    status: "available",
    pdfUrl: "https://docs.google.com/document/d/1rnHbcmyh_TZr4ZdMTiSWzIQGox7mEhTf/export?format=pdf",
    viewUrl: "https://docs.google.com/document/d/1rnHbcmyh_TZr4ZdMTiSWzIQGox7mEhTf/preview",
  },
  {
    id: "freelancing-for-beginners",
    title: "Freelancing for Beginners",
    price: "₦1,500",
    amount: 150000,
    rating: 5.0,
    pages: "—",
    status: "available",
    pdfUrl: "https://docs.google.com/document/d/1DK4RMBBniYkckSTiH8IAjcD8PBwzEHoD/export?format=pdf",
    viewUrl: "https://docs.google.com/document/d/1DK4RMBBniYkckSTiH8IAjcD8PBwzEHoD/preview",
  },
];

export function getEbookById(id: string) {
  return ebooks.find((e) => e.id === id);
}
