"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductImages({ images, name }) {
  const [selectedImage, setSelectedImage] = useState(
    images?.[0]?.image_url || null,
  );

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {selectedImage !== null && (
        <div
          className={cn(
            "order-2 flex gap-4 p-1 lg:order-1 lg:h-[374px] lg:flex-col",
            images.length > 2 &&
              "max-sm:w-full max-sm:overflow-x-auto max-sm:pb-2 sm:overflow-y-auto sm:overflow-x-hidden sm:pr-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400/70 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar]:w-[5px]",
          )}
        >
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image.image_url)}
              className={cn(
                "size-20 rounded border max-sm:shrink-0",
                selectedImage === image.image_url && "ring-2 ring-primary",
              )}
            >
              <Image
                src={image.image_url || "/default-product.jpg"}
                alt={`${name} ${index + 1}`}
                width={80}
                height={80}
                loading="lazy"
                className="h-full w-full rounded object-cover"
              />
            </button>
          ))}
        </div>
      )}
      <div className="order-1 flex-1 lg:order-2">
        <Image
          src={selectedImage || "/default-product.jpg"}
          alt={name || "Product image"}
          width={900}
          height={900}
          loading="eager"
          className="aspect-square rounded object-cover"
        />
      </div>
    </div>
  );
}
