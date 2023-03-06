import { type Product } from "../types";
import { useState, useEffect } from "react";
import { ProductCard } from "./Cards/ProductCard";
import { Spinner } from "./Utils/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

const ProductsPage = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_URL}/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setProducts(data.products);
        } else {
          console.log("Error fetching products");
          toast.error("Error fetching products");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
      setIsLoading(false);
    };
    void fetchData();
  }, []);

  return (
    <div className="container mx-auto my-3 px-4">
      <div className="mx-auto mb-4 flex items-center justify-between sm:max-w-5xl">
        <h1 className="text-4xl font-bold">Products</h1>
        <Link to="/products/new">
          <button
            className="text-md mt-2 mr-0 mb-2 rounded-lg bg-gradient-to-br from-purple-600 
        to-blue-500 px-4 py-2 text-center font-medium text-white hover:bg-gradient-to-bl 
        focus:outline-none focus:ring-4 focus:ring-blue-800"
          >
            Create Product
          </button>
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap justify-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
