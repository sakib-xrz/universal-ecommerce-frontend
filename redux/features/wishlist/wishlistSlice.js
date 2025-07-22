import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const initialState = {
  products: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { product } = action.payload;
      const exists = state.products.some((item) => item.id === product.id);
      if (!exists) {
        state.products.push(product);
        toast.success("Added to wishlist");
      }
    },
    removeFromWishlist: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

// Hook to get all wishlist products
export const useWishlistProducts = () => {
  return useSelector((state) => state.wishlist.products);
};

// Hook to check if a product is in the wishlist
export const useIsInWishlist = (id) => {
  return useSelector((state) =>
    state.wishlist.products.some((product) => product.id === id),
  );
};

// Hook to get wishlist count
export const useWishlistCount = () => {
  return useSelector((state) => state.wishlist.products.length);
};
