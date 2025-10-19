"use client";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as pixel from "@/lib/fpixel";

export default function OrderSuccess() {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    // Get purchase data from URL params
    const purchaseDataParam = searchParams.get("purchaseData");

    if (purchaseDataParam) {
      try {
        const purchaseData = JSON.parse(purchaseDataParam);

        // Trigger Facebook Pixel Purchase event
        pixel.purchase({
          value: purchaseData.value,
          currency: purchaseData.currency,
          content_ids: purchaseData.content_ids,
          num_items: purchaseData.num_items,
        });
      } catch (error) {
        console.error("Error parsing purchase data:", error);
      }
    }
  }, [pathname, loaded, searchParams]);

  return (
    <Container className="flex h-[calc(100svh-450px)] flex-col items-center justify-center">
      <CircleCheckIcon className="h-16 w-16 text-green-500" />
      <h1 className="mt-4 text-center text-2xl font-semibold">
        Thank you for your order!
      </h1>
      <p className="mt-2 text-center text-gray-500">
        Your order was successfully placed and is being processed.
      </p>

      <Button className="mt-8">
        <Link href="/" prefetch={false}>
          Return to Homepage
        </Link>
      </Button>
    </Container>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
