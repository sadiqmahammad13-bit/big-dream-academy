// Small, typed wrappers around the Firestore calls the app needs.
// Keeping these in one place means every page reads/writes the same shape.

import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  serverTimestamp,
  type UpdateData,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Purchase {
  type: "plan" | "ebook";
  itemId: string;
  itemLabel: string; // human-readable name, for the admin log
  amount: number; // kobo
  purchasedAt: string; // ISO date string
}

export interface UserProfile {
  name: string;
  email: string;
  role: "student" | "admin";
  xp: number;
  enrolledCourses: string[];
  favorites: string[];
  completedCourses: string[];
  quizResults?: Record<string, QuizResult>;
  ownedEbooks?: string[];
  purchases?: Purchase[];
}

export interface QuizResult {
  score: number; // percentage, 0-100
  passed: boolean;
  certificateId?: string;
  completedAt: string; // ISO date string
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

// Admin-only in practice — Firestore Security Rules restrict which fields
// a non-admin caller can actually read back, but the client-side gate is
// in src/app/admin/page.tsx (role check before this is ever called).
export async function getAllUserProfiles(): Promise<(UserProfile & { uid: string })[]> {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({ uid: d.id, ...(d.data() as UserProfile) }));
}

export async function toggleFavorite(uid: string, courseId: string, isFavorite: boolean) {
  await updateDoc(doc(db, "users", uid), {
    favorites: isFavorite ? arrayRemove(courseId) : arrayUnion(courseId),
  });
}

export async function enrollInCourse(uid: string, courseId: string) {
  await updateDoc(doc(db, "users", uid), {
    enrolledCourses: arrayUnion(courseId),
  });
}

// Marks a lesson complete and awards XP.
export async function markLessonComplete(uid: string, courseId: string, lessonId: string, xpAward = 20) {
  await updateDoc(doc(db, "users", uid), {
    [`progress.${courseId}.${lessonId}`]: true,
    xp: increment(xpAward),
  });
}

function generateCertificateId(uid: string, courseId: string): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const userPart = uid.slice(0, 4).toUpperCase();
  const coursePart = courseId.slice(0, 3).toUpperCase();
  return `BDA-${coursePart}-${userPart}-${stamp}`;
}

export async function submitQuizResult(
  uid: string,
  courseId: string,
  score: number
): Promise<QuizResult> {
  const passed = score >= 80;
  const result: QuizResult = {
    score,
    passed,
    completedAt: new Date().toISOString(),
  };

  if (passed) {
    result.certificateId = generateCertificateId(uid, courseId);
  }

  const updates: UpdateData<UserProfile> = {
    [`quizResults.${courseId}`]: result,
  };

  if (passed) {
    updates.completedCourses = arrayUnion(courseId) as unknown as string[];
  }

  await updateDoc(doc(db, "users", uid), updates);
  return result;
}

export async function grantEbookAccess(uid: string, ebookId: string) {
  await updateDoc(doc(db, "users", uid), {
    ownedEbooks: arrayUnion(ebookId),
  });
}

// Records a successful payment (course plan or eBook) so the Admin
// Dashboard can show real revenue and a purchase log.
export async function recordPurchase(uid: string, purchase: Purchase) {
  await updateDoc(doc(db, "users", uid), {
    purchases: arrayUnion(purchase),
  });
}
