import { type SingleReview } from "../../types";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

export const ReviewCard = ({ review }: { review: SingleReview }): JSX.Element => {
  const { rating, comment } = review;
  return (
    <div key={review._id} className="m-3 w-80">
      <Link to={`/reviews/${review._id}`}>
        <div className="block rounded-lg border border-gray-700 bg-gray-800 p-2 shadow hover:bg-gray-700">
          <div className="mb-2">
            <Rating
              name="half-rating-read"
              value={rating}
              readOnly
              precision={1}
              size="medium"
              className="mt-2"
            />
          </div>
          <p className="max-h-36 overflow-scroll font-normal text-gray-400">{comment}</p>
        </div>
      </Link>
    </div>
  );
};
