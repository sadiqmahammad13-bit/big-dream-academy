"use client";

import { useEffect, useState, FormEvent } from "react";
import { Star } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { submitReview, getReviewsForCourse, getMyReviewForCourse, Review } from "@/lib/firestore-helpers";

export default function ReviewsSection({ courseId }: { courseId: string }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [myReview, setMyReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getReviewsForCourse(courseId)
      .then(setReviews)
      .finally(() => setLoading(false));
  }, [courseId]);

  useEffect(() => {
    if (user) {
      getMyReviewForCourse(user.uid, courseId).then((r) => {
        setMyReview(r);
        if (r) {
          setRating(r.rating);
          setComment(r.comment);
        }
      });
    }
  }, [user, courseId]);

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);

    const review: Review = {
      uid: user.uid,
      studentName: user.displayName || "Student",
      courseId,
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await submitReview(review);
      setMyReview(review);
      const updated = await getReviewsForCourse(courseId);
      setReviews(updated);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
    setSubmitting(false);
  }

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-lg font-semibold text-bone">Reviews</h2>
        {averageRating && (
          <span className="flex items-center gap-1 text-sm text-gold-400">
            <Star className="h-4 w-4 fill-gold-500 text-gold-500" /> {averageRating} ({reviews.length})
          </span>
        )}
      </div>

      {user && (
        <form onSubmit={handleSubmit} className="card mt-4 p-5">
          <p className="text-sm font-medium text-bone">
            {myReview ? "Update your review" : "Leave a review"}
          </p>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                aria-label={`Rate ${n} stars`}
              >
                <Star className={`h-6 w-6 ${n <= rating ? "fill-gold-500 text-gold-500" : "text-ink-700"}`} />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you think of this course?"
            className="input-field mt-3 min-h-[80px] resize-none"
          />
          <button type="submit" disabled={submitting} className="btn-gold mt-3 text-sm disabled:opacity-60">
            {submitting ? "Saving…" : myReview ? "Update review" : "Submit review"}
          </button>
        </form>
      )}

      {loading ? (
        <div className="mt-6 h-8 w-8 animate-spin rounded-full border-2 border-ink-700 border-t-grow-500" />
      ) : reviews.length === 0 ? (
        <p className="mt-4 text-sm text-smoke">No reviews yet — be the first to leave one.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {reviews.map((r) => (
            <div key={`${r.uid}_${r.courseId}`} className="card p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-bone">{r.studentName}</p>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className={`h-3.5 w-3.5 ${n <= r.rating ? "fill-gold-500 text-gold-500" : "text-ink-700"}`} />
                  ))}
                </div>
              </div>
              {r.comment && <p className="mt-2 text-sm text-smoke">{r.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
