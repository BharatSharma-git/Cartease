import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const ProductCard = ({ item }) => {
  // console.log("hello");
  // const [searchParam, setSearchParam] = useSearchParams();

  return (
    <Link to={`/product-details?pid=${item.id}`}>
      <div className="grid grid-rows-[300px,80px]  py-4 px-5 gap-5  border-2 broder-black">
        <div className="w-full h-full flex justify-center">
          <img src={item.image} alt="" className="  " />
        </div>
        <div className="flex flex-col justify-between">
          <h2 className="text-md font-bold line-clamp-2">{item.title}</h2>
          <h2 className="text-lg">${item.price}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
