

// import { products } from "../../data.js";


// const BAG_INFO = {
//   "obsidian-tote": {
//     tags: ["tote", "work", "office", "leather", "black", "travel"],
//     why: "roomy enough for a laptop and polished from desk to dinner.",
//   },
//   "ember-crossbody": {
//     tags: ["crossbody", "orange", "leather", "evening", "casual", "everyday"],
//     why: "hands-free, in our signature warm orange. Perfect for dinner or a day out.",
//   },
//   "umbra-clutch": {
//     tags: ["clutch", "evening", "black", "leather", "formal"],
//     why: "slim and sleek, made for evenings, weddings and special occasions.",
//   },
//   "solstice-shoulder": {
//     tags: ["shoulder", "orange", "leather", "casual", "everyday"],
//     why: "structured luxury that carries you through a busy day.",
//   },
//   "garnet-top-handle": {
//     tags: ["top handle", "work", "office", "leather", "red", "formal"],
//     why: "an elegant top handle with a rich red finish that commands attention.",
//   },
//   "midnight-backpack": {
//     tags: ["backpack", "work", "navy", "travel", "school", "commute"],
//     why: "a refined backpack for the commute, travel and long days.",
//   },
// };

// const tagsFor = (product) => [
//   ...(BAG_INFO[product.slug]?.tags || []),
//   ...(product.tags || []),
// ];

// // Words a shopper might type -> the product tags they point to
// const KEYWORDS = {
//   work: ["work"],
//   office: ["work"],
//   meeting: ["work"],
//   business: ["work"],
//   professional: ["work"],
//   laptop: ["work"],
//   corporate: ["work"],
//   commute: ["work", "commute"],
//   job: ["work"],
//   evening: ["evening"],
//   evenings: ["evening"],
//   night: ["evening"],
//   party: ["evening"],
//   dinner: ["evening"],
//   date: ["evening"],
//   wedding: ["evening", "formal"],
//   church: ["formal", "evening"],
//   formal: ["formal", "evening"],
//   event: ["evening"],
//   gala: ["evening", "formal"],
//   casual: ["casual"],
//   everyday: ["everyday"],
//   daily: ["everyday"],
//   weekend: ["casual"],
//   brunch: ["casual", "crossbody"],
//   travel: ["travel"],
//   trip: ["travel"],
//   school: ["school"],
//   campus: ["school"],
//   gift: ["leather"],
//   tote: ["tote"],
//   totes: ["tote"],
//   clutch: ["clutch"],
//   clutches: ["clutch"],
//   crossbody: ["crossbody"],
//   shoulder: ["shoulder"],
//   backpack: ["backpack"],
//   handle: ["top handle"],
//   orange: ["orange"],
//   ember: ["orange"],
//   bold: ["orange", "red"],
//   black: ["black"],
//   noir: ["black"],
//   classic: ["black"],
//   red: ["red"],
//   garnet: ["red"],
//   navy: ["navy"],
//   blue: ["navy"],
//   leather: ["leather"],
// };

// // Opening line, based on the first thing the shopper asked for
// const INTROS = {
//   work: "For the working day, these are polished and practical:",
//   evening: "For an evening out, these will make an entrance:",
//   formal: "For a formal occasion, I'd reach for these:",
//   casual: "For easy, everyday days, these are my favourites:",
//   everyday: "For everyday carrying, these are my favourites:",
//   travel: "For travel and long days, these are the ones:",
//   school: "For school and campus life, I'd suggest:",
//   orange: "A bold choice. These are our warmest pieces:",
//   red: "Rich and striking. Here's what I'd show you:",
//   black: "You can't go wrong with black. Here's what I'd show you:",
//   navy: "Quietly elegant. Here's what I'd show you:",
// };

// const GREETINGS = ["hi", "hello", "hey", "hiya", "good morning", "good afternoon", "good evening"];

// // "under $300", "below 400", "less than 350", "max $250"
// function findBudget(text) {
//   const match = text.match(
//     /(?:under|below|less than|max(?:imum)?|within|up to|budget(?: of)?)\s*\$?\s*(\d{2,5})/i
//   );
//   return match ? Number(match[1]) : null;
// }

// function findWantedTags(text) {
//   const lower = text.toLowerCase();
//   const wanted = [];

//   Object.entries(KEYWORDS).forEach(([word, tags]) => {
//     if (new RegExp(`\\b${word}\\b`).test(lower)) {
//       tags.forEach((tag) => {
//         if (!wanted.includes(tag)) wanted.push(tag);
//       });
//     }
//   });

//   return wanted;
// }

// // When we can't match, don't leave a dead end: show our most-loved bags
// function popularPicks(limit = 3) {
//   return [...products].sort((a, b) => b.reviews - a.reviews).slice(0, limit);
// }

// export function getReply(text) {
//   const lower = text.trim().toLowerCase();

