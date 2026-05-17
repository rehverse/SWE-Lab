// Shared data constants for the booking flow
// Same data as used in the guest-facing pages

export const destinationImages = {
  Bali: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  Lisbon: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80',
  Kyoto: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  Reykjavik: 'https://images.unsplash.com/photo-1500043357865-c6b8827edf10?auto=format&fit=crop&w=1200&q=80',
  Marrakesh: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=1200&q=80',
  Sicily: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  Paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  CapeTown: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
  Seoul: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80',
  Lima: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
};

export const hotelsData = [
  {
    slug: 'coral-dune-retreat',
    name: 'Coral Dune Retreat',
    location: 'Bali, Indonesia',
    description: 'Oceanfront suites with shaded terraces, sunrise yoga, and private lagoon access.',
    price: 182,
    rating: 4.9,
    image: destinationImages.Bali,
    rooms: [
      { name: 'King Deluxe', desc: 'Sleeps 2 • Ocean view', price: 212 },
      { name: 'Sunset Suite', desc: 'Sleeps 3 • Balcony', price: 268 },
      { name: 'Lagoon Villa', desc: 'Sleeps 4 • Private pool', price: 325 },
    ],
  },
  {
    slug: 'harborlight-suites',
    name: 'Harborlight Suites',
    location: 'Lisbon, Portugal',
    description: 'Boutique rooms overlooking the Tagus River with rooftop dining and tram access.',
    price: 139,
    rating: 4.8,
    image: destinationImages.Lisbon,
    rooms: [
      { name: 'Twin Bed Loft', desc: 'Sleeps 2 • City view', price: 152 },
      { name: 'River King', desc: 'Sleeps 2 • River view', price: 198 },
      { name: 'Family Studio', desc: 'Sleeps 4 • Sofa bed', price: 236 },
    ],
  },
  {
    slug: 'sage-stone-lodge',
    name: 'Sage & Stone Lodge',
    location: 'Marrakesh, Morocco',
    description: 'A serene riad-style lodge with courtyard pools, lantern-lit lounges, and spa rituals.',
    price: 211,
    rating: 4.7,
    image: destinationImages.Marrakesh,
    rooms: [
      { name: 'Courtyard King', desc: 'Sleeps 2 • Riad view', price: 228 },
      { name: 'Twin Bed Terrace', desc: 'Sleeps 2 • Terrace', price: 246 },
      { name: 'Riad Family Suite', desc: 'Sleeps 4 • Two rooms', price: 312 },
    ],
  },
  {
    slug: 'northwind-cabin',
    name: 'Northwind Cabin',
    location: 'Reykjavik, Iceland',
    description: 'Glass-roof cabins with aurora wakeup calls, geothermal dips, and Arctic breakfasts.',
    price: 165,
    rating: 4.8,
    image: destinationImages.Reykjavik,
    rooms: [
      { name: 'Aurora Queen', desc: 'Sleeps 2 • Glass roof', price: 182 },
      { name: 'Twin Bed Cabin', desc: 'Sleeps 2 • Fire pit', price: 194 },
      { name: 'Northern Suite', desc: 'Sleeps 3 • Hot tub', price: 255 },
    ],
  },
  {
    slug: 'citrus-bay-hotel',
    name: 'Citrus Bay Hotel',
    location: 'Sicily, Italy',
    description: 'Seaside rooms with citrus gardens, sunset aperitivos, and quick ferry access.',
    price: 154,
    rating: 4.6,
    image: destinationImages.Sicily,
    rooms: [
      { name: 'King Deluxe', desc: 'Sleeps 2 • Garden view', price: 172 },
      { name: 'Twin Bed Coast', desc: 'Sleeps 2 • Balcony', price: 186 },
      { name: 'Bay Family Suite', desc: 'Sleeps 4 • Two beds', price: 244 },
    ],
  },
  {
    slug: 'juniper-city-loft',
    name: 'Juniper City Loft',
    location: 'Kyoto, Japan',
    description: 'Minimalist lofts near Nishiki Market with tea rituals and curated artisan guides.',
    price: 196,
    rating: 4.9,
    image: destinationImages.Kyoto,
    rooms: [
      { name: 'Tatami King', desc: 'Sleeps 2 • Tatami mats', price: 214 },
      { name: 'Twin Bed Loft', desc: 'Sleeps 2 • City view', price: 206 },
      { name: 'Zen Corner Suite', desc: 'Sleeps 3 • Tea nook', price: 268 },
    ],
  },
];

