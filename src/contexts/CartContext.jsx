import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

const initialState = {
  cartItems: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newCartItems = [...state.cartItems, action.payload];

      localStorage.setItem("cart", JSON.stringify(newCartItems));
      return { ...state, cartItems: newCartItems };
    }
    case "REMOVE_FROM_CART": {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      localStorage.setItem("cart", JSON.stringify(newCartItems));
      return { ...state, cartItems: newCartItems };
    }
    case "SET_CART": {
      return { ...state, cartItems: action.payload };
    }
    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return { ...state, cartItems: [] };
    default:
      throw new Error("Unknown action type");
  }
}

function CartProvider({ children }) {
  const [{ cartItems }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          dispatch({ type: "SET_CART", payload: parsedCart });
        }
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);

      localStorage.removeItem("cart");
    }
  }, []);

  function addToCart(book) {
    const existingItem = cartItems.find((item) => item.id === book.id);
    if (existingItem) {
      toast.error("این کتاب قبلاً به سبد خرید اضافه شده است.");
      return;
    }
    toast.success(`"${book.title}" به سبد خرید اضافه شد.`);
    dispatch({ type: "ADD_TO_CART", payload: book });
  }

  function removeFromCart(bookId) {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: bookId } });
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  const itemCount = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    itemCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default CartProvider;
