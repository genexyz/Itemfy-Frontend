import { type Product, type SingleReview } from "../types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ReviewCard } from "./Cards/ReviewCard";
import { Spinner } from "./Utils/Spinner";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";
import ReviewProductModal from "./Modals/ReviewModal";

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

const ProductPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [reviews, setReviews] = useState<SingleReview[]>([]);
  const [alreadyReviewed, setAlreadyReviewed] = useState<boolean>(false);
  const [ratingAverage, setRatingAverage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const onClose = (): void => {
    setIsModalOpen(false);
    setRefresh(!refresh);
  };

  const handleReviewClick = (): void => {
    setIsModalOpen(true);
  };

  const user =
    localStorage.getItem("user") != null
      ? JSON.parse(localStorage.getItem("user") ?? "")
      : "";

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);

      if (id !== null && id !== undefined) {
        let fetchUrl = `${SERVER_URL}/products/public/${id}`;
        let accessToken = null;
        let headers: any = {
          "Content-Type": "application/json",
        };
        if (user !== "") {
          fetchUrl = `${SERVER_URL}/products/${id}`;
          accessToken = localStorage.getItem("accessToken");
          if (accessToken == null) {
            console.log("Access token not found");
            toast.error("Access token not found");
            return;
          } else {
            headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            };
          }
        }
        try {
          const response = await fetch(fetchUrl, {
            method: "GET",
            headers,
          });
          if (response.status === 200) {
            const data = await response.json();
            setProduct(data.product);
            setReviews(data.reviews);
            if (user !== "") {
              setAlreadyReviewed(data.alreadyReviewed);
            }
            if (data.reviews.length === 0) {
              setRatingAverage(0);
            } else {
              const ratingsSum = data.reviews.reduce(
                (acc: number, review: { rating: number }) => {
                  return acc + review.rating;
                },
                0
              );
              const averageRating = ratingsSum / data.reviews.length;
              setRatingAverage(averageRating);
            }
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
  }, [refresh]);

  return (
    <div className="container mx-auto my-6 max-w-6xl p-2">
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
          {Boolean(user) && !alreadyReviewed && (
            <div className="mt-8 mb-4">
              <button
                className="text-md inline-flex items-center rounded-lg bg-[#F7BE38] px-5 py-2.5 text-center font-bold text-gray-900 hover:bg-[#F7BE38]/90"
                onClick={handleReviewClick}
              >
                Review this product
              </button>
            </div>
          )}
          <div className="border-t border-gray-700 pt-4 text-white">
            <h3 className="text-2xl font-bold">Reviews:</h3>
          </div>
          <div className="mb-2 mt-2">
            Average Rating:
            <Rating
              name="half-rating-read"
              value={ratingAverage}
              readOnly
              precision={0.5}
              size="medium"
              className="top-1 pl-2 pr-2"
            />
            {ratingAverage.toFixed(2)}/5
          </div>
          <div className="flex flex-wrap justify-center">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
          <ReviewProductModal
            isOpen={isModalOpen}
            onClose={onClose}
            productId={id as string}
          />
        </>
      )}
    </div>
  );
};

export default ProductPage;
