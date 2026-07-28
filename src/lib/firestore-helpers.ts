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

export async function markCourseComplete(uid: string, courseId: string) {
  await updateDoc(doc(db, "users", uid), {
    completedCourses: arrayUnion(courseId),
    [`certificates.${courseId}`]: {
      issuedAt: serverTimestamp(),
    },
  });
}
