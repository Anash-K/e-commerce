export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface CartItem extends Product {
  quantity: number;
}
