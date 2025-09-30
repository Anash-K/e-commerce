import AxiosInstance from "./AxiosInstance";

export const getProducts = async () => {
  try {
    const response = await AxiosInstance.get("products");
    console.log(response, "res");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface PlaceOrderPayload {
  firstName: string;
  lastName: string;
  address: string;
  cartItems: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}

export const placeOrder = async (payload: PlaceOrderPayload) => {
  console.log(payload, "payload");
  const response = await AxiosInstance.post("orders", payload);
  return response.data;
};