export const flightsData = [
  { id: 1, from: 'New York (JFK)', to: 'Paris (CDG)', time: '7h 15m', departure: '22:00', arrival: '11:15', price: 428, airline: 'Air Solace', stops: 'Nonstop' },
  { id: 2, from: 'London (LHR)', to: 'Cape Town (CPT)', time: '11h 05m', departure: '18:30', arrival: '07:35', price: 589, airline: 'Skylink', stops: '1 Stop' },
  { id: 3, from: 'Singapore (SIN)', to: 'Seoul (ICN)', time: '6h 10m', departure: '09:00', arrival: '16:10', price: 311, airline: 'Aurora Air', stops: 'Nonstop' },
  { id: 4, from: 'Toronto (YYZ)', to: 'Lima (LIM)', time: '8h 45m', departure: '14:20', arrival: '23:05', price: 476, airline: 'NovaJet', stops: 'Nonstop' },
  { id: 5, from: 'Dubai (DXB)', to: 'Tokyo (HND)', time: '9h 50m', departure: '02:40', arrival: '17:30', price: 522, airline: 'Emirates', stops: 'Nonstop' },
  { id: 6, from: 'Sydney (SYD)', to: 'Auckland (AKL)', time: '3h 05m', departure: '11:15', arrival: '16:20', price: 249, airline: 'Qantas', stops: 'Nonstop' },
  { id: 7, from: 'Dhaka (DAC)', to: 'Kuala Lumpur (KUL)', time: '4h 00m', departure: '23:10', arrival: '05:10', price: 345, airline: 'AirAsia', stops: 'Nonstop' },
  { id: 8, from: 'Dhaka (DAC)', to: 'Kuala Lumpur (KUL)', time: '3h 55m', departure: '02:05', arrival: '08:00', price: 410, airline: 'Malaysia Airlines', stops: 'Nonstop' },
  { id: 9, from: 'Los Angeles (LAX)', to: 'Tokyo (HND)', time: '11h 20m', departure: '12:40', arrival: '17:10', price: 612, airline: 'Pacifica', stops: 'Nonstop' },
  { id: 10, from: 'Chicago (ORD)', to: 'Lisbon (LIS)', time: '8h 35m', departure: '19:55', arrival: '10:30', price: 455, airline: 'Atlantic Breeze', stops: '1 Stop' },
  { id: 11, from: 'Paris (CDG)', to: 'Reykjavik (KEF)', time: '3h 40m', departure: '07:20', arrival: '09:00', price: 298, airline: 'Nordic Air', stops: 'Nonstop' },
  { id: 12, from: 'Seoul (ICN)', to: 'Bangkok (BKK)', time: '5h 35m', departure: '21:10', arrival: '01:45', price: 339, airline: 'Lotus Sky', stops: 'Nonstop' },
];

export const guidesData = [
  { id: 'leila-b', name: 'Leila B.', city: 'Marrakesh', focus: 'Hidden riads & tea houses', rating: 4.95, price: 85 },
  { id: 'jonas-k', name: 'Jonas K.', city: 'Reykjavik', focus: 'Fjord trails & winter lights', rating: 4.9, price: 95 },
  { id: 'rina-s', name: 'Rina S.', city: 'Kyoto', focus: 'Temple mornings & artisan lanes', rating: 4.92, price: 78 },
  { id: 'mateo-r', name: 'Mateo R.', city: 'Lisbon', focus: 'Food markets & surf culture', rating: 4.88, price: 72 },
  { id: 'aya-m', name: 'Aya M.', city: 'Cairo', focus: 'Museum nights & river walks', rating: 4.86, price: 65 },
  { id: 'kai-l', name: 'Kai L.', city: 'Auckland', focus: 'Harbor hikes & cafe routes', rating: 4.84, price: 80 },
];
