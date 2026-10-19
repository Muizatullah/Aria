// ==========================================================================
// Text for the Privacy Policy, Terms of Service and Accessibility pages.
//
// IMPORTANT: this is PLACEHOLDER text so the pages are complete. It is not
// legal advice. Have a lawyer review the Privacy Policy and Terms before you
// launch, and update the company details, dates and addresses below.
// ==========================================================================

const LAST_UPDATED = "1 January 2026"; // PLACEHOLDER: update when you publish
const CONTACT_EMAIL = "hello@arialuxe.com";

export const LEGAL = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    updated: LAST_UPDATED,
    intro:
      "ARIA respects your privacy. This policy explains what personal information we collect, how we use it, and the choices you have.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "When you create an account, place an order or contact us, we collect the details you give us: your name, email address, phone number, delivery address and order history.",
          "We also collect basic technical information when you visit our site, such as your device type, browser and the pages you view, to help us keep the site working well.",
        ],
      },
      {
        heading: "Payment information",
        paragraphs: [
          "Payments are processed by our payment partner, Paystack. Your card details are entered on their secure page. ARIA never sees or stores your full card number.",
        ],
      },
      {
        heading: "How we use your information",
        list: [
          "To process, deliver and track your orders",
          "To answer your questions and provide customer support",
          "To send order confirmations and delivery updates",
          "To send news and offers, only if you have chosen to receive them",
          "To improve our website, products and service",
        ],
      },
      {
        heading: "Sharing your information",
        paragraphs: [
          "We share your information only with the companies that help us serve you, such as delivery carriers (for example DHL) and our payment partner. We never sell your personal information.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "We use cookies and similar technology to keep your bag and wishlist, remember your preferences and understand how the site is used. You can control cookies in your browser settings.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You can ask to see, correct or delete the personal information we hold about you, and you can unsubscribe from marketing emails at any time. We handle personal data in line with applicable data protection law, including the Nigeria Data Protection Act.",
        ],
      },
      {
        heading: "How long we keep your data",
        paragraphs: [
          "We keep your information only for as long as we need it to serve you, meet legal and accounting requirements, and resolve disputes.",
        ],
      },
      {
        heading: "Contact us",
        paragraphs: [`Questions about your privacy? Email us at ${CONTACT_EMAIL}.`],
      },
    ],
  },

  terms: {
    eyebrow: "Legal",
    title: "Terms of Service",
    updated: LAST_UPDATED,
    intro:
      "These terms govern your use of the ARIA website and your purchases from us. By using the site or placing an order, you agree to them.",
    sections: [
      {
        heading: "Using our website",
        paragraphs: [
          "You agree to use the site lawfully and to give accurate information when you create an account or place an order. You are responsible for keeping your account details secure.",
        ],
      },
      {
        heading: "Products and pricing",
        paragraphs: [
          "We make every effort to show our bags accurately, but colours may vary slightly between screens and natural leather varies from piece to piece. Prices are shown in US dollars and may change without notice. We may charge in Nigerian naira at checkout.",
        ],
      },
      {
        heading: "Orders and payment",
        paragraphs: [
          "Your order is confirmed when you receive our confirmation email. We may cancel an order, for example if an item is unavailable or a price was shown in error, and we will refund you in full if we do.",
        ],
      },
      {
        heading: "Shipping, returns and refunds",
        paragraphs: [
          "Delivery times, return rules and refunds are set out on our Shipping & Returns page, which forms part of these terms.",
        ],
      },
      {
        heading: "Lifetime warranty",
        paragraphs: [
          "ARIA bags are warranted against manufacturing defects for the life of the product. Normal wear and damage caused by misuse are not covered.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "All content on this site, including the ARIA name, logo, photographs and designs, belongs to ARIA and may not be copied or reused without our written permission.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, ARIA is not liable for indirect or consequential losses arising from your use of the site. Nothing in these terms limits your legal rights as a consumer.",
        ],
      },
      {
        heading: "Changes to these terms",
        paragraphs: [
          "We may update these terms from time to time. The date at the top shows when they were last changed. Continuing to use the site means you accept the updated terms.",
        ],
      },
      {
        heading: "Contact us",
        paragraphs: [`Questions about these terms? Email us at ${CONTACT_EMAIL}.`],
      },
    ],
  },

  accessibility: {
    eyebrow: "Accessibility",
    title: "Accessibility Statement",
    updated: LAST_UPDATED,
    intro:
      "ARIA wants everyone to be able to browse and buy from our website. We are working to make it easy to use for people of all abilities.",
    sections: [
      {
        heading: "Our commitment",
        paragraphs: [
          "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA, and we review our site regularly to find and fix barriers.",
        ],
      },
      {
        heading: "What we do",
        list: [
          "Every page can be used with a keyboard alone",
          "Buttons, links and form fields have clear labels for screen readers",
          "Product images have descriptive text",
          "Text is sized and coloured to be readable against its background",
          "Menus, search and chat can be opened and closed with the keyboard, including the Esc key",
          "The site adapts to phones, tablets and desktop screens",
        ],
      },
      {
        heading: "Known limitations",
        paragraphs: [
          "We are still improving some areas, including a few decorative images and third-party tools such as our payment window. We are working to fix these.",
        ],
      },
      {
        heading: "Tell us about a problem",
        paragraphs: [
          `If you find something on our site hard to use, please email ${CONTACT_EMAIL} or call us on +234 1 234 5678 (Mon–Fri 9AM–6PM WAT). Tell us the page and the problem, and we will do our best to help and to fix it.`,
        ],
      },
    ],
  },
};