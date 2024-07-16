import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import StandardLayout from "./Components/Layout";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Profile from "./Pages/Profile";
import Product from "./Pages/Product";
import ProductDetail from "./Pages/ProductDetail";
import Console from "./Pages/Console";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import { useEffect } from "react";
import { fetchCurrentUser } from "./Redux/userSlice";
import { fetchCategories } from "./Redux/CategorySlice";
import store from "./Redux/store";

import "./App.css";

function App() {
  useEffect(() => {
    store.dispatch(fetchCurrentUser());
    store.dispatch(fetchCategories());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<StandardLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="product" element={<Product />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="console/*" element={<Console />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
