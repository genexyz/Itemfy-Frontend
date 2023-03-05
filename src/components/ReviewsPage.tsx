import { type CompleteReview } from "../types";
import { useState, useEffect } from "react";
import { CompleteReviewCard } from "./Cards/CompleteReviewCard";
import { toast } from "react-toastify";
import { Spinner } from "./Utils/Spinner";

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

const ReviewsPage = (): JSX.Element => {
  const [reviews, setReviews] = useState<CompleteReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_URL}/reviews`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setReviews(data.reviews);
        } else {
          console.log("Error fetching reviews");
          toast.error("Error fetching reviews");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
      setIsLoading(false);
    };
    void fetchData();
  }, []);

  return (
    <div className="container mx-auto my-6 px-4">
      <h1 className="pb-3 text-4xl font-bold">Reviews</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap justify-center">
          {reviews.map((review) => (
            <CompleteReviewCard
              key={review._id}
              review={{
                _id: review._id,
                comment: review.comment,
                rating: review.rating,
                product: review.product._id,
              }}
              product={review.product}
              showLink={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
