import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Almonds from "./photos/Almonds.jpg";
import Cheeze from "./photos/Cheeze.jpg";
import Chips from "./photos/Chips.jpg";
import Chocolate from "./photos/Chocolate.jpg";
import Pizza from "./photos/Pizza.jpg";
import SelfRaising from "./photos/SelfRaising.jpg";

const initialState = {
  products: [
    {
      Name: "Cheese",
      price: 2.5,
      Location: "Refrigerated foods",
      image: Cheeze,
      qty: 2,
      id: 1,
    },
    {
      Name: "Crisps",
      price: 3,
      Location: "the Snack isle",
      image: Chips,
      qty: 5,
      id: 2,
    },
    {
      Name: "pizza",
      price: 4,
      Location: "Refrigerated foods",
      image: Pizza,
      qty: 7,
      id: 3,
    },
    {
      Name: "Chocolate",
      price: 1.5,
      Location: "the Snack isle",
      image: Chocolate,
      qty: 8,
      id: 4,
    },
    {
      Name: "Self-raising flour",
      price: 1.5,
      Location: "Home baking",
      image: SelfRaising,
      qty: 0,
      id: 5,
    },
    {
      Name: "Ground almonds",
      price: 3,
      Location: "Home baking",
      image: Almonds,
      qty: 1,
      id: 6,
    },
  ],
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "top-left",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart", {
          position: "top-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;

          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
