import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../components/common/CustomInput";
import { useCart } from "../context/CartContext";
import CustomButton from "../components/common/CustomButton";
import { showToast } from "../components/common/showToast";
import { cartValidationSchema } from "../utils/validations";
import { useMutation } from "@tanstack/react-query";
import { placeOrder, type PlaceOrderPayload } from "../api";
import { AppLoaderRef } from "../App";

interface CartFormValues {
  firstName: string;
  lastName: string;
  address: string;
}

const CartPage: React.FC = () => {
  const { items, total, dispatch } = useCart();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CartFormValues>({
    resolver: yupResolver(cartValidationSchema),
  });

  const { mutate: callPlaceOrderApi } = useMutation({
    mutationFn: (payload: PlaceOrderPayload) => placeOrder(payload),
    onSuccess: () => {
      showToast({ message: "Order placed successfully!", type: "success" });
      dispatch({ type: "CLEAR_CART" });
    },
    onMutate: () => AppLoaderRef.current?.start(),
    onError: (error: any) => {
      console.log(error?.data?.message  ,"error");
      
      showToast({
        message: error?.data?.message || "Failed to place order",
        type: "error",
      });
    },
    onSettled: () => AppLoaderRef.current?.stop(),
  });

  const increaseQuantity = (id: string, currentQty: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity: currentQty + 1 },
    });
  };

  const decreaseQuantity = (id: string, currentQty: number) => {
    if (currentQty > 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id, quantity: currentQty - 1 },
      });
    }
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const onSubmit = (data: CartFormValues) => {
    if (items?.length === 0) {
      showToast({ message: "Cart is empty", type: "error" });
      return;
    }

    const payload: PlaceOrderPayload = {
      ...data,
      cartItems: items,
      total,
    };

    callPlaceOrderApi(payload);
  };

  const formatPrice = (price: number) => price.toFixed(2);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 border rounded-lg p-4 sm:p-6 shadow bg-white">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b py-4 gap-4"
              >
                <div className="flex-1">
                  <h2 className="font-semibold text-base sm:text-lg">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    ${formatPrice(item.price)} × {item.quantity} = $
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <CustomButton
                    variant="secondary"
                    onClick={() => decreaseQuantity(item.id, item.quantity)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </CustomButton>
                  <span className="text-sm sm:text-base">
                    {item.quantity}
                  </span>
                  <CustomButton
                    variant="secondary"
                    onClick={() => increaseQuantity(item.id, item.quantity)}
                  >
                    +
                  </CustomButton>
                  <CustomButton
                    variant="danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </CustomButton>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="mt-6 text-right">
              <h2 className="text-lg sm:text-xl font-bold">
                Total:{" "}
                <span className="text-blue-600">
                  ${formatPrice(total)}
                </span>
              </h2>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="border rounded-lg p-4 sm:p-6 shadow bg-white">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Customer Details
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CustomInput
                name="firstName"
                label="First Name"
                control={control}
                error={errors.firstName}
              />
              <CustomInput
                name="lastName"
                label="Last Name"
                control={control}
                error={errors.lastName}
              />
              <CustomInput
                name="address"
                label="Address"
                control={control}
                error={errors.address}
              />

              <CustomButton type="submit" className="w-full">
                Place Order
              </CustomButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
