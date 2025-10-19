export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  window.fbq("track", name, options);
};

export const pageview = () => event("PageView");

export const initiateCheckout = (options = {}) => {
  window.fbq("track", "InitiateCheckout", options);
};

export const purchase = (options = {}) => {
  window.fbq("track", "Purchase", options);
};

export const viewContent = (options = {}) => {
  window.fbq("track", "ViewContent", options);
};
