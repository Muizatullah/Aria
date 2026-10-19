

const defaults = {
  description:
    "Cut from full-grain Italian leather and finished by hand, this piece moves seamlessly from boardroom to evening.",
  dimensions: `12"W × 9"H × 4"D`,
  material: "Full-grain Italian leather, brass hardware",
  fits: ["Phone", "Wallet", "Keys", "Sunglasses", "Small cosmetics pouch"],
  care: [
    "Wipe with a soft, dry cloth.",
    "Keep away from direct heat and prolonged sunlight.",
    "Store in the dust bag provided.",
    "Condition with leather balm twice a year.",
  ],
};

export const productExtras = {
  "obsidian-tote": {
    description:
      "The Obsidian Tote is our flagship carry-all — structured yet supple, commanding yet refined. Cut from full-grain Italian leather with a suede interior, it moves seamlessly from boardroom to evening.",
    dimensions: `14"W × 11"H × 5"D`,
    material: "Full-grain Italian leather, brass hardware",
    fits: ['13" laptop', "Tablet", "Wallet", "Phone", "Keys", "Water bottle"],
  },
  "ember-crossbody": { dimensions: `9"W × 6"H × 3"D` },
  "umbra-clutch": { dimensions: `10"W × 6"H × 2"D`, fits: ["Phone", "Cards", "Lipstick", "Keys"] },
};

// Colour names for the swatches (hex -> label)
export const colorNames = {
  "#1a1a1a": "Onyx",
  "#5a3e2b": "Chestnut",
  "#e8500e": "Ember",
  "#c9a574": "Sand",
  "#3a3a3a": "Graphite",
  "#7a1f2b": "Garnet",
  "#1f2a44": "Midnight",
};

export const getExtras = (slug) => ({ ...defaults, ...(productExtras[slug] || {}) });

// Sample reviews copied from your design (shown on every product for now).
// TODO: load real reviews per product from your backend.
export const sampleReviews = [
  { name: "Foyinsola K.", date: "Sep 12, 2026", rating: 5, text: "The Obsidian Tote is hands-down the most beautiful bag I've ever owned. Gets compliments every single day. Worth every penny and more." },
  { name: "Ayomide M.", date: "Sep 8, 2026", rating: 5, text: "I was nervous ordering online but the packaging alone made me feel like I'd walked into a luxury boutique. The Ember Crossbody is perfect — compact but fits everything." },
  { name: "Helen S.", date: "Aug 29, 2026", rating: 5, text: "ARIA's craftsmanship is unreal. I can see every stitch is intentional. This is not fast fashion — this is an heirloom you'll pass down." },
  { name: "Leila B.", date: "Aug 15, 2026", rating: 4, text: "Absolutely stunning quality. The leather has this beautiful texture that only gets better with time. The orange hardware is chef's kiss." },
];