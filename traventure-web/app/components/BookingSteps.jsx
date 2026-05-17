'use client';
import BorderGlow from './BorderGlow';
import { hotelsData, flightsData, guidesData } from '../data/constants';
import { useState } from 'react';

function formatDate(date) { return date.toISOString().split('T')[0]; }
function addDays(ds, d) { const dt = new Date(ds); dt.setDate(dt.getDate() + d); return formatDate(dt); }
function calcNights(ci, co) { const d = Math.ceil((new Date(co) - new Date(ci)) / 86400000); return d > 0 ? d : 1; }
function addMinutes(t, m) { const [h, min] = t.split(':').map(Number); const total = ((h * 60 + min + m) % 1440 + 1440) % 1440; return `${String(Math.floor(total / 60)).padStart(2,'0')}:${String(total % 60).padStart(2,'0')}`; }

export function StepServices({ services, setServices }) {
  const items = [
    { key: 'hotel', label: 'Hotel', icon: '🏨', desc: 'Find curated stays worldwide' },
    { key: 'flight', label: 'Flight', icon: '✈️', desc: 'Compare routes and fares' },
    { key: 'guide', label: 'Tour Guide', icon: '🧭', desc: 'Local experts for your trip' },
  ];
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">What would you like to book?</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map(item => (
          <BorderGlow key={item.key} edgeSensitivity={25} glowColor="200 90 70" backgroundColor="#0f1115" borderRadius={22} glowRadius={22} glowIntensity={0.8} coneSpread={30} animated={false} colors={['#2ea2d8','#fbbf24','#38bdf8']}>
            <button type="button" onClick={() => setServices(p => ({ ...p, [item.key]: !p[item.key] }))}
              className={`w-full p-6 text-left transition ${services[item.key] ? 'ring-2 ring-[#2ea2d8] rounded-[22px]' : ''}`}>
              <span className="text-3xl">{item.icon}</span>
              <p className="mt-3 text-sm font-semibold text-slate-100">{item.label}</p>
              <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
              {services[item.key] && <span className="mt-3 inline-flex rounded-full bg-[#2ea2d8]/20 px-3 py-1 text-xs font-semibold text-[#2ea2d8]">Selected</span>}
            </button>
          </BorderGlow>
        ))}
      </div>
    </div>
  );
}

