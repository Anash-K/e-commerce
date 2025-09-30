import type { Product } from "../../types/Product";
import CustomButton from "../common/CustomButton";

const ProductCard: React.FC<{
  product: Product & { quantity: number };
  onAddToCart: (product: Product & { quantity: number }) => void;
}> = ({ product, onAddToCart }) => {

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={`${product?.imageUrl}`}
        alt={product.name}
        className="w-full h-60 object-contain mb-3 rounded bg-gray-100 mix-blend-multiply"
        style={{ backgroundColor: "transparent" }}
      />
      <h2 className="text-lg font-semibold">{product?.name}</h2>
      <p className="text-gray-600 text-sm mb-2">{product?.description}</p>
      <p className="text-blue-600 font-bold mb-3">${product?.price}</p>
      <CustomButton onClick={() => onAddToCart(product)}>
        Add to Cart
      </CustomButton>
    </div>
  );
};

export default ProductCard;
