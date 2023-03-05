import { type Product } from "../../types";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }: { product: Product }): JSX.Element => {
  return (
    <div key={product._id} className="w-full max-w-sm p-6 sm:w-1/2 lg:w-1/3">
      <Link to={`/product/${product._id}`}>
        <div className="block max-w-sm rounded-lg border border-gray-700 bg-gray-800 p-6 shadow hover:bg-gray-700">
          <div className="">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              {product.title}
            </h5>

            <p className="font-normal text-gray-400">{product.description}</p>
          </div>
          <div className="px-6 pt-4">
            <div className="mb-2 text-xl font-bold text-white">
              ${product.price.toFixed(2)}
            </div>
            <div className="text-base text-gray-400">
              {product.reviews.length} reviews
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
