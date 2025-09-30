import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./navigation/AppRoute";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import React from "react";
import type { CustomLoaderRefType } from "./components/common/CustomLoader";
import CustomLoader from "./components/common/CustomLoader";

export const queryClient = new QueryClient();
export const AppLoaderRef = React.createRef<CustomLoaderRefType>();

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </QueryClientProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <CustomLoader ref={AppLoaderRef} />
    </div>
  );
};

export default App;
