export function generateQueryString(params) {
  const isEmpty = Object.values(params).every(
    (value) => value === "" || value === null || value === undefined,
  );

  if (isEmpty) {
    return "";
  }

  const queryString = Object.entries(params)
    .filter(
      ([_key, value]) => value !== "" && value !== null && value !== undefined,
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");

  return `?${queryString}`;
}

export function sanitizeParams(params) {
  const sanitizedObj = {};

  for (const key in params) {
    if (params[key]) {
      sanitizedObj[key] = params[key];
    }
  }

  return sanitizedObj;
}

export const formatText = (text) => {
  if (text) {
    // Decode URL-encoded characters (e.g., '%2C' to ',')
    const decodedText = decodeURIComponent(text);

    // Replace underscores and hyphens with spaces, and '%2C' with a slash
    const formattedText = decodedText
      .replace(/[_-]/g, " ") // Replace underscores and hyphens with space
      .replace(/,/g, " / ") // Replace ',' with ' / '
      .toLowerCase(); // Convert to lowercase

    // Capitalize the first letter
    return formattedText.charAt(0).toUpperCase() + formattedText.slice(1);
  } else {
    return "";
  }
};

export const calculateProductPrice = (product) => {
  const { sell_price, discount, discount_type } = product;

  let discountedPrice = 0;

  if (discount && discount_type === "PERCENTAGE") {
    discountedPrice = sell_price - (sell_price * discount) / 100;
  } else if (discount && discount_type === "FLAT") {
    discountedPrice = sell_price - discount;
  }

  discountedPrice = Math.max(0, discountedPrice);

  return {
    original_price: sell_price,
    discounted_price: discountedPrice,
  };
};

export function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const getBaseUrl = () => {
  const baseUrl = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? ":" + window.location.port : ""
  }`;
  return baseUrl;
};
