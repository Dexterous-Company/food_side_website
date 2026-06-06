// Dummy Data
export const BANNERS = [
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=900",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900",
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=900",
];

export const DUMMY_DESTINATIONS = [
  { id: "dest-1", name: "Hyderabad Central", loc: "Hyderabad, Telangana", routes: 4 },
  { id: "dest-2", name: "Vijayawada Bus Stand", loc: "Vijayawada, Andhra Pradesh", routes: 3 },
  { id: "dest-3", name: "Guntur City", loc: "Guntur, Andhra Pradesh", routes: 2 },
  { id: "dest-4", name: "Nellore Junction", loc: "Nellore, Andhra Pradesh", routes: 2 },
  { id: "dest-5", name: "Ongole Town", loc: "Ongole, Andhra Pradesh", routes: 1 },
];

export const DUMMY_ROUTES = [
  {
    id: "R1",
    name: "Express Highway Route",
    origin: "Hyderabad, Telangana",
    destination: "Vijayawada, AP",
    distanceKm: 274,
    durationMinutes: 270,
    stops: 6,
    deliveryPointCount: 8,
  },
  {
    id: "R2",
    name: "NH-65 Direct Route",
    origin: "Hyderabad, Telangana",
    destination: "Vijayawada, AP",
    distanceKm: 290,
    durationMinutes: 310,
    stops: 4,
    deliveryPointCount: 5,
  },
  {
    id: "R3",
    name: "Coastal Highway Route",
    origin: "Hyderabad, Telangana",
    destination: "Vijayawada, AP",
    distanceKm: 310,
    durationMinutes: 345,
    stops: 9,
    deliveryPointCount: 12,
  },
];

export const DUMMY_DELIVERY_POINTS = [
  { id: "D1", name: "Krishna Shopping Complex", area: "MG Road", city: "Vijayawada", state: "Andhra Pradesh" },
  { id: "D2", name: "Benz Circle Pick-up Hub", area: "Benz Circle", city: "Vijayawada", state: "Andhra Pradesh" },
  { id: "D3", name: "One Town Delivery Point", area: "One Town", city: "Vijayawada", state: "Andhra Pradesh" },
  { id: "D4", name: "Gandhi Nagar Collection Center", area: "Gandhi Nagar", city: "Vijayawada", state: "Andhra Pradesh" },
];

export const STEPS = ["Select Towards", "Select Route", "Select Delivery Point", "Complete Details"];

// Helpers
export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatDate(date) {
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatTime(date) {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}