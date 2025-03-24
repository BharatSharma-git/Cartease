import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";
import PageNotFound from "./pages/PageNotFound";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./pages/CheckoutPage";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import {
  checkIfCartIsLoaded,
  getCartList,
  getCartLoadingStatus,
} from "./features/cart/cartSlice";
import { fetchCartItems } from "./features/cart/cartThunk";
import ChatBot from "./pages/ChatBot";
const stripe_key = import.meta.env.VITE_STRIPE_KEY; 

const stripeProvider = await loadStripe(
  `${stripe_key}`
);

const App = () => {
  const cartItems = useSelector(getCartList);
  const dispatch = useDispatch();
  const { user } = useUser();

  // -------------------------------

  // ---------------------

  useEffect(() => {
    if (user) {
      const cartItemsToSave = cartItems.map(({ id, quantity }) => ({
        id,
        quantity,
      }));
      user.update({
        unsafeMetadata: { cartItems: cartItemsToSave },
      });
    }
  }, [cartItems, dispatch]);

  return (
    <Elements stripe={stripeProvider}>
      <div className="app my-2 mx-3 md:mx-12">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/product-details"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <PageNotFound />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <ProtectedRoute>
                  <ChatBot />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </Elements>
  );
};

export default App;
