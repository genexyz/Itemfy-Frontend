import { type Product, type SingleReview } from "../types";
import { useState, useEffect } from "react";
import { CompleteReviewCard } from "./Cards/CompleteReviewCard";
import { toast } from "react-toastify";
import { Spinner } from "./Utils/Spinner";
import { Link, useParams } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

const ReviewPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<SingleReview>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      if (id !== null && id !== undefined) {
        try {
          const response = await fetch(`${SERVER_URL}/reviews/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            const data = await response.json();
            setReview(data.review);
            setProduct(data.product);
          } else {
            console.log("Error fetching review");
            toast.error("Error fetching review");
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
      {review === undefined && !isLoading && (
        <div className="my-28 flex flex-col items-center justify-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Review not Found</h1>
          <Link
            to="/"
            className="rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >
            Go to Home
          </Link>
        </div>
      )}
      {review !== undefined && product !== undefined && !isLoading && (
        <>
          <div className="flex flex-wrap justify-center">
            <CompleteReviewCard review={review} product={product} showLink={false} />
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewPage;
