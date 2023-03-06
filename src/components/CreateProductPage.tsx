import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

interface ProductErrors {
  title?: string;
  description?: string;
  price?: string;
}

const CreateProduct = (): JSX.Element => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
  });
  const [errors, setErrors] = useState<ProductErrors>({});
  const navigate = useNavigate();

  const user =
    localStorage.getItem("user") != null
      ? JSON.parse(localStorage.getItem("user") ?? "")
      : "";

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name as keyof ProductErrors] != null)
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const findFormErrors = (): ProductErrors => {
    const { title, description, price } = product;
    const newPrice = parseFloat(price.toString());

    const newErrors: ProductErrors = {};
    if (title === "") newErrors.title = "Cannot be blank!";
    if (typeof title !== "string") newErrors.title = "Must be a string!";
    if (title.length > 100) newErrors.title = "Cannot be more than 100 characters!";
    if (description === "") newErrors.description = "Cannot be blank!";
    if (typeof description !== "string") newErrors.description = "Must be a string!";
    if (description.length > 500)
      newErrors.description = "Cannot be more than 500 characters!";
    if (newPrice === 0) newErrors.price = "Cannot be blank or 0!";
    if (typeof newPrice !== "number") newErrors.price = "Must be a number!";
    if (newPrice < 0) newErrors.price = "Cannot be less than 0!";

    return newErrors;
  };

  const submitData = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        const body = {
          ...product,
          price: parseFloat(product.price.toString()),
        };
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken == null) {
          console.log("Access token not found");
          toast.error("Access token not found");
          return;
        }
        const response = await fetch(`${SERVER_URL}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (response.status === 201) {
          console.log("Product Created!");
          console.log(data);
          toast.success("Product Created!");
          navigate(`/products`);
        }
        if (response.status === 400) {
          setErrors(data);
          toast.error("Product not created, check errors!");
          console.log(data);
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
      <Container component="main" maxWidth="sm">
        {user === "" && (
          <div className="my-28 flex flex-col items-center justify-center">
            <h1 className="mb-4 text-4xl font-bold text-white">
              Sign in to create a product
            </h1>
            <Link
              to="/signin"
              className="rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-700"
            >
              Sign In
            </Link>
          </div>
        )}
        {user !== null && user !== "" && (
          <>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Create a Product
              </h1>

              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <Box component="form" noValidate onSubmit={submitData} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="title"
                      name="title"
                      label="Title"
                      autoFocus
                      value={product.title}
                      onChange={onInputChange}
                      error={Boolean(errors.title)}
                      helperText={errors.title}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      value={product.description}
                      onChange={onInputChange}
                      error={Boolean(errors.description)}
                      helperText={errors.description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="price"
                      name="price"
                      label="Price"
                      type="number"
                      value={product.price}
                      onChange={onInputChange}
                      error={Boolean(errors.price)}
                      helperText={errors.price}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Create Product
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CreateProduct;
