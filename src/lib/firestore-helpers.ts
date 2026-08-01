// Small, typed wrappers around the Firestore calls the app needs.
// Keeping these in one place means every page reads/writes the same shape.

import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  serverTimestamp,
  type UpdateData,
} from "firebase/firestore";
import { db } from "./firebase";

export interface UserProfile {
  name: string;
  email: string;
  role: "student" | "admin";
  xp: number;
  enrolledCourses: string[];
  favorites: string[];
  completedCourses: string[];
  quizResults?: Record<string, QuizResult>;
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

// Marks a lesson complete and awards XP. Course-level completion (and the
// certificate) is granted once every lesson in the course is done — call
// markCourseComplete() from the lesson page when that condition is met.
export async function markLessonComplete(uid: string, courseId: string, lessonId: string, xpAward = 20) {
  await updateDoc(doc(db, "users", uid), {
    [`progress.${courseId}.${lessonId}`]: true,
    xp: increment(xpAward),
  });
}

// Generates a short, unique-enough certificate ID from the course id,
// user id, and current time. Good enough for display/verification purposes
// without needing a server-side counter.
function generateCertificateId(uid: string, courseId: string): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const userPart = uid.slice(0, 4).toUpperCase();
  const coursePart = courseId.slice(0, 3).toUpperCase();
  return `BDA-${coursePart}-${userPart}-${stamp}`;
}

// Saves a quiz score for a course. If the score is 80% or above, the
// course is marked completed and a certificate ID is generated and stored.
// Returns the result so the calling page can immediately show the outcome.
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
