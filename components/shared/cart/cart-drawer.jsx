"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGetCartsMutation } from "@/redux/features/cart/cartApi";
import { clearCart, useCartProducts } from "@/redux/features/cart/cartSlice";
import { useEffect, useState } from "react";
import CartCard from "./cart-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";

export default function CartDrawer({ open, setOpen }) {
  const dispatch = useDispatch();
  const cartItems = useCartProducts();
  const [getCart] = useGetCartsMutation();
  const [localCart, setLocalCart] = useState([]);
  const [localSubtotal, setLocalSubtotal] = useState(0);

  useEffect(() => {
    if (open) {
      getCart({ cart_items: cartItems }).then(({ data }) => {
        setLocalCart(data?.data?.products || []);
        setLocalSubtotal(data?.data?.subtotal || 0);
      });
    }
  }, [open, cartItems, getCart]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="py-4 max-xs:w-full">
        <SheetHeader>
          <SheetTitle className="px-4">Cart Items</SheetTitle>

          {cartItems && cartItems.length > 0 && (
            <button
              className="flex cursor-pointer justify-end px-4 pt-2 text-sm font-medium text-destructive hover:underline"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          )}

          <ScrollArea className="h-[calc(100svh-10rem)] px-4">
            <div className="">
              {localCart.length ? (
                localCart.map((item) => (
                  <CartCard
                    key={item.id}
                    item={item}
                    setLocalCart={setLocalCart}
                  />
                ))
              ) : (
                <div className="flex h-20 items-center justify-center">
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {localCart.length ? (
            <div className="flex justify-center">
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className={cn(
                  localSubtotal === 0 ? "pointer-events-none opacity-50" : "",
                )}
              >
                <Button className="flex h-12 w-fit items-center justify-center gap-2.5 rounded-md px-6 py-4 text-xl font-medium">
                  <span>Place Order {localSubtotal} BDT</span>
                </Button>
              </Link>
            </div>
          ) : null}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
