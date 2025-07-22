"use client";
import CartDrawer from "@/components/shared/cart/cart-drawer";
import { useCartCount } from "@/redux/features/cart/cartSlice";
import { ShoppingBasket } from "lucide-react";
import { useState } from "react";

export default function FloatingCart() {
  const cartCount = useCartCount();
  const [openCartDrawer, setOpenCartDrawer] = useState(false);

  return (
    <>
      <div
        className="fixed right-0 top-1/2 z-40 hidden size-16 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-l-md bg-primary text-primary-foreground sm:flex"
        onClick={() => setOpenCartDrawer(true)}
      >
        <div className="flex flex-col items-center justify-center">
          <ShoppingBasket size={24} className="text-primary-foreground" />
          <p className="mt-1.5 font-mono text-xs font-medium text-primary-foreground">
            {cartCount > 1 ? `${cartCount} items` : `${cartCount} item`}
          </p>
        </div>
      </div>
      <CartDrawer open={openCartDrawer} setOpen={setOpenCartDrawer} />
    </>
  );
}
