import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CategoryIcon from "@mui/icons-material/Category";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const logoutUser = (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setAnchorElUser(null);
    toast.success("Signed out successfully");
    navigate("/signin");
  };

  const userImageUrl = "https://cdn-icons-png.flaticon.com/512/1144/1144709.png";

  let user = false;
  const result = localStorage.getItem("user");
  if (result !== null && typeof result === "string") {
    user = true;
  }

  return (
    <>
      <AppBar position="static" color="secondary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CategoryIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Link to="/" component={RouterLink} color="inherit" underline="none">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                PRODUCTS-APP
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link
                  to="/products"
                  component={RouterLink}
                  color="inherit"
                  underline="none"
                >
                  <MenuItem key="products" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Products</Typography>
                  </MenuItem>
                </Link>
                <Link
                  to="/reviews"
                  component={RouterLink}
                  color="inherit"
                  underline="none"
                >
                  <MenuItem key="reviews" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Reviews</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
            <CategoryIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Link to="/" component={RouterLink} color="inherit" underline="none">
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
                textAlign="center"
              >
                PRODUCTS-APP
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link
                to="/products"
                component={RouterLink}
                color="inherit"
                underline="none"
              >
                <Button
                  key="products"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Products
                </Button>
              </Link>
              <Link to="/reviews" component={RouterLink} color="inherit" underline="none">
                <Button
                  key="reviews"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Reviews
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user icon" src={userImageUrl} />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* TODO: Repeated validations to quickly bypass a MUI error with React Fragments */}
                {!user && (
                  <Link
                    to="/signin"
                    component={RouterLink}
                    color="inherit"
                    underline="none"
                  >
                    <MenuItem key="signin" onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Sign in</Typography>
                    </MenuItem>
                  </Link>
                )}
                {!user && (
                  <Link
                    to="/signup"
                    component={RouterLink}
                    color="inherit"
                    underline="none"
                  >
                    <MenuItem key="signup" onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Sign up</Typography>
                    </MenuItem>
                  </Link>
                )}
                {user && (
                  <MenuItem key="signout" onClick={logoutUser}>
                    <Typography textAlign="center">Sign out</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
      <ToastContainer autoClose={2500} />
    </>
  );
};
export default Layout;
