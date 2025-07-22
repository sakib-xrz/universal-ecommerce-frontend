import CartDrawer from "@/components/shared/cart/cart-drawer";
import WishlistDrawer from "@/components/shared/wishlist/wishlist-drawer";
import { useCartCount } from "@/redux/features/cart/cartSlice";
import { useWishlistCount } from "@/redux/features/wishlist/wishlistSlice";
import { BookHeart, Home, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileBottomNav({
  setCategoryOpen,
  showSearch,
  setShowSearch,
}) {
  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();

  const [openWishlistDrawer, setOpenWishlistDrawer] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 z-50 flex h-[4.5rem] w-full items-center justify-around rounded-t-3xl border bg-white shadow">
        <div className="flex w-full items-center justify-evenly">
          <Link
            href={"/"}
            className="flex flex-col items-center justify-center gap-1 text-gray-600"
            aria-label="Home"
          >
            <Home size={18} />
            <p className="text-xs font-medium">Home</p>
          </Link>
          <button
            className="flex flex-col items-center justify-center gap-1 text-gray-600"
            onClick={() => setCategoryOpen(true)}
          >
            <Menu size={18} />
            <p className="text-xs font-medium">Category</p>
          </button>
          <button
            className="flex flex-col items-center justify-center gap-1 text-gray-600"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search size={18} />
            <p className="text-xs font-medium">Search</p>
          </button>
          <button
            className="relative flex flex-col items-center justify-center gap-1 text-gray-600"
            onClick={() => setOpenCartDrawer(true)}
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute right-[-5px] top-[-8px] flex size-4 items-center justify-center rounded-full bg-primary text-xs font-medium leading-none text-white">
                {cartCount}
              </span>
            )}
            <p className="text-xs font-medium">Cart</p>
          </button>
          <button
            className="relative flex flex-col items-center justify-center gap-1 text-gray-600"
            onClick={() => setOpenWishlistDrawer(true)}
          >
            <BookHeart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute right-[5px] top-[-8px] flex size-4 items-center justify-center rounded-full bg-primary text-xs font-medium leading-none text-white">
                {wishlistCount}
              </span>
            )}
            <p className="text-xs font-medium">Wishlist</p>
          </button>
        </div>
      </div>

      <WishlistDrawer
        open={openWishlistDrawer}
        setOpen={setOpenWishlistDrawer}
      />

      <CartDrawer open={openCartDrawer} setOpen={setOpenCartDrawer} />
    </>
  );
}
