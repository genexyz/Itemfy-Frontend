import Layout from "./components/Layout";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import NotFound from "./components/404";
import ProductsPage from "./components/ProductsPage";
import ReviewsPage from "./components/ReviewsPage";
import ProductPage from "./components/ProductPage";
import ReviewPage from "./components/ReviewPage";
import { Routes, Route } from "react-router-dom";

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="reviews/:id" element={<ReviewPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
