'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthContext';
import DashboardShell from '../../../components/DashboardShell';
import BorderGlow from '../../../components/BorderGlow';

function getStatusColor(status) {
  if (status === 'Confirmed') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  if (status === 'Completed') return 'bg-[#2ea2d8]/20 text-[#2ea2d8] border-[#2ea2d8]/30';
  if (status === 'Cancelled') return 'bg-red-500/20 text-red-400 border-red-500/30';
  return 'bg-white/10 text-slate-300 border-white/10';
}

export default function BookingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { bookings, cancelBooking } = useAuth();

  const booking = useMemo(() => bookings.find(b => b.id === id), [bookings, id]);

  if (!booking) {
    return (
      <DashboardShell title="Booking Not Found" subtitle="This booking does not exist or has been removed.">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-slate-400 text-sm">We couldn't find a booking with ID: {id}</p>
          <Link
            href="/dashboard/bookings"
            className="mt-4 inline-flex rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Back to My Bookings
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(booking.id);
    }
  };

  return (
    <DashboardShell>
      {/* Back link */}
      <Link href="/dashboard/bookings" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to bookings
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left: Booking info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
              <span className="text-xs text-slate-500 font-mono">{booking.id}</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Booked on {new Date(booking.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Hotel details */}
          {booking.hotel && (
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
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Hotel Stay</p>
                {booking.hotel.image && (
                  <img
                    src={booking.hotel.image}
                    alt={booking.hotel.name}
                    className="h-40 w-full rounded-2xl object-cover mb-4"
                  />
                )}
                <p className="text-xl font-semibold text-slate-100">{booking.hotel.name}</p>
                <p className="text-sm text-slate-400">{booking.hotel.location}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">Room</p>
                    <p className="text-sm font-semibold text-slate-200">{booking.hotel.room}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">Check-in</p>
                    <p className="text-sm font-semibold text-slate-200">{booking.hotel.checkIn}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">Check-out</p>
                    <p className="text-sm font-semibold text-slate-200">{booking.hotel.checkOut}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3">
                  <span className="text-sm text-slate-400">{booking.hotel.nights} night{booking.hotel.nights !== 1 ? 's' : ''} × ${booking.hotel.pricePerNight}/night</span>
                  <span className="text-sm font-semibold text-slate-100">${booking.hotel.subtotal}</span>
                </div>
              </div>
            </BorderGlow>
          )}

          {/* Flight details */}
          {booking.flight && (
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
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Flight</p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-100">{booking.flight.departure}</p>
                    <p className="text-xs text-slate-400">{booking.flight.from}</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full relative flex items-center justify-center">
                      <div className="absolute w-full h-[1px] bg-white/20" />
                      <span className="z-10 bg-[#0f1115] px-2 text-[10px] uppercase tracking-[0.3em] text-slate-500">{booking.flight.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{booking.flight.stops}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-100">{booking.flight.arrival}</p>
                    <p className="text-xs text-slate-400">{booking.flight.to}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3">
                  <span className="text-sm text-slate-400">{booking.flight.airline} • {booking.flight.cabin || 'Economy'}</span>
                  <span className="text-sm font-semibold text-slate-100">${booking.flight.subtotal}</span>
                </div>
              </div>
            </BorderGlow>
          )}

          {/* Guide details */}
          {booking.guide && (
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
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Tour Guide</p>
                <p className="text-xl font-semibold text-slate-100">{booking.guide.name}</p>
                <p className="text-sm text-slate-400">{booking.guide.city} • {booking.guide.focus}</p>
                <p className="text-xs font-semibold text-emerald-300 mt-1">{booking.guide.rating} star</p>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3">
                  <span className="text-sm text-slate-400">Guide session fee</span>
                  <span className="text-sm font-semibold text-slate-100">${booking.guide.subtotal}</span>
                </div>
              </div>
            </BorderGlow>
          )}

          {/* Review section */}
          {booking.review ? (
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Your Review</p>
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className={`text-lg ${star <= booking.review.rating ? 'text-[#fbbf24]' : 'text-slate-600'}`}>★</span>
                ))}
                <span className="text-sm font-semibold text-slate-200 ml-2">{booking.review.rating}/5</span>
              </div>
              <p className="text-sm text-slate-300">{booking.review.comment}</p>
            </div>
          ) : booking.status !== 'Cancelled' ? (
            <Link
              href={`/dashboard/bookings/${booking.id}/review`}
              className="block rounded-[24px] border border-dashed border-white/20 bg-white/5 p-6 text-center transition hover:border-[#2ea2d8]/50 hover:bg-white/10"
            >
              <p className="text-sm font-semibold text-slate-300">Write a Review</p>
              <p className="text-xs text-slate-500 mt-1">Share your experience with other travelers</p>
            </Link>
          ) : null}
        </div>

        {/* Right: Receipt */}
        <div className="space-y-6">
          <BorderGlow
            edgeSensitivity={20}
            glowColor="200 90 70"
            backgroundColor="#0f1115"
            borderRadius={28}
            glowRadius={28}
            glowIntensity={1}
            coneSpread={30}
            animated={false}
            colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm font-semibold text-[#2ea2d8] uppercase tracking-widest">Receipt</p>
                <p className="text-xs text-slate-500 font-mono">{booking.id}</p>
              </div>

              <div className="space-y-3">
                {booking.hotel && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Hotel ({booking.hotel.nights} night{booking.hotel.nights !== 1 ? 's' : ''})</span>
                    <span className="text-slate-200 font-semibold">${booking.hotel.subtotal}</span>
                  </div>
                )}
                {booking.flight && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Flight</span>
                    <span className="text-slate-200 font-semibold">${booking.flight.subtotal}</span>
                  </div>
                )}
                {booking.guide && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Tour Guide</span>
                    <span className="text-slate-200 font-semibold">${booking.guide.subtotal}</span>
                  </div>
                )}

                <div className="h-px bg-white/10 my-2" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-slate-200">${booking.subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Taxes (12%)</span>
                  <span className="text-slate-200">${booking.taxes}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Service Fee</span>
                  <span className="text-slate-200">${booking.serviceFee}</span>
                </div>

                <div className="h-px bg-white/10 my-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-100">Total Paid</span>
                  <span className="text-2xl font-bold text-emerald-300">${booking.totalAmount?.toLocaleString()}</span>
                </div>
              </div>

              {/* Traveler info */}
              {booking.traveler && (
                <div className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Traveler</p>
                  <p className="text-sm font-semibold text-slate-200">{booking.traveler.name}</p>
                  <p className="text-xs text-slate-400">{booking.traveler.email}</p>
                  {booking.traveler.phone && <p className="text-xs text-slate-400">{booking.traveler.phone}</p>}
                </div>
              )}

              {/* Payment info */}
              {booking.payment && (
                <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Payment Method</p>
                  <p className="text-sm font-semibold text-slate-200">
                    •••• •••• •••• {booking.payment.last4}
                  </p>
                  <p className="text-xs text-slate-400">{booking.payment.brand} • Exp {booking.payment.expiry}</p>
                </div>
              )}
            </div>
          </BorderGlow>

          {/* Actions */}
          <div className="grid gap-3">
            {booking.status === 'Confirmed' && (
              <button
                onClick={handleCancel}
                className="w-full rounded-full border border-red-500/30 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                Cancel Booking
              </button>
            )}
            <Link
              href="/book"
              className="block w-full rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white text-center transition hover:brightness-110"
            >
              Book Another Trip
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
