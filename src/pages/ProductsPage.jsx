import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchSingleProduct } from "../features/products/productsThunk";
import {
  clearSelectedProduct,
  getSelectedProduct,
  getStatus,
} from "../features/products/productsSlice";
import { addToCart, checkIfInCart } from "../features/cart/cartSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const pid = searchParams.get("pid");

  useEffect(() => {
    if (pid) {
      dispatch(fetchSingleProduct(pid));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, pid]);

  // const ifInCart = checkIfInCart(item.id);

  const item = useSelector(getSelectedProduct);
  const status = useSelector(getStatus);
  console.log("status", status);

  const isInCart = useSelector(checkIfInCart(item?.id));
  // console.log("isInCart", isInCart);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(item));
    }
  };

  return (
    <>
      {status == "loading" && (
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 max-w-[950px] mx-auto py-2">
          <div className="w-[95%]  sm:max-w-[280px] sm:min-w-[190px] mx-auto flex items-center">
            <div className="w-full h-72 sm:h-64 bg-gray-200 animate-shimmer rounded-lg "></div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="h-8 w-3/4 bg-gray-200 animate-shimmer mb-2"></div>
            <div className="h-6 w-1/2 bg-gray-200 animate-shimmer mb-2"></div>
            <div className="h-6 w-1/4 bg-gray-200 animate-shimmer mb-2"></div>
            <div className="h-6 w-full bg-gray-200 animate-shimmer mb-2"></div>
            <div className="h-6 w-full bg-gray-200 animate-shimmer mb-2"></div>
          </div>
        </div>
      )}

      {status == "successful" && (
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 max-w-[950px]  mx-auto py-2  ">
          <div className="imgWrapper max-w-[300px] min-w[190px] mx-auto flex items-center ">
            <img src={item?.image} alt="" className="w-full" />
          </div>
          <div className="flex flex-col gap-2 ">
            <h2 className="text-xl font-bold sm:text-2xl">{item.title}</h2>
            <p className="">{`Rating: ${item?.rating?.rate}/5 (${item?.rating?.count})`}</p>
            <div className="flex justify-between my-3">
              <span className="text-2xl font-bold">${item?.price}</span>
              <button
                className={`py-2 px-5 rounded-lg ${
                  isInCart ? "bg-gray-500" : "bg-black text-white"
                }`}
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart ? "Added to cart" : "Add to cart"}
              </button>
            </div>
            <div>
              <h2>Product details</h2>
              <h2>{item?.description}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
