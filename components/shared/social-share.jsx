"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getBaseUrl } from "@/utils";

export default function SocialShare({ product }) {
  const baseUrl = getBaseUrl();
  const productLink = `${baseUrl}/product/${product?.slug || ""}`;

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          url: productLink,
        });
      } else {
        await navigator.clipboard.writeText(productLink);
        toast.success("Link copied to clipboard");
      }
    } catch (error) {
      console.error("Error sharing link:", error);
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleShare}
      aria-label="Share"
      className="gap-2"
    >
      <Share2 className="h-5 w-5" />
      <p className="hidden text-lg xs:block">Share</p>
    </Button>
  );
}