//   if (GREETINGS.some((g) => lower === g || lower.startsWith(`${g} `))) {
//     return {
//       text: "Hello, welcome to ARIA. What are you shopping for? Tell me the occasion (work, an evening out, travel), a style you like, or a colour, and I'll find your perfect bag.",
//       products: [],
//     };
//   }

//   const wanted = findWantedTags(text);
//   const budget = findBudget(text);

//   if (wanted.length === 0 && !budget) {
//     return {
//       text: "I'd love to help you find the right one. Tell me where you'll carry it: work, an evening out, travel, everyday. You can add a colour or a budget too, like “an orange bag for dinner under $300”. In the meantime, here are our most-loved pieces:",
//       products: popularPicks(),
//     };
//   }

//   const scored = products
//     .filter((product) => (budget ? product.price <= budget : true))
//     .map((product) => {
//       const tags = tagsFor(product).join(" ").toLowerCase();
//       const haystack = `${product.name} ${product.collection} ${tags}`.toLowerCase();
//       const score = wanted.filter((tag) => haystack.includes(tag)).length;
//       return { product, score };
//     })
//     .filter((entry) => (wanted.length > 0 ? entry.score > 0 : true))
//     .sort((a, b) => b.score - a.score || b.product.reviews - a.product.reviews)
//     .slice(0, 3)
//     .map((entry) => entry.product);

//   if (scored.length === 0) {
//     const cheapest = Math.min(...products.map((p) => p.price));
//     return {
//       text: budget
//         ? `Nothing in that exact style fits under $${budget}. Our bags start at $${cheapest}. Here are our most-loved pieces:`
//         : "I couldn't find that exact style, but I think you'll love these:",
//       products: popularPicks(),
//     };
//   }

//   const base = INTROS[wanted[0]] || "Here's what I'd show you:";
//   const intro = budget ? `${base} (all under $${budget})` : base;

//   return { text: intro, products: scored };
// }

// // Short reason shown under each recommended bag in the chat
// export function whyFor(product) {
//   return BAG_INFO[product.slug]?.why || "one of our most-loved pieces.";
// }


// ==========================================================================
// The "brain" of the ARIA style assistant.
//
// It runs in the browser: it reads what the shopper typed, works out what they
// want (occasion, bag type, colour, budget) and picks matching bags.
//
// To connect a real AI later, replace `getReply` with a call to YOUR backend
// (which then calls an AI service). Never put an AI API key in React code.
// ==========================================================================

import { products } from "../../data.js";

// Built-in knowledge about each bag, keyed by slug. This is used IN ADDITION to
// any `tags` in data.js, so the assistant still works if data.js has no tags.
// `why` is the one-line reason the assistant gives when it recommends the bag.
const BAG_INFO = {
  "obsidian-tote": {
    tags: ["tote", "work", "office", "leather", "black", "travel"],
    why: "roomy enough for a laptop and polished from desk to dinner.",
  },
  "ember-crossbody": {
    tags: ["crossbody", "orange", "leather", "evening", "casual", "everyday"],
    why: "hands-free, in our signature warm orange. Perfect for dinner or a day out.",
  },
  "umbra-clutch": {
    tags: ["clutch", "evening", "black", "leather", "formal"],
    why: "slim and sleek, made for evenings, weddings and special occasions.",
  },
  "solstice-shoulder": {
    tags: ["shoulder", "orange", "leather", "casual", "everyday"],
    why: "structured luxury that carries you through a busy day.",
  },
  "garnet-top-handle": {
    tags: ["top handle", "work", "office", "leather", "red", "formal"],
    why: "an elegant top handle with a rich red finish that commands attention.",
  },
  "midnight-backpack": {
    tags: ["backpack", "work", "navy", "travel", "school", "commute"],
    why: "a refined backpack for the commute, travel and long days.",
  },
};

const tagsFor = (product) => [
  ...(BAG_INFO[product.slug]?.tags || []),
  ...(product.tags || []),
];

// Words a shopper might type -> the product tags they point to
const KEYWORDS = {
  work: ["work"],
  office: ["work"],
  meeting: ["work"],
  business: ["work"],
  professional: ["work"],
  laptop: ["work"],
  corporate: ["work"],
  commute: ["work", "commute"],
  job: ["work"],
  evening: ["evening"],
  evenings: ["evening"],
  night: ["evening"],
  party: ["evening"],
  dinner: ["evening"],
  date: ["evening"],
  wedding: ["evening", "formal"],
  church: ["formal", "evening"],
  formal: ["formal", "evening"],
  event: ["evening"],
  gala: ["evening", "formal"],
  casual: ["casual"],
  everyday: ["everyday"],
  daily: ["everyday"],
  weekend: ["casual"],
  brunch: ["casual", "crossbody"],
  travel: ["travel"],
  trip: ["travel"],
  school: ["school"],
  campus: ["school"],
  gift: ["leather"],
  tote: ["tote"],
  totes: ["tote"],
  clutch: ["clutch"],
  clutches: ["clutch"],
  crossbody: ["crossbody"],
  shoulder: ["shoulder"],
  backpack: ["backpack"],
  handle: ["top handle"],
  orange: ["orange"],
  ember: ["orange"],
  bold: ["orange", "red"],
  black: ["black"],
  noir: ["black"],
  classic: ["black"],
  red: ["red"],
  garnet: ["red"],
  navy: ["navy"],
  blue: ["navy"],
  leather: ["leather"],
};

