

import image1 from "./assets/image1.jpeg";
import image2 from "./assets/image2.jpeg";
import image3 from "./assets/image3.jpeg";
import image4 from "./assets/image4.jpeg";

import image5 from "./assets/image5.jpeg";
import image6 from "./assets/image6.jpeg";

export const products = [
  {
    id: 1,
    slug: "ikky-tote",
    name: "ikky Tote",
    collection: "Ikky",
    price: 13,
    oldPrice: 620,
    rating: 5,
    reviews: 124,
    badges: ["NEW", "SALE"],
    colors: ["#1a1a1a", "#5a3e2b", "#e8500e"],
    image: image1,
    featured: true,
  },
  {
    id: 2,
    slug: "sonia-crossbody",
    name: "sonia Crossbody",
    collection: "sonia",
    price: 29,
    oldPrice: null,
    rating: 5,
    reviews: 89,
    badges: ["BESTSELLER"],
    colors: ["#e8500e", "#1a1a1a", "#c9a574"],
    image: image2,
    featured: true,
  },
  {
    id: 3,
    slug: "leelah-clutch",
    name: "leelah Clutch",
    collection: "leelah",
    price: 195,
    oldPrice: null,
    rating: 5,
    reviews: 56,
    badges: [],
    colors: ["#1a1a1a", "#3a3a3a"],
    image: image3,
    featured: true,
  },
  {
    id: 4,
    slug: "izza-shoulder",
    name: "izza Shoulder",
    collection: "izza",
    price: 340, // placeholder — update to match your design
    oldPrice: null,
    rating: 5,
    reviews: 42, // placeholder
    badges: ["NEW"],
    colors: ["#e8500e", "#1a1a1a"],
    image: image4,
    featured: true,
  },
  {
    id: 5,
    slug: "Enny-shoulder",
    name: "Enny Shoulder",
    collection: "Enny",
    price: 340, // placeholder — update to match your design
    oldPrice: null,
    rating: 5,
    reviews: 42, // placeholder
    badges: ["NEW"],
    colors: ["#e8500e", "#1a1a1a"],
    image: image4,
    featured: true,
  },
  {
    id: 6,
    slug: " muiz shoulder",
    name: "muiz Shoulder",
    collection: "muiz",
    price: 340, // placeholder — update to match your design
    oldPrice: null,
    rating: 5,
    reviews: 42, // placeholder
    badges: ["NEW"],
    colors: ["#e8500e", "#1a1a1a"],
    image: image4,
    featured: true,
  },
  {
    id: 7,
    slug: "Beebah shoulder",
    name: "Beebah Shoulder",
    collection: "Ember",
    price: 340, // placeholder — update to match your design
    oldPrice: null,
    rating: 5,
    reviews: 42, // placeholder
    badges: ["NEW"],
    colors: ["#e8500e", "#1a1a1a"],
    image: image4,
    featured: true,
  },
];

export const collections = [
  {
    id: "Nimah",
    name: "Nimah",
    image: image5,
    to: "/collections/Nimah",
  },
  {
    id: "noir",
    name: "Noir",
    image: image6,
    to: "/collections/noir",
  },
];




export const shopCollection = [
  {
    id: "noir",
    name: "Noir",
    tagline: "For the woman who speaks in contrasts.",
    image: image1,
  },
  {
    id: "ember",
    name: "Ember",
    tagline: "Warm, confident, alive.",
    image: image2,
  },
  {
    id: "solstice",
    name: "Solstice",
    tagline: "Structured luxury at its peak.",
    image: image3,
  },
];










export const STAGES = [
  { key: "placed", label: "Order Placed" },
  { key: "processing", label: "Being Crafted & Packed" },
  { key: "shipped", label: "Shipped" },
  { key: "out", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];
 
// `stage` is the index in STAGES the order has reached.
// `history` holds the date/place text for each stage already reached.
export const orders = [
  {
    id: "ARIA-2026-8841",
    trackingNumber: "DHL-5520019384", // PLACEHOLDER
    carrier: "DHL Express",
    stage: 2, // shipped
    estimatedDelivery: "Tuesday, 20 October 2026",
    destination: "Lagos, Nigeria",
    items: [
      { productId: 1, qty: 1 },
      { productId: 2, qty: 1 },
    ],
    history: [
      { date: "12 Oct 2026, 10:14", note: "We received your order." },
      { date: "13 Oct 2026, 16:40", note: "Your bag was finished and packed by hand." },
      { date: "15 Oct 2026, 09:05", note: "Handed to DHL Express. On its way." },
    ],
  },
];
 
// Matches the ARIA order ID or the carrier tracking number, ignoring case/spaces
export function findOrder(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return null;
 
  return (
    orders.find(
      (order) =>
        order.id.toLowerCase() === needle || order.trackingNumber.toLowerCase() === needle
    ) || null
  );
}
 