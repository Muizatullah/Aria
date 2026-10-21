// One place that decides how every price on the site is shown.
// All prices in data.js are in NAIRA. To change the format, edit it here.
export const formatPrice = (value) =>
  `₦${Math.round(value).toLocaleString("en-NG")}`;