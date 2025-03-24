import React, { useEffect } from "react";
import ProductsList from "../features/products/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncProducts } from "../features/products/productsThunk";
import { getStatus } from "../features/products/productsSlice";
import loaderLogo from "../assets/images/cartEaseLogo.png";
import { useUser } from "@clerk/clerk-react";
import {
  checkIfCartIsLoaded,
  getCartLoadingStatus,
} from "../features/cart/cartSlice";
import { fetchCartItems } from "../features/cart/cartThunk";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncProducts());
  }, [dispatch]);

  const { user } = useUser();
  const cartIsLoaded = useSelector(getCartLoadingStatus);

  useEffect(() => {
    const loadingCart = () => {
      if (user) {
        const cartItems = user?.unsafeMetadata?.cartItems || [];
        cartItems.forEach((item) => {
          // console.log("item.id", item.id);
          dispatch(fetchCartItems({ id: item.id, quantity: item.quantity }));
        });
        // dispatch(loadCart(cartItems));
      }
    };

    dispatch(checkIfCartIsLoaded());
    // console.log("cartIsLoaded", cartIsLoaded);
    if (!cartIsLoaded) {
      loadingCart();
    }
  }, [dispatch]);

  const status = useSelector(getStatus);

  return (
    <div className="relative">
      {/* {status == "loading" && (
        <div className=" h-screen w-screen fixed inset-0 z-50   bg-black flex items-center justify-center">
          <img src={loaderLogo} alt="" className="w-[50%] sm:w-[30%] invert " />
        </div>
      )} */}
      {status == "succeeded" && (
        <div>
          {/* <h1>hero Section</h1> */}
          <ProductsList />
        </div>
      )}
    </div>
  );
};

export default HomePage;
