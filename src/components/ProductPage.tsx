import { type Product, type SingleReview } from "../types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ReviewCard } from "./Cards/ReviewCard";
import { Spinner } from "./Utils/Spinner";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

const ProductPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [reviews, setReviews] = useState<SingleReview[]>([]);
  const [ratingAverage, setRatingAverage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      if (id !== null && id !== undefined) {
        try {
          const response = await fetch(`${SERVER_URL}/products/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            const data = await response.json();
            setProduct(data.product);
            setReviews(data.reviews);

            const ratingsSum = data.reviews.reduce(
              (acc: number, review: { rating: number }) => {
                return acc + review.rating;
              },
              0
            );
            const averageRating = ratingsSum / data.reviews.length;
            setRatingAverage(averageRating);
          } else {
            console.log("Error fetching product");
            toast.error("Error fetching product");
          }
        } catch (error) {
          console.error("Error: ", error);
        }
        setIsLoading(false);
      }
    };
    void fetchData();
  }, []);

  return (
    <div className="container mx-auto my-6 p-2">
      {isLoading && <Spinner />}
      {product === undefined && !isLoading && (
        <div className="my-28 flex flex-col items-center justify-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Product not Found</h1>
          <Link
            to="/"
            className="rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >
            Go to Home
          </Link>
        </div>
      )}
      {product !== undefined && !isLoading && (
        <>
          <div className="mb-6 text-white">
            <h1 className="mb-2 text-4xl font-bold">{product.title}</h1>
            <p className="text-lg font-normal">{product.description}</p>
          </div>
          <div className="mb-8 text-white">
            <h2 className="mb-2 text-2xl font-bold">${product.price.toFixed(2)}</h2>
          </div>
          <div className="border-t border-gray-700 pt-4 text-white">
            <h3 className="text-2xl font-bold">Reviews:</h3>
          </div>
          <div className="mb-2 mt-2">
            Average Rating:
            <Rating
              name="half-rating-read"
              value={ratingAverage}
              readOnly
              precision={1}
              size="medium"
              className="top-1 pl-2"
            />
            {ratingAverage.toFixed(2)}/5
          </div>
          <div className="flex flex-wrap justify-center">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