export function StepSelection({ services, selections, setSelections }) {
  const today = formatDate(new Date());
  const tomorrow = addDays(today, 1);
  const [hotelSearch, setHotelSearch] = useState('');
  const [flightSearch, setFlightSearch] = useState('');

  const filteredHotels = hotelsData.filter(h => h.name.toLowerCase().includes(hotelSearch.toLowerCase()) || h.location.toLowerCase().includes(hotelSearch.toLowerCase()));
  const filteredFlights = flightsData.filter(f => {
    if (!flightSearch) return true;
    const q = flightSearch.toLowerCase();
    return f.from.toLowerCase().includes(q) || f.to.toLowerCase().includes(q) || f.airline.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8">
      {services.hotel && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">Select a Hotel</p>
          <input type="text" placeholder="Search hotels..." value={hotelSearch} onChange={e => setHotelSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none mb-4 focus:border-[#2ea2d8] transition" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
            {filteredHotels.map(hotel => (
              <div key={hotel.slug} onClick={() => setSelections(p => ({ ...p, hotel: { ...hotel, room: hotel.rooms[0], checkIn: p.hotel?.checkIn || today, checkOut: p.hotel?.checkOut || tomorrow, guests: p.hotel?.guests || 2, rooms: hotel.rooms, roomCount: p.hotel?.roomCount || 1 } }))}
                className={`rounded-2xl border p-4 cursor-pointer transition ${selections.hotel?.slug === hotel.slug ? 'border-[#2ea2d8] bg-[#2ea2d8]/10' : 'border-white/10 bg-[#0f1115] hover:bg-white/5'}`}>
                <img src={hotel.image} alt={hotel.name} className="h-32 w-full rounded-xl object-cover" />
                <p className="mt-3 text-sm font-semibold text-slate-100">{hotel.name}</p>
                <p className="text-xs text-slate-400">{hotel.location}</p>
                <p className="text-xs text-[#2ea2d8] font-semibold mt-1">From ${hotel.price}/night</p>
              </div>
            ))}
          </div>
          {selections.hotel && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2ea2d8]">Room & Stay Details</p>
              {/* Room type */}
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2 block">Room Type</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(selections.hotel.rooms || []).map(room => (
                    <button key={room.name} type="button" onClick={() => setSelections(p => ({ ...p, hotel: { ...p.hotel, room } }))}
                      className={`rounded-xl border p-3 text-left text-sm transition ${selections.hotel.room?.name === room.name ? 'border-[#2ea2d8] bg-[#2ea2d8]/10' : 'border-white/10 bg-black/30 hover:bg-black/50'}`}>
                      <p className="font-semibold text-slate-100">{room.name}</p>
                      <p className="text-xs text-slate-400">{room.desc}</p>
                      <p className="text-xs text-[#2ea2d8] font-semibold mt-1">${room.price}/night</p>
                    </button>
                  ))}
                </div>
              </div>
              {/* Dates */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1 block">Check in</label>
                  <input type="date" min={today} value={selections.hotel.checkIn || today}
                    onChange={e => { const v = e.target.value; setSelections(p => ({ ...p, hotel: { ...p.hotel, checkIn: v, checkOut: p.hotel.checkOut <= v ? addDays(v,1) : p.hotel.checkOut } })); }}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none [color-scheme:dark]" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1 block">Check out</label>
                  <input type="date" min={addDays(selections.hotel.checkIn || today, 1)} value={selections.hotel.checkOut || tomorrow}
                    onChange={e => setSelections(p => ({ ...p, hotel: { ...p.hotel, checkOut: e.target.value } }))}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none [color-scheme:dark]" />
                </div>
              </div>
              {/* Guests & Rooms */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1 block">Guests</label>
                  <select value={selections.hotel.guests || 2} onChange={e => setSelections(p => ({ ...p, hotel: { ...p.hotel, guests: Number(e.target.value) } }))}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-[#0f1115]">{n} {n===1?'Guest':'Guests'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1 block">Rooms</label>
                  <select value={selections.hotel.roomCount || 1} onChange={e => setSelections(p => ({ ...p, hotel: { ...p.hotel, roomCount: Number(e.target.value) } }))}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none">
                    {[1,2,3,4,5].map(n => <option key={n} value={n} className="bg-[#0f1115]">{n} {n===1?'Room':'Rooms'}</option>)}
                  </select>
                </div>
              </div>
              {/* Summary line */}
              <div className="rounded-xl border border-white/10 bg-black/30 p-3 flex items-center justify-between text-sm">
                <span className="text-slate-400">{calcNights(selections.hotel.checkIn||today, selections.hotel.checkOut||tomorrow)} night{calcNights(selections.hotel.checkIn||today, selections.hotel.checkOut||tomorrow)!==1?'s':''} × {selections.hotel.roomCount||1} room{(selections.hotel.roomCount||1)!==1?'s':''} × ${selections.hotel.room?.price||0}/night</span>
                <span className="font-semibold text-emerald-300">${calcNights(selections.hotel.checkIn||today, selections.hotel.checkOut||tomorrow) * (selections.hotel.roomCount||1) * (selections.hotel.room?.price||0)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {services.flight && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">Select a Flight</p>
          <input type="text" placeholder="Search by city or airline..." value={flightSearch} onChange={e => setFlightSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none mb-4 focus:border-[#2ea2d8] transition" />
          {/* Trip type, passengers, class, dates */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-4 space-y-4">
            <div className="flex flex-wrap gap-3">
              <select value={selections.flightType || 'One way'} onChange={e => setSelections(p => ({ ...p, flightType: e.target.value }))}
                className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-slate-100 outline-none font-semibold">
                <option value="One way" className="bg-[#0f1115]">One way</option>
                <option value="Round trip" className="bg-[#0f1115]">Round trip</option>
              </select>
              <select value={selections.flightPassengers || 1} onChange={e => setSelections(p => ({ ...p, flightPassengers: Number(e.target.value) }))}
                className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-slate-100 outline-none">
                {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="bg-[#0f1115]">{n} {n===1?'Passenger':'Passengers'}</option>)}
              </select>
              <select value={selections.flightClass || 'Economy'} onChange={e => setSelections(p => ({ ...p, flightClass: e.target.value }))}
                className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-slate-100 outline-none">
                {['Economy','Business','First Class'].map(c => <option key={c} value={c} className="bg-[#0f1115]">{c}</option>)}
              </select>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1 block">Departure Date</label>
                <input type="date" min={today} value={selections.flightDepartDate || today}
                  onChange={e => { const v = e.target.value; setSelections(p => ({ ...p, flightDepartDate: v, flightReturnDate: (p.flightReturnDate && p.flightReturnDate <= v) ? addDays(v,1) : (p.flightReturnDate || addDays(v,1)) })); }}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none [color-scheme:dark]" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1 block">Return Date</label>
                <input type="date" min={addDays(selections.flightDepartDate || today, 1)} value={selections.flightReturnDate || tomorrow}
                  onChange={e => setSelections(p => ({ ...p, flightReturnDate: e.target.value }))}
                  disabled={(selections.flightType || 'One way') !== 'Round trip'}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none [color-scheme:dark] disabled:opacity-40" />
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            {filteredFlights.map(flight => {
              const classM = selections.flightClass === 'Business' ? 1.6 : selections.flightClass === 'First Class' ? 2.2 : 1;
              const tripM = (selections.flightType || 'One way') === 'Round trip' ? 1.85 : 1;
              const pax = selections.flightPassengers || 1;
              const price = Math.round(flight.price * classM * tripM * pax);
              const isRound = (selections.flightType || 'One way') === 'Round trip';
              return (
                <div key={flight.id} onClick={() => setSelections(p => ({ ...p, flight }))}
                  className={`rounded-2xl border p-4 cursor-pointer transition ${selections.flight?.id === flight.id ? 'border-[#2ea2d8] bg-[#2ea2d8]/10' : 'border-white/10 bg-[#0f1115] hover:bg-white/5'}`}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1 min-w-[240px] space-y-3">
                      <p className="text-sm font-bold text-slate-100">{flight.airline}</p>
                      {/* Outbound */}
                      <div className="grid items-center gap-4" style={{gridTemplateColumns:'100px 1fr 100px'}}>
                        <div><p className="text-base font-bold text-slate-100 tabular-nums">{flight.departure}</p><p className="text-xs text-slate-400">{flight.from}</p></div>
                        <div className="flex flex-col items-center"><div className="w-full relative flex items-center justify-center"><div className="absolute w-full h-[1px] bg-white/20" /><span className="z-10 bg-[#0f1115] px-2 text-[10px] uppercase tracking-[0.3em] text-slate-500">{selections.flightDepartDate || today}</span></div><p className="text-xs text-slate-400 mt-1">{flight.time} • {flight.stops}</p></div>
                        <div className="text-right"><p className="text-base font-bold text-slate-100 tabular-nums">{flight.arrival}</p><p className="text-xs text-slate-400">{flight.to}</p></div>
                      </div>
                      {/* Return leg */}
                      {isRound && (
                        <div className="grid items-center gap-4" style={{gridTemplateColumns:'100px 1fr 100px'}}>
                          <div><p className="text-base font-bold text-slate-100 tabular-nums">{addMinutes(flight.departure, 150)}</p><p className="text-xs text-slate-400">{flight.to}</p></div>
                          <div className="flex flex-col items-center"><div className="w-full relative flex items-center justify-center"><div className="absolute w-full h-[1px] bg-white/20" /><span className="z-10 bg-[#0f1115] px-2 text-[10px] uppercase tracking-[0.3em] text-slate-500">{selections.flightReturnDate || tomorrow}</span></div><p className="text-xs text-slate-400 mt-1">{flight.time} • {flight.stops}</p></div>
                          <div className="text-right"><p className="text-base font-bold text-slate-100 tabular-nums">{addMinutes(flight.arrival, 180)}</p><p className="text-xs text-slate-400">{flight.from}</p></div>
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0 sm:border-l border-white/10 sm:pl-5">
                      <p className="text-xl font-bold text-slate-100">${price}</p>
                      <p className="text-xs text-slate-400">{pax} pax • {selections.flightClass || 'Economy'}</p>
                      {isRound && <p className="text-xs text-emerald-300 font-semibold mt-1">Round trip</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {services.guide && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">Select a Guide</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guidesData.map(guide => (
              <div key={guide.id} onClick={() => setSelections(p => ({ ...p, guide }))}
                className={`rounded-2xl border p-4 cursor-pointer transition ${selections.guide?.id === guide.id ? 'border-[#2ea2d8] bg-[#2ea2d8]/10' : 'border-white/10 bg-[#0f1115] hover:bg-white/5'}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{guide.city}</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">{guide.name}</p>
                <p className="text-xs text-slate-400">{guide.focus}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-300">{guide.rating} star</span>
                  <span className="text-xs font-semibold text-[#2ea2d8]">${guide.price}/session</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function StepReview({ selections, services, traveler, setTraveler }) {
  const p = calcPricing(selections);
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Traveler Information</p>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 grid gap-4">
          {[{k:'name',l:'Full Name',t:'text',ph:'Your full name'},{k:'email',l:'Email',t:'email',ph:'you@email.com'},{k:'phone',l:'Phone',t:'tel',ph:'+1 (555) 000-0000'},{k:'requests',l:'Special Requests',t:'text',ph:'Any special requirements...'}].map(f => (
            <div key={f.k} className="grid gap-1">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{f.l}</label>
              <input type={f.t} value={traveler[f.k]} onChange={e => setTraveler(prev => ({...prev,[f.k]:e.target.value}))} placeholder={f.ph}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition" />
            </div>
          ))}
        </div>
        {selections.hotel && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">Hotel</p>
            <p className="text-sm font-semibold text-slate-100">{selections.hotel.name} — {selections.hotel.room?.name}</p>
            <p className="text-xs text-slate-400">{selections.hotel.location} • {p.nights} night{p.nights!==1?'s':''} • {selections.hotel.roomCount||1} room{(selections.hotel.roomCount||1)!==1?'s':''} • {selections.hotel.guests||2} guest{(selections.hotel.guests||2)!==1?'s':''}</p>
            <p className="text-xs text-slate-400">{selections.hotel.checkIn} → {selections.hotel.checkOut}</p>
          </div>
        )}
        {selections.flight && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">Flight{(selections.flightType||'One way')==='Round trip'?' (Round Trip)':''}</p>
            <p className="text-sm font-semibold text-slate-100">{selections.flight.from} → {selections.flight.to}</p>
            {(selections.flightType||'One way')==='Round trip' && <p className="text-sm font-semibold text-slate-100">{selections.flight.to} → {selections.flight.from} (return)</p>}
            <p className="text-xs text-slate-400">{selections.flight.airline} • {selections.flight.time} • {selections.flightPassengers||1} passenger{(selections.flightPassengers||1)!==1?'s':''} • {selections.flightClass||'Economy'}</p>
            <p className="text-xs text-slate-400">Depart: {selections.flightDepartDate || 'TBD'}{(selections.flightType||'One way')==='Round trip' ? ` • Return: ${selections.flightReturnDate || 'TBD'}` : ''}</p>
          </div>
        )}
        {selections.guide && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">Tour Guide</p>
            <p className="text-sm font-semibold text-slate-100">{selections.guide.name} — {selections.guide.city}</p>
            <p className="text-xs text-slate-400">{selections.guide.focus}</p>
          </div>
        )}
      </div>
      <BorderGlow edgeSensitivity={20} glowColor="200 90 70" backgroundColor="#0f1115" borderRadius={24} glowRadius={24} glowIntensity={1} coneSpread={30} animated={false} colors={['#2ea2d8','#fbbf24','#38bdf8']}>
        <div className="p-6">
          <p className="text-sm font-semibold text-[#2ea2d8] uppercase tracking-widest mb-4">Price Breakdown</p>
          <div className="space-y-3 text-sm">
            {selections.hotel && <div className="flex justify-between"><span className="text-slate-400">Hotel ({p.nights}n × {selections.hotel.roomCount||1}r)</span><span className="text-slate-200 font-semibold">${p.hotelCost}</span></div>}
            {selections.flight && <div className="flex justify-between"><span className="text-slate-400">Flight ({selections.flightPassengers||1} pax{(selections.flightType||'One way')==='Round trip'?' • RT':''})</span><span className="text-slate-200 font-semibold">${p.flightCost}</span></div>}
            {selections.guide && <div className="flex justify-between"><span className="text-slate-400">Guide</span><span className="text-slate-200 font-semibold">${p.guideCost}</span></div>}
            <div className="h-px bg-white/10" />
            <div className="flex justify-between"><span className="text-slate-400">Subtotal</span><span className="text-slate-200">${p.subtotal}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Taxes (12%)</span><span className="text-slate-200">${p.taxes}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Service Fee (5%)</span><span className="text-slate-200">${p.serviceFee}</span></div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between"><span className="font-semibold text-slate-100">Total</span><span className="text-2xl font-bold text-emerald-300">${p.total}</span></div>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}

export function StepPayment({ payment, setPayment }) {
  return (
    <div className="mx-auto max-w-lg">
      <BorderGlow edgeSensitivity={25} glowColor="200 90 70" backgroundColor="#0f1115" borderRadius={28} glowRadius={28} glowIntensity={0.8} coneSpread={30} animated={false} colors={['#2ea2d8','#fbbf24','#38bdf8']}>
        <div className="p-6 space-y-5">
          <p className="text-sm font-semibold text-[#2ea2d8] uppercase tracking-widest">Payment Details</p>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Cardholder Name</label>
              <input type="text" value={payment.name} onChange={e => setPayment(p => ({...p, name: e.target.value}))} placeholder="Name on card"
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition" />
            </div>
            <div className="grid gap-1">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Card Number</label>
              <input type="text" value={payment.number} onChange={e => setPayment(p => ({...p, number: e.target.value.replace(/[^0-9 ]/g,'').slice(0,19)}))} placeholder="4242 4242 4242 4242"
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition font-mono tracking-widest" />
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className="grid gap-1">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Expiry</label>
                <input type="text" value={payment.expiry} onChange={e => setPayment(p => ({...p, expiry: e.target.value}))} placeholder="MM/YY" maxLength={5}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition" />
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">CVV</label>
                <input type="text" value={payment.cvv} onChange={e => setPayment(p => ({...p, cvv: e.target.value.replace(/\D/g,'').slice(0,4)}))} placeholder="123" maxLength={4}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 flex items-center gap-3">
            <svg className="text-emerald-400 shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <p className="text-xs text-slate-400">Your payment is encrypted and secure. This is a demo — no real charges will be made.</p>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}

export function calcPricing(selections) {
  const nights = selections.hotel ? calcNights(selections.hotel.checkIn, selections.hotel.checkOut) : 0;
  const roomCount = selections.hotel?.roomCount || 1;
  const hotelCost = selections.hotel ? (selections.hotel.room?.price || 0) * nights * roomCount : 0;
  const classM = selections.flightClass === 'Business' ? 1.6 : selections.flightClass === 'First Class' ? 2.2 : 1;
  const tripM = (selections.flightType || 'One way') === 'Round trip' ? 1.85 : 1;
  const pax = selections.flightPassengers || 1;
  const flightCost = selections.flight ? Math.round(selections.flight.price * classM * tripM * pax) : 0;
  const guideCost = selections.guide?.price || 0;
  const subtotal = hotelCost + flightCost + guideCost;
  const taxes = Math.round(subtotal * 0.12);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + taxes + serviceFee;
  return { nights, roomCount, hotelCost, flightCost, guideCost, subtotal, taxes, serviceFee, total };
}
