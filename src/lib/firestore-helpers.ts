// Small, typed wrappers around the Firestore calls the app needs.
// Keeping these in one place means every page reads/writes the same shape.

import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  type UpdateData,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Purchase {
  type: "plan" | "ebook";
  itemId: string;
  itemLabel: string;
  amount: number;
  purchasedAt: string;
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
  score: number;
  passed: boolean;
  certificateId?: string;
  completedAt: string;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

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

// Saves a quiz score for a course. If the score is 80% or above, the
// course is marked completed, a certificate ID is generated, and a public
// lookup record is written to the top-level `certificates` collection so
// anyone (even signed-out visitors) can verify it on the Certificate
// Verification page — Firestore Rules allow public reads of that
// collection specifically, unlike the `users` collection.
export async function submitQuizResult(
  uid: string,
  courseId: string,
  score: number,
  studentName: string
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

  if (passed && result.certificateId) {
    await setDoc(doc(db, "certificates", result.certificateId), {
      studentName,
      courseId,
      score,
      completedAt: result.completedAt,
      certificateId: result.certificateId,
    });
  }

  return result;
}

export async function grantEbookAccess(uid: string, ebookId: string) {
  await updateDoc(doc(db, "users", uid), {
    ownedEbooks: arrayUnion(ebookId),
  });
}

export async function recordPurchase(uid: string, purchase: Purchase) {
  await updateDoc(doc(db, "users", uid), {
    purchases: arrayUnion(purchase),
  });
}

export interface CertificateLookupResult {
  studentName: string;
  courseId: string;
  score: number;
  completedAt: string;
  certificateId: string;
}

// Public lookup — reads directly from the top-level `certificates`
// collection, which Firestore Rules allow anyone to read.
export async function verifyCertificate(certificateId: string): Promise<CertificateLookupResult | null> {
  const snap = await getDoc(doc(db, "certificates", certificateId.trim()));
  return snap.exists() ? (snap.data() as CertificateLookupResult) : null;
}
