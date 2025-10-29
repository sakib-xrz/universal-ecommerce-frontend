import { Heart, MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import DrawerModal from "./drawer-modal";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  useIsInWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { addToCart, useIsInCart } from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { event as fbEvent } from "@/lib/fpixel";

export default function ProductDetails({ product, isOpen, onClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isInWishlist = useIsInWishlist(product.id);
  const isInCart = useIsInCart(product.id);

  const {
    name = "",
    slug = "",
    price = 0,
    discounted_price = 0,
    images = [],
    variants = [],
    category = { name: "" },
    total_stock = 0,
  } = product || {};

  const [selectedImage, setSelectedImage] = useState(
    images?.[0]?.image_url || null,
  );
  const [selectedSize, setSelectedSize] = useState(variants[0]);

  const availableStock = selectedSize?.stock || total_stock;

  const [quantity, setQuantity] = useState(availableStock > 0 ? 1 : 0);

  return (
    <DrawerModal
      isOpen={isOpen}
      onClose={onClose}
      className={"p-0 lg:max-w-5xl xl:max-w-6xl"}
    >
      <div className="overflow-y-auto px-4 max-sm:my-4 sm:py-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
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
                      selectedImage === image.image_url &&
                        "ring-2 ring-primary",
                    )}
                  >
                    <Image
                      src={image.image_url}
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

            <div className="order-1 flex-1 max-lg:aspect-square lg:order-2 xl:aspect-square">
              <Image
                src={selectedImage || "/default-product.jpg"}
                alt={name || "Product image"}
                width={900}
                height={900}
                loading="eager"
                className="h-full w-full rounded object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="pr-4 text-2xl font-bold sm:line-clamp-1">
                {name}
              </h1>
              <p className="text-muted-foreground">{category?.name}</p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                TK. {discounted_price > 0 ? discounted_price : price}
              </span>
              {discounted_price > 0 && (
                <span className="text-muted-foreground line-through">
                  TK. {price}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {variants.some((variant) => variant.size) ? (
                <div>
                  <h3 className="mb-2 font-medium">SIZE:</h3>
                  <div className="flex flex-wrap gap-2">
                    {variants.map(
                      (variant) =>
                        variant.size && (
                          <Button
                            key={variant.id}
                            variant={
                              selectedSize?.id === variant.id
                                ? "default"
                                : "outline"
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
              ) : (
                <div className="lg:h-[4.6rem]"></div>
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
                      currency: "BDT", // or use your settings if available
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

              <div className="flex justify-center">
                <Link
                  href={`/product/${slug}`}
                  className="my-2 block w-fit cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  View Full Product Details »
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DrawerModal>
  );
}