// Opening line, based on the first thing the shopper asked for
const INTROS = {
  work: "For the working day, these are polished and practical:",
  evening: "For an evening out, these will make an entrance:",
  formal: "For a formal occasion, I'd reach for these:",
  casual: "For easy, everyday days, these are my favourites:",
  everyday: "For everyday carrying, these are my favourites:",
  travel: "For travel and long days, these are the ones:",
  school: "For school and campus life, I'd suggest:",
  orange: "A bold choice. These are our warmest pieces:",
  red: "Rich and striking. Here's what I'd show you:",
  black: "You can't go wrong with black. Here's what I'd show you:",
  navy: "Quietly elegant. Here's what I'd show you:",
};

const GREETINGS = ["hi", "hello", "hey", "hiya", "good morning", "good afternoon", "good evening"];

// "under 500k", "below ₦600,000", "less than 450000", "max 500k"
function findBudget(text) {
  const match = text.match(
    /(?:under|below|less than|max(?:imum)?|within|up to|budget(?: of)?)\s*(?:₦|ngn|n)?\s*([\d,]+(?:\.\d+)?)\s*(k|m)?/i
  );
  if (!match) return null;
  let amount = Number(match[1].replace(/,/g, ""));
  const unit = (match[2] || "").toLowerCase();
  if (unit === "k") amount *= 1000;
  if (unit === "m") amount *= 1000000;
  return amount >= 1000 ? amount : null;
}

const naira = (value) => `₦${Math.round(value).toLocaleString("en-NG")}`;

function findWantedTags(text) {
  const lower = text.toLowerCase();
  const wanted = [];

  Object.entries(KEYWORDS).forEach(([word, tags]) => {
    if (new RegExp(`\\b${word}\\b`).test(lower)) {
      tags.forEach((tag) => {
        if (!wanted.includes(tag)) wanted.push(tag);
      });
    }
  });

  return wanted;
}

// When we can't match, don't leave a dead end: show our most-loved bags
function popularPicks(limit = 3) {
  return [...products].sort((a, b) => b.reviews - a.reviews).slice(0, limit);
}

export function getReply(text) {
  const lower = text.trim().toLowerCase();

  if (GREETINGS.some((g) => lower === g || lower.startsWith(`${g} `))) {
    return {
      text: "Hello, welcome to ARIA. What are you shopping for? Tell me the occasion (work, an evening out, travel), a style you like, or a colour, and I'll find your perfect bag.",
      products: [],
    };
  }

  const wanted = findWantedTags(text);
  const budget = findBudget(text);

  if (wanted.length === 0 && !budget) {
    return {
      text: "I'd love to help you find the right one. Tell me where you'll carry it: work, an evening out, travel, everyday. You can add a colour or a budget too, like “an orange bag for dinner under ₦500k”. In the meantime, here are our most-loved pieces:",
      products: popularPicks(),
    };
  }

  const scored = products
    .filter((product) => (budget ? product.price <= budget : true))
    .map((product) => {
      const tags = tagsFor(product).join(" ").toLowerCase();
      const haystack = `${product.name} ${product.collection} ${tags}`.toLowerCase();
      const score = wanted.filter((tag) => haystack.includes(tag)).length;
      return { product, score };
    })
    .filter((entry) => (wanted.length > 0 ? entry.score > 0 : true))
    .sort((a, b) => b.score - a.score || b.product.reviews - a.product.reviews)
    .slice(0, 3)
    .map((entry) => entry.product);

  if (scored.length === 0) {
    const cheapest = Math.min(...products.map((p) => p.price));
    return {
      text: budget
        ? `Nothing in that exact style fits under ${naira(budget)}. Our bags start at ${naira(cheapest)}. Here are our most-loved pieces:`
        : "I couldn't find that exact style, but I think you'll love these:",
      products: popularPicks(),
    };
  }

  const base = INTROS[wanted[0]] || "Here's what I'd show you:";
  const intro = budget ? `${base} (all under ${naira(budget)})` : base;

  return { text: intro, products: scored };
}

// Short reason shown under each recommended bag in the chat
export function whyFor(product) {
  return BAG_INFO[product.slug]?.why || "one of our most-loved pieces.";
}