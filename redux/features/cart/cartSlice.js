import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product } = action.payload;
      const exists = state.products.some((item) => item.id === product.id);
      if (!exists) {
        state.products.push(product);
        toast.success("Added to cart");
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product) {
        product.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Hook to get all cart products
export const useCartProducts = () => {
  return useSelector((state) => state.cart.products);
};

// Hook to check if a product is in the cart
export const useIsInCart = (id) => {
  return useSelector((state) =>
    state.cart.products.some((product) => product.id === id),
  );
};

// Hook to get cart count
export const useCartCount = () => {
  return useSelector((state) => state.cart.products.length);
};
