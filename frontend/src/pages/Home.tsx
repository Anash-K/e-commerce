import React, { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";
import { useCart } from "../context/CartContext";
import { showToast } from "../components/common/showToast";
import ProductCard from "../components/ui/ProductCard";
import { AppLoaderRef } from "../App";

const Home: React.FC = () => {
  const [products, setProducts] = useState<(Product & { quantity: number })[]>([]);
  const { dispatch } = useCart();

  const { data, isLoading , error} = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

// handling loader
  useEffect(() => {
    if (isLoading) {
      AppLoaderRef.current?.start();
    } else {
      AppLoaderRef.current?.stop();
    }

    if (error) {
      console.log(error);
      
      showToast({ 
        message: error?.message || "Failed to load products. Please try again.",
        type: "error",
        id: "fetch-products-error" 
      });
    }
  }, [isLoading, error]);

  //handling products state
  useEffect(() => {
    if (data?.data?.length) {
      const productsWithQuantity = data.data.map((p: Product) => ({
        ...p,
        quantity: 1,
      }));
      setProducts(productsWithQuantity);
    }
  }, [data]);

  // handling add to cart
  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: 1 } });
    showToast({ 
    message: "Product added to cart.", 
    type: "info", 
    id: String(product.id) 
  });
  };

  // handling no products
  if (!isLoading && !products?.length) {
    return <p className="text-center mt-10">No products found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
