// Defines which course IDs each paid plan unlocks. Referenced by both the
// Billing page (to charge correctly) and the Lesson page (to decide what
// a given student is allowed to watch beyond the free preview lesson).

export interface Plan {
  id: string;
  name: string;
  price: string;
  amount: number; // kobo
  courseIds: string[]; // empty array + "all" flag below means every course
  unlocksAll: boolean;
  perks: string[];
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₦1,000",
    amount: 100000,
    courseIds: ["ai-for-beginners"],
    unlocksAll: false,
    perks: ["AI for Beginners", "1 eBook", "Certificate"],
  },
  {
    id: "standard",
    name: "Standard",
    price: "₦2,000",
    amount: 200000,
    courseIds: ["ai-for-beginners", "affiliate-marketing", "ai-dropshipping"],
    unlocksAll: false,
    perks: ["3 courses", "eBooks included", "Certificate", "Downloads"],
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₦5,000",
    amount: 500000,
    courseIds: [],
    unlocksAll: true,
    perks: ["All 7 courses", "All eBooks", "Lifetime updates", "Premium support"],
  },
];

export function getPlanById(id: string) {
  return plans.find((p) => p.id === id);
}

// Given the plan IDs a student has purchased, returns the set of course
// IDs they're allowed to access beyond the free preview lesson.
export function getUnlockedCourseIds(purchasedPlanIds: string[]): Set<string> {
  const unlocked = new Set<string>();
  for (const planId of purchasedPlanIds) {
    const plan = getPlanById(planId);
    if (!plan) continue;
    if (plan.unlocksAll) {
      return new Set(["__ALL__"]); // sentinel checked by callers
    }
    plan.courseIds.forEach((id) => unlocked.add(id));
  }
  return unlocked;
}
