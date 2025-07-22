"use client";

import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

export default function FacebookPixel({ pixelId }) {
  useEffect(() => {
    // Initialize Facebook Pixel
    ReactPixel.init(pixelId, undefined, {
      autoConfig: true,
      debug: false,
    });

    // Track PageView on initial load
    ReactPixel.pageView();

    // Function to handle route changes
    const handleRouteChange = () => {
      ReactPixel.pageView();
    };

    // Add routeChangeComplete listener for Next.js
    window.addEventListener("routeChangeComplete", handleRouteChange);

    // Cleanup
    return () => {
      window.removeEventListener("routeChangeComplete", handleRouteChange);
    };
  }, [pixelId]);

  return null;
}

// Export utility function to track events
export const sendFBPixelEvent = (eventName, data) => {
  ReactPixel.track(eventName, data);
};
