import { type Product } from "../types";
import { useState, useEffect } from "react";
import { ProductCard } from "./Cards/ProductCard";
import { Spinner } from "./Utils/Spinner";

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
        }
      } catch (error) {
        console.error("Error: ", error);
      }
      setIsLoading(false);
    };
    void fetchData();
  }, []);

  console.log(products);

  return (
    <div className="container mx-auto my-6 px-4">
      <h1 className="text-4xl font-bold">Products</h1>
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
