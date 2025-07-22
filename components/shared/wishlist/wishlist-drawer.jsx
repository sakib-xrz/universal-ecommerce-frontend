"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWishlistProducts } from "@/redux/features/wishlist/wishlistSlice";
import WishlistCard from "./wishlist-card";

export default function WishlistDrawer({ open, setOpen }) {
  const wishlistItems = useWishlistProducts();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="p-4 max-xs:w-full">
        <SheetHeader>
          <SheetTitle>Wishlist Items</SheetTitle>
          <div className="pt-2">
            {wishlistItems.length ? (
              wishlistItems.map((item) => (
                <WishlistCard key={item.id} item={item} setOpen={setOpen} />
              ))
            ) : (
              <div className="flex h-20 items-center justify-center">
                <p className="text-muted-foreground">Your wishlist is empty</p>
              </div>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
