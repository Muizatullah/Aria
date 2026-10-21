// ==========================================================================
// Paystack helper: opens the Paystack payment popup (Inline v1).
//
// Setup:
//   1. Put your PUBLIC key in a .env file in the project root:
//        VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxx
//      then restart `npm run dev` (Vite only reads .env at startup).
//   2. Prices in data.js are already in naira, so no conversion is needed.
// ==========================================================================

const PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export const PAYSTACK_CURRENCY = "NGN";

// Paystack wants the amount in the smallest unit (kobo): ₦1 = 100 kobo
const toKobo = (naira) => Math.round(naira * 100);

let scriptPromise;

function loadPaystackScript() {
  if (window.PaystackPop) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = () => {
      scriptPromise = undefined;
      reject(new Error("Could not load Paystack. Check your internet connection."));
    };
    document.body.appendChild(script);
  });

  return scriptPromise;
}

export async function openPaystack({
  email,
  amountNaira,
  reference,
  customerName,
  phone,
  onSuccess,
  onClose,
}) {
  if (!PUBLIC_KEY) {
    throw new Error(
      "Paystack key missing. Add VITE_PAYSTACK_PUBLIC_KEY to your .env file and restart the dev server."
    );
  }

  await loadPaystackScript();

  const handler = window.PaystackPop.setup({
    key: PUBLIC_KEY,
    email,
    amount: toKobo(amountNaira),
    currency: PAYSTACK_CURRENCY,
    ref: reference,
    metadata: {
      custom_fields: [
        { display_name: "Customer", variable_name: "customer", value: customerName },
        { display_name: "Phone", variable_name: "phone", value: phone },
      ],
    },
    // Paystack's inline callback must be a plain (non-async) function
    callback: (response) => onSuccess(response),
    onClose: () => onClose(),
  });

  handler.openIframe();
}