export const AUTH_TOKEN_KEY = "ACCESS_TOKEN";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const platformOptions = [
  {
    value: "WEBSITE",
    label: "Website",
  },
  {
    value: "FACEBOOK",
    label: "Facebook",
  },
  {
    value: "WHATSAPP",
    label: "WhatsApp",
  },
  {
    value: "INSTAGRAM",
    label: "Instagram",
  },
  {
    value: "PHONE",
    label: "Phone",
  },
];

export const paymentMethodOptions = [
  {
    value: "CASH_ON_DELIVERY",
    label: "Cash on Delivery",
  },
  {
    value: "BKASH",
    label: "Bkash",
  },
  {
    value: "NAGAD",
    label: "Nagad",
  },
  {
    value: "ROCKET",
    label: "Rocket",
  },
];

export const cityLocationOptions = [
  {
    value: true,
    label: "Inside Dhaka",
  },
  {
    value: false,
    label: "Outside Dhaka",
  },
];
