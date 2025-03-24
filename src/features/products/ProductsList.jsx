import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllProducts, getStatus } from "./productsSlice";
import ProductCard from "../../components/ProductCard";
import loaderLogo from "../../assets/images/cartEaseLogo.png";

const ProductsList = () => {
  const { items } = useSelector(getAllProducts);
  const status = useSelector(getStatus);

  return (
    <>
      <div className="productsList grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-center gap-2 py-4  ">
        {/* {status == "loading" && (
          <div className="h-svh w-svw  bg-black flex items-center justify-center">
            <img src={loaderLogo} alt="" className="w-[50%] invert " />
          </div>
        )} */}

        {status == "succeeded" &&
          items.map((item) => <ProductCard key={item.id} item={item} />)}
        {status == "failed" && <h1>failed {error}</h1>}
      </div>
    </>
  );
};

export default ProductsList;
