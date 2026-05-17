'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../components/AuthContext';
import DashboardShell from '../../components/DashboardShell';
import BorderGlow from '../../components/BorderGlow';

const statusFilters = ['All', 'Confirmed', 'Completed', 'Cancelled'];

function getStatusColor(status) {
  if (status === 'Confirmed') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  if (status === 'Completed') return 'bg-[#2ea2d8]/20 text-[#2ea2d8] border-[#2ea2d8]/30';
  if (status === 'Cancelled') return 'bg-red-500/20 text-red-400 border-red-500/30';
  return 'bg-white/10 text-slate-300 border-white/10';
}

export default function MyBookingsPage() {
  const { bookings } = useAuth();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return bookings;
    return bookings.filter(b => b.status === activeFilter);
  }, [bookings, activeFilter]);

  return (
    <DashboardShell title="My Bookings" subtitle="Track and manage all your travel bookings.">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              activeFilter === filter
                ? 'bg-[#2ea2d8] text-white'
                : 'border border-white/20 bg-white/10 text-slate-300 hover:border-white/40'
            }`}
          >
            {filter}
            {filter !== 'All' && (
              <span className="ml-1.5 opacity-60">
                ({bookings.filter(b => b.status === filter).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bookings list */}
      {filtered.length === 0 ? (
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center">
          <svg className="mx-auto text-slate-600 mb-4" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
          <p className="text-slate-400 text-sm">
            {activeFilter === 'All' ? 'No bookings yet. Start by booking a trip!' : `No ${activeFilter.toLowerCase()} bookings.`}
          </p>
          {activeFilter === 'All' && (
            <Link
              href="/book"
              className="mt-4 inline-flex rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Book a Trip
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(booking => (
            <Link key={booking.id} href={`/dashboard/bookings/${booking.id}`}>
              <BorderGlow
                edgeSensitivity={20}
                glowColor="200 90 70"
                backgroundColor="#0f1115"
                borderRadius={22}
                glowRadius={22}
                glowIntensity={0.7}
                coneSpread={30}
                animated={false}
                colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
              >
                <div className="p-5 cursor-pointer">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-[240px]">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">{booking.id}</span>
                      </div>

                      {/* Services booked */}
                      <div className="space-y-2">
                        {booking.hotel && (
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs">🏨</span>
                            <div>
                              <p className="text-sm font-semibold text-slate-100">{booking.hotel.name}</p>
                              <p className="text-xs text-slate-400">
                                {booking.hotel.room} • {booking.hotel.nights} night{booking.hotel.nights !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                        )}
                        {booking.flight && (
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs">✈️</span>
                            <div>
                              <p className="text-sm font-semibold text-slate-100">{booking.flight.from} → {booking.flight.to}</p>
                              <p className="text-xs text-slate-400">{booking.flight.airline} • {booking.flight.time}</p>
                            </div>
                          </div>
                        )}
                        {booking.guide && (
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs">🧭</span>
                            <div>
                              <p className="text-sm font-semibold text-slate-100">{booking.guide.name}</p>
                              <p className="text-xs text-slate-400">{booking.guide.city} • {booking.guide.focus}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 mt-3">
                        Booked on {new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-2xl font-bold text-slate-100">${booking.totalAmount?.toLocaleString()}</p>
                      <p className="text-xs text-slate-400">Total paid</p>
                      {booking.review && (
                        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#fbbf24]/20 px-3 py-1 text-xs font-semibold text-[#fbbf24]">
                          ★ Reviewed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </Link>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
