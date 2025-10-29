"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Heart, MinusIcon, Phone, PlusIcon } from "lucide-react";
import { useIsInCart, addToCart } from "@/redux/features/cart/cartSlice";
import {
  useIsInWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import SocialShare from "@/components/shared/social-share";
import Link from "next/link";
import { useSettings } from "@/components/shared/global-provider";
import { event as fbEvent } from "@/lib/fpixel";

export default function ProductInfo({ product }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const settings = useSettings();
  const isInWishlist = useIsInWishlist(product.id);
  const isInCart = useIsInCart(product.id);

  const [selectedSize, setSelectedSize] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const availableStock = selectedSize?.stock || product.total_stock;

  return (
    <div className="space-y-3">
      <div>
        <h1 className="pr-4 text-2xl font-bold sm:line-clamp-1">
          {product.name}
        </h1>
        <p className="text-muted-foreground">{product.category?.name}</p>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">
          TK.{" "}
          {product.discounted_price > 0
            ? product.discounted_price
            : product.price}
        </span>
        {product.discounted_price > 0 && (
          <span className="text-muted-foreground line-through">
            TK. {product.price}
          </span>
        )}
      </div>

      <p className="text-sm">{product.short_description}</p>

      <hr />

      <div className="space-y-4">
        {product.variants.some((variant) => variant.size) && (
          <div>
            <h3 className="mb-2 font-medium">SIZE:</h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map(
                (variant) =>
                  variant.size && (
                    <Button
                      key={variant.id}
                      variant={
                        selectedSize?.id === variant.id ? "default" : "outline"
                      }
                      className="size-10 disabled:cursor-not-allowed"
                      onClick={() => setSelectedSize(variant)}
                      disabled={variant.stock === 0}
                    >
                      {variant.size}
                    </Button>
                  ),
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
              className="size-10 rounded-r-none border-r"
              disabled={availableStock === 0}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                quantity < availableStock && setQuantity((q) => q + 1)
              }
              className="size-10 rounded-l-none border-l"
              disabled={availableStock === 0}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {availableStock > 0 ? (
              `${availableStock} available`
            ) : (
              <span className="text-destructive">Out of stock</span>
            )}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            className="flex-1"
            disabled={availableStock === 0 || isInCart}
            onClick={() => {
              dispatch(
                addToCart({
                  product: {
                    id: product.id,
                    variant: selectedSize.id,
                    quantity,
                  },
                }),
              );
              fbEvent("AddToCart", {
                value: selectedSize.price * quantity,
                currency: settings.currency,
                content_ids: [product.id],
                content_type: "product",
                num_items: quantity,
              });
            }}
          >
            {isInCart ? "Added to Cart" : "Add to Cart"}
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            disabled={availableStock === 0}
            onClick={() =>
              router.push(
                `/checkout?product=${product.id}&variant=${selectedSize.id}&quantity=${quantity}`,
              )
            }
          >
            Buy Now
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            isInWishlist
              ? dispatch(removeFromWishlist({ id: product.id }))
              : dispatch(addToWishlist({ product }))
          }
        >
          <Heart
            className={cn("mr-2 h-4 w-4", isInWishlist && "fill-primary")}
          />
          {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
        </Button>

        <div className="flex items-center gap-4">
          <Link href={`tel:${settings.phone}`} className="block max-xs:w-full">
            <Button className="max-xs:w-full">
              <Phone className="mr-2 h-4 w-4" />
              {settings.phone}
            </Button>
          </Link>

          <SocialShare product={product} />
        </div>
      </div>
    </div>
  );
}
