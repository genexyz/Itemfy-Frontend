import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

interface UserErrors {
  email?: string;
  password?: string;
}

const Signin = (): JSX.Element => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<UserErrors>({});
  const navigate = useNavigate();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name as keyof UserErrors] != null)
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const findFormErrors = (): UserErrors => {
    const { email, password } = user;

    const newErrors: UserErrors = {};
    if (email === "") newErrors.email = "Email is required";
    if (email.length === 0) newErrors.email = "Email is required";
    else if (!EMAIL_REGEX.test(email)) newErrors.email = "Invalid email address";
    if (password === "") newErrors.password = "Password is required";
    else if (!PASSWORD_REGEX.test(password))
      newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least one letter, one number, and one special character`;

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
        const response = await fetch(`${SERVER_URL}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (response.status === 200) {
          console.log(data);
          toast.success("Sign in successful!");
          storeData(data.token, data.refreshToken, JSON.stringify(data.user));
          navigate("/");
        }
        if (response.status === 401) {
          toast.error("Invalid credentials!");
          console.log(data);
        }
        if (response.status === 500) {
          toast.error("Server error!");
          console.log(data);
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
    <ThemeProvider theme={darkTheme}>
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
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
            Sign in to your account
          </h1>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Box component="form" onSubmit={submitData} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={onInputChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={onInputChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signin;
