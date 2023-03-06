/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Grid, Rating, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface ReviewErrors {
  rating?: string;
  comment?: string;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

const ReviewProductModal = ({
  isOpen,
  onClose,
  productId,
}: {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}): JSX.Element => {
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });
  const [errors, setErrors] = useState<ReviewErrors>({});

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name as keyof ReviewErrors] != null)
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const findFormErrors = (): ReviewErrors => {
    const { comment, rating } = review;

    const newErrors: ReviewErrors = {};

    if (rating === 0) newErrors.rating = "Cannot be 0!";
    if (typeof rating !== "number") newErrors.rating = "Must be a number!";
    if (rating < 0) newErrors.rating = "Cannot be less than 0!";
    if (rating > 5) newErrors.rating = "Cannot be more than 5!";
    if (typeof comment !== "string") newErrors.comment = "Must be a string!";
    if (comment.length > 500) newErrors.comment = "Cannot be more than 500 characters!";

    return newErrors;
  };

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        const body = {
          ...review,
          productId,
        };
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken == null) {
          console.log("Access token not found");
          toast.error("Access token not found");
          return;
        }
        const response = await fetch(`${SERVER_URL}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (response.status === 201) {
          console.log("Review Created!");
          console.log(data);
          toast.success("Review Created!");
          onClose();
        }
        if (response.status === 400) {
          setErrors(data);
          console.log(data);
          if (data.message === "Review for this product already exists!") {
            toast.error("Review for this product already exists!");
            return;
          }
          toast.error("Review not created, check errors!");
        }
        if (response.status === 401) {
          console.log(data);
          toast.error("Unauthorized!");
        }
        if (response.status === 500) {
          console.log(data);
          toast.error("Server Error!");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50`}
      >
        <div className="relative mx-auto mt-20 w-full max-w-md">
          <div className="rounded-lg bg-gray-800 shadow-lg">
            <div className="px-4 py-4">
              <>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                  Create a Product
                </h1>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="comment"
                        name="comment"
                        label="Comment"
                        multiline
                        rows={5}
                        value={review.comment}
                        onChange={onInputChange}
                        error={Boolean(errors.comment)}
                        helperText={errors.comment}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Rating
                        name="simple-controlled"
                        value={review.rating}
                        size="large"
                        onChange={(_event, newValue) => {
                          if (newValue != null) {
                            setReview({
                              ...review,
                              rating: newValue,
                            });
                            if (errors.rating !== undefined)
                              setErrors({
                                ...errors,
                                rating: undefined,
                              });
                          }
                        }}
                      />
                      <div className="text-sm text-red-500">{errors.rating}</div>
                    </Grid>
                  </Grid>
                </Box>
              </>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="focus:shadow-outline mr-2 rounded-lg bg-gray-400 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300 focus:outline-none"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="text-md inline-flex items-center rounded-lg bg-[#F7BE38] px-5 py-2.5 text-center font-bold text-gray-900 hover:bg-[#F7BE38]/90"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ReviewProductModal;
