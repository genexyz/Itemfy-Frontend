import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

interface User {
  email?: string;
  password?: string;
  name?: string;
}

const Signup = (): JSX.Element => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<User>({});
  const navigate = useNavigate();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name as keyof User] != null)
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const findFormErrors = (): User => {
    const { email, password, name } = user;

    const newErrors: User = {};
    if (email === "") newErrors.email = "Email is required";
    if (email.length === 0) newErrors.email = "Email is required";
    else if (!EMAIL_REGEX.test(email)) newErrors.email = "Invalid email address";
    if (password === "") newErrors.password = "Password is required";
    else if (!PASSWORD_REGEX.test(password))
      newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least one letter, one number, and one special character`;
    if (name === "") newErrors.name = "Name is required";
    if (name.length > 100) newErrors.name = "Name cannot be more than 100 characters";

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
          ...user,
        };
        const response = await fetch(`${SERVER_URL}/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (response.status === 201) {
          console.log("User Signed Up!");
          console.log(data);
          toast.success("User Signed Up!");
          storeData(data.token, data.refreshToken, JSON.stringify(data.user));
          navigate("/");
        }
        if (response.status === 400) {
          if (data.message === "Email already registered") {
            setErrors({ email: data.message });
          } else {
            setErrors(data);
          }
          toast.error("User not signed up, check errors!");
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

  const storeData = (accessToken: string, refreshToken: string, user: string): void => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", user);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Box component="form" noValidate onSubmit={submitData} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={user.name}
                onChange={onInputChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={onInputChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={user.password}
                onChange={onInputChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
