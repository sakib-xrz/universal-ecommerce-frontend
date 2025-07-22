"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import ProductDetails from "./product-details";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const primaryImage =
    product?.images?.find((image) => image.type === "PRIMARY")?.image_url ||
    "/default-product.jpg";

  const secondaryImage =
    product?.images?.find((image) => image.type === "SECONDARY")?.image_url ||
    primaryImage ||
    "/default-product.jpg";

  const currentImage = isHovered ? secondaryImage : primaryImage;

  const { discounted_price, price } = product;

  return (
    <>
      <Link
        href={`/product/${product.slug}`}
        className="cursor-pointer"
        area-label={product?.name}
      >
        <div
          className="mx-auto max-w-sm overflow-hidden rounded-lg border bg-white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Section */}
          <div className="relative">
            <Image
              src={currentImage}
              alt="Premium Denim Shirt"
              className="object-cover transition-all duration-500 ease-in-out"
              width={1280}
              height={1280}
            />

            <div>
              {discounted_price > 0 && (
                <span className="absolute bottom-4 left-2 rounded-sm bg-white bg-opacity-70 px-2 py-1 text-xs font-semibold text-primary">
                  {product?.discount}
                  {product?.discount_type === "PERCENTAGE" ? "%" : " BDT"} OFF
                </span>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-2 py-3 sm:p-4 sm:py-4">
            <h3 className="mb-1 truncate text-xs text-muted-foreground sm:text-sm">
              {product?.name}
            </h3>

            {/* Price Section */}
            <div className="mb-2 flex items-baseline space-x-2">
              <span className="text-sm font-semibold text-primary sm:text-xl">
                TK. {discounted_price ? discounted_price : price}
              </span>
              {discounted_price > 0 && (
                <span className="text-xs text-gray-400 line-through sm:text-sm">
                  TK. {price}
                </span>
              )}
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setShowDetails(true);
                }}
                className="border border-gray-200 bg-white text-primary shadow hover:border-primary hover:bg-primary hover:text-white sm:hidden"
                size="sm"
              >
                Quick View
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setShowDetails(true);
                }}
                className="border border-gray-200 bg-white text-primary shadow hover:border-primary hover:bg-primary hover:text-white max-sm:hidden"
              >
                Quick View
              </Button>
            </div>
          </div>
        </div>
      </Link>

      <ProductDetails
        product={product}
        isOpen={showDetails}
        onClose={setShowDetails}
      />
    </>
  );
};

export default ProductCard;
