'use client';

import Link from 'next/link';
import { useAuth } from '../components/AuthContext';
import DashboardShell from '../components/DashboardShell';
import BorderGlow from '../components/BorderGlow';

const quickActions = [
  {
    title: 'Book a Trip',
    desc: 'Hotels, flights, and guides in one flow',
    href: '/book',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    ),
  },
  {
    title: 'Browse Hotels',
    desc: 'Explore curated stays worldwide',
    href: '/hotels',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16"/><path d="M8 7h.01"/><path d="M16 7h.01"/><path d="M12 7h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/></svg>
    ),
  },
  {
    title: 'Search Flights',
    desc: 'Compare routes and best fares',
    href: '/flights',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
    ),
  },
  {
    title: 'Find a Guide',
    desc: 'Local experts for your destination',
    href: '/guides',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
  },
];

function getStatusColor(status) {
  if (status === 'Confirmed') return 'bg-emerald-500/20 text-emerald-300';
  if (status === 'Completed') return 'bg-[#2ea2d8]/20 text-[#2ea2d8]';
  if (status === 'Cancelled') return 'bg-red-500/20 text-red-400';
  return 'bg-white/10 text-slate-300';
}

export default function DashboardPage() {
  const { user, bookings } = useAuth();

  const upcoming = bookings.filter(b => b.status === 'Confirmed');
  const totalSpent = bookings
    .filter(b => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const stats = [
    { label: 'Total Bookings', value: bookings.length },
    { label: 'Upcoming Trips', value: upcoming.length },
    { label: 'Amount Spent', value: `$${totalSpent.toLocaleString()}` },
    { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Today' },
  ];

  return (
    <DashboardShell>
      {/* Welcome banner */}
      <div className="rounded-[28px] overflow-hidden relative border border-white/10 shadow-xl">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 p-8 sm:p-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 mb-4">
            Welcome back
          </p>
          <h1 className="font-display text-4xl tracking-wide text-white sm:text-5xl">
            Hello, {user?.name || 'Traveler'}
            <span className="block text-[#ffd24a]">Ready to explore?</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm text-white/80">
            Manage your trips, track upcoming stays, and book your next adventure — all from one place.
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <BorderGlow
            key={stat.label}
            edgeSensitivity={25}
            glowColor="200 90 70"
            backgroundColor="#0f1115"
            borderRadius={22}
            glowRadius={22}
            glowIntensity={0.8}
            coneSpread={30}
            animated={false}
            colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
          >
            <div className="p-5">
              <p className="text-2xl font-semibold text-slate-100">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mt-1">{stat.label}</p>
            </div>
          </BorderGlow>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">Quick actions</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map(action => (
            <Link key={action.href} href={action.href}>
              <BorderGlow
                edgeSensitivity={25}
                glowColor="200 90 70"
                backgroundColor="#0f1115"
                borderRadius={22}
                glowRadius={22}
                glowIntensity={0.8}
                coneSpread={30}
                animated={false}
                colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
              >
                <div className="p-5 cursor-pointer group">
                  <span className="text-[#2ea2d8] group-hover:text-[#fbbf24] transition">{action.icon}</span>
                  <p className="mt-3 text-sm font-semibold text-slate-100">{action.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{action.desc}</p>
                </div>
              </BorderGlow>
            </Link>
          ))}
        </div>
      </div>

      {/* Upcoming bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Recent bookings</p>
          {bookings.length > 0 && (
            <Link href="/dashboard/bookings" className="text-sm font-semibold text-[#2ea2d8]">
              View all
            </Link>
          )}
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-slate-400 text-sm">You have no bookings yet.</p>
            <Link
              href="/book"
              className="mt-4 inline-flex rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Book your first trip
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.slice(0, 3).map(booking => (
              <Link key={booking.id} href={`/dashboard/bookings/${booking.id}`}>
                <div className="rounded-2xl border border-white/10 bg-[#0f1115] p-5 flex flex-wrap items-center justify-between gap-4 transition hover:bg-white/5 cursor-pointer">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      <span className="text-xs text-slate-500">{booking.id}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-100">
                      {[
                        booking.hotel && `🏨 ${booking.hotel.name}`,
                        booking.flight && `✈️ ${booking.flight.from} → ${booking.flight.to}`,
                        booking.guide && `🧭 ${booking.guide.name}`,
                      ].filter(Boolean).join('  •  ')}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Booked {new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-slate-100">${booking.totalAmount?.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">Total</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
