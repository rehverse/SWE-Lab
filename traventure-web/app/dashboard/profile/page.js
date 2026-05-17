'use client';

import { useState } from 'react';
import { useAuth } from '../../components/AuthContext';
import DashboardShell from '../../components/DashboardShell';
import BorderGlow from '../../components/BorderGlow';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    passport: user?.passport || '',
    nationality: user?.nationality || '',
  });

  const handleChange = (key) => (e) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields = [
    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com' },
    { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 000-0000' },
    { key: 'passport', label: 'Passport Number', type: 'text', placeholder: 'AB1234567' },
    { key: 'nationality', label: 'Nationality', type: 'text', placeholder: 'e.g. American' },
  ];

  return (
    <DashboardShell title="My Profile" subtitle="View and manage your personal information.">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Avatar card */}
        <BorderGlow
          edgeSensitivity={25}
          glowColor="200 90 70"
          backgroundColor="#0f1115"
          borderRadius={28}
          glowRadius={28}
          glowIntensity={0.8}
          coneSpread={30}
          animated={false}
          colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
        >
          <div className="p-8 flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#2ea2d8] text-3xl font-bold text-white shadow-lg">
              {user?.initials || '?'}
            </div>
            <p className="mt-4 text-xl font-semibold text-slate-100">{user?.name || 'Traveler'}</p>
            <p className="text-sm text-slate-400">{user?.email || ''}</p>
            <div className="mt-6 w-full space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Member since</p>
                <p className="text-sm font-semibold text-slate-200">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : 'Today'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Nationality</p>
                <p className="text-sm font-semibold text-slate-200">{user?.nationality || 'Not set'}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Passport</p>
                <p className="text-sm font-semibold text-slate-200">{user?.passport || 'Not set'}</p>
              </div>
            </div>
          </div>
        </BorderGlow>

        {/* Profile form */}
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-semibold text-[#2ea2d8] uppercase tracking-widest">Personal Details</p>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/40"
              >
                Edit
              </button>
            )}
          </div>

          {saved && (
            <div className="mb-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
              Profile updated successfully.
            </div>
          )}

          <form onSubmit={handleSave} className="grid gap-5">
            {fields.map(field => (
              <div key={field.key} className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={handleChange(field.key)}
                  placeholder={field.placeholder}
                  disabled={!editing}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#2ea2d8] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            ))}
            {editing && (
              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setForm({
                      name: user?.name || '',
                      email: user?.email || '',
                      phone: user?.phone || '',
                      passport: user?.passport || '',
                      nationality: user?.nationality || '',
                    });
                  }}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
