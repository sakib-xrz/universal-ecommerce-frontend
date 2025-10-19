"use client";

import { useEffect, useState } from "react";
import * as pixel from "@/lib/fpixel";
import { usePathname } from "next/navigation";

export default function ProductPixel({ product, slug }) {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    if (slug === "80-led-snow-ball-fairy-light") {
      try {
        pixel.viewContent({
          content_ids: [product.id?.toString()],
          content_name: product.name,
          content_type: "product",
          value: product.price || product.unit_price || 0,
          currency: "USD",
        });
      } catch (e) {
        // swallow client-side errors
        console.warn("pixel.viewContent error", e);
      }
    }
  }, [
    pathname,
    loaded,
    slug,
    product.id,
    product.name,
    product.price,
    product.unit_price,
  ]);

  return null;
}
