import { type SingleReview, type CompleteReview } from "../../types";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

export const CompleteReviewCard = ({
  review,
  product,
  showLink,
}: {
  review: SingleReview;
  product: CompleteReview["product"];
  showLink: boolean;
}): JSX.Element => {
  const { rating, comment } = review;

  // TODO: Refactor this to not duplicate code

  return (
    <div key={review._id} className="m-2 w-full max-w-lg p-2 lg:w-1/2">
      {showLink && (
        <Link to={`/reviews/${review._id}`}>
          <div className="flex flex-col justify-start rounded-lg border border-gray-700 bg-gray-800 p-6 shadow hover:bg-gray-700 sm:flex-row">
            <div className="border-gray-700 pb-6 sm:border-r sm:pr-2 sm:pb-0">
              <h5 className="mb-1 text-lg font-bold tracking-tight text-white">
                {product.title}
              </h5>
              <p className="mb-4 max-h-32 overflow-scroll text-base text-gray-400">
                {product.description}
              </p>
              <div className="mt-auto text-xl font-bold text-white">
                ${product.price.toFixed(2)}
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6 pl-0 sm:mx-auto sm:flex sm:flex-col sm:border-t-0 sm:pt-0 sm:pl-4">
              <span className="font-bold">Comment:</span>
              <div className="mb-4 max-h-48 overflow-scroll text-base text-gray-400">
                <p>{comment}</p>
              </div>
              <Rating
                name="half-rating-read"
                value={rating}
                readOnly
                precision={1}
                size="medium"
                className="sm:mt-1"
              />
            </div>
          </div>
        </Link>
      )}
      {!showLink && (
        <div className="flex flex-col justify-start rounded-lg border border-gray-700 bg-gray-800 p-6 shadow sm:flex-row">
          <div className="border-gray-700 pb-6 sm:border-r sm:pr-2 sm:pb-0">
            <h5 className="mb-1 text-lg font-bold tracking-tight text-white">
              {product.title}
            </h5>
            <p className="mb-4 max-h-32 overflow-scroll text-base text-gray-400">
              {product.description}
            </p>
            <div className="mt-auto text-xl font-bold text-white">
              ${product.price.toFixed(2)}
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 pl-0 sm:mx-auto sm:flex sm:flex-col sm:border-t-0 sm:pt-0 sm:pl-4">
            <span className="font-bold">Comment:</span>
            <div className="mb-4 max-h-48 overflow-scroll text-base text-gray-400">
              <p>{comment}</p>
            </div>
            <Rating
              name="half-rating-read"
              value={rating}
              readOnly
              precision={1}
              size="medium"
              className="sm:mt-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};
