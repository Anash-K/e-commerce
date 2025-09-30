import React, { createContext, useReducer, useContext } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/Product";

export interface CartItem extends Product {
  quantity: number;
}

// State type
interface CartState {
  items: CartItem[];
  total: number;
}

// handling Actions
type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

// Context type
interface CartContextType extends CartState {
  dispatch: React.Dispatch<CartAction>;
}

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
};

// Reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.items.find((item) => item.id === action.payload.id);

      let updatedItems;
      if (exists) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload }];
      }

      return {
        ...state,
        items: updatedItems,
        total: parseFloat(
          updatedItems
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)
        ),
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        items: updatedItems,
        total: parseFloat(
          updatedItems
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: parseFloat(
          updatedItems
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)
        ),
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom useCart Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
