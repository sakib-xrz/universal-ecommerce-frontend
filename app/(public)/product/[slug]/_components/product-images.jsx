"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductImages({ images, name }) {
  const [selectedImage, setSelectedImage] = useState(
    images?.[0]?.image_url || null,
  );
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

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
      <div className="relative order-1 flex-1 lg:order-2">
        {/* Main Image */}
        <div
          ref={imageRef}
          className="relative overflow-hidden rounded"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={selectedImage || "/default-product.jpg"}
            alt={name || "Product image"}
            width={900}
            height={900}
            loading="eager"
            className="aspect-square w-full cursor-zoom-in object-cover"
          />

          {/* Zoom Lens */}
          {isHovering && (
            <div
              className="pointer-events-none absolute z-10 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gray-300 bg-white/20"
              style={{
                left: `${mousePosition.x}%`,
                top: `${mousePosition.y}%`,
              }}
            />
          )}
        </div>

        {/* Zoomed View */}
        {isHovering && (
          <div className="absolute left-full top-0 z-20 ml-4 h-96 w-96 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg max-lg:left-0 max-lg:top-full max-lg:ml-0 max-lg:mt-4 max-lg:h-80 max-lg:w-full max-sm:h-full">
            <div className="h-full w-full overflow-hidden">
              <Image
                src={selectedImage || "/default-product.jpg"}
                alt={name || "Product image"}
                width={900}
                height={900}
                loading="eager"
                className="h-full w-full object-cover"
                style={{
                  transform: `scale(2.5)`,
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
