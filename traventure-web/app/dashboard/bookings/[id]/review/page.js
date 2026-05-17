'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../../components/AuthContext';
import DashboardShell from '../../../../components/DashboardShell';
import BorderGlow from '../../../../components/BorderGlow';

export default function ReviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const { bookings, addReview } = useAuth();

  const booking = useMemo(() => bookings.find(b => b.id === id), [bookings, id]);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hotelRating, setHotelRating] = useState(5);
  const [flightRating, setFlightRating] = useState(5);
  const [guideRating, setGuideRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  if (!booking) {
    return (
      <DashboardShell title="Booking Not Found">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-slate-400 text-sm">Booking not found.</p>
          <Link href="/dashboard/bookings" className="mt-4 inline-flex rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">
            Back to Bookings
          </Link>
        </div>
      </DashboardShell>
    );
  }

  if (booking.review) {
    return (
      <DashboardShell title="Review Already Submitted">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-slate-400 text-sm">You have already reviewed this booking.</p>
          <Link href={`/dashboard/bookings/${booking.id}`} className="mt-4 inline-flex rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">
            View Booking
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      rating,
      comment,
      hotelRating: booking.hotel ? hotelRating : null,
      flightRating: booking.flight ? flightRating : null,
      guideRating: booking.guide ? guideRating : null,
      submittedAt: new Date().toISOString(),
    };
    addReview(booking.id, review);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-lg">
          <BorderGlow
            edgeSensitivity={25}
            glowColor="200 90 70"
            backgroundColor="#0f1115"
            borderRadius={28}
            glowRadius={28}
            glowIntensity={1}
            coneSpread={30}
            animated={true}
            colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
          >
            <div className="p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 mb-4">
                <svg className="text-emerald-300" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 className="font-display text-3xl text-slate-100">Thank You!</h2>
              <p className="mt-2 text-sm text-slate-400">Your review has been submitted successfully.</p>
              <div className="flex gap-3 justify-center mt-6">
                <Link href={`/dashboard/bookings/${booking.id}`} className="rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">
                  View Booking
                </Link>
                <Link href="/dashboard/bookings" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40">
                  All Bookings
                </Link>
              </div>
            </div>
          </BorderGlow>
        </div>
      </DashboardShell>
    );
  }

  function StarRow({ value, onChange, label }) {
    const [hover, setHover] = useState(0);
    return (
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">{label}</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => onChange(star)}
              className={`text-xl transition ${star <= (hover || value) ? 'text-[#fbbf24]' : 'text-slate-600'} hover:scale-110`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <DashboardShell title="Write a Review" subtitle={`Review for booking ${booking.id}`}>
      <Link href={`/dashboard/bookings/${booking.id}`} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to booking
      </Link>

      <div className="mx-auto max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Overall rating */}
          <BorderGlow
            edgeSensitivity={25}
            glowColor="200 90 70"
            backgroundColor="#0f1115"
            borderRadius={24}
            glowRadius={24}
            glowIntensity={0.8}
            coneSpread={30}
            animated={false}
            colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
          >
            <div className="p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">Overall Rating</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className={`text-3xl transition ${star <= (hoverRating || rating) ? 'text-[#fbbf24]' : 'text-slate-600'} hover:scale-125`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="text-sm text-slate-400 mt-2">{rating}/5 stars</p>
            </div>
          </BorderGlow>

          {/* Service-specific ratings */}
          {(booking.hotel || booking.flight || booking.guide) && (
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Service Ratings</p>
              {booking.hotel && <StarRow label={`Hotel — ${booking.hotel.name}`} value={hotelRating} onChange={setHotelRating} />}
              {booking.flight && <StarRow label={`Flight — ${booking.flight.airline}`} value={flightRating} onChange={setFlightRating} />}
              {booking.guide && <StarRow label={`Guide — ${booking.guide.name}`} value={guideRating} onChange={setGuideRating} />}
            </div>
          )}

          {/* Comment */}
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 block mb-3">
              Your Experience
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your trip — what stood out, what you loved, and any tips for future travelers..."
              rows={5}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none resize-none transition focus:border-[#2ea2d8]"
            />
          </div>

          <button
            type="submit"
            disabled={!comment.trim()}
            className="w-full rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}
