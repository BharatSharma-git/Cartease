import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemQuantity,
  getCartList,
  getCartTotal,
  reduceItemQuantity,
} from "./cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa";
import { nanoid } from "@reduxjs/toolkit";
import { NavLink, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const list = useSelector(getCartList);
  const cartTotal = useSelector(getCartTotal);
  // console.log("list", list);

  return (
    <div>
      {list.map((item) => (
        // <div className="flex items-center justify-between gap-3">
        <div
          key={nanoid()}
          className="grid grid-cols-1 sm:grid-cols-[1fr,200px] gap-5 my-12 sm:my-8"
        >
          <div className="flex gap-4 items-center">
            <img src={item.image} alt="" className="h-14 w-14" />
            <div>
              <h2 className="font-semibold max-w-[50ch]">{item.title}</h2>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center  gap-3 border-2 border-black rounded-lg px-2 py-1">
              <button onClick={() => dispatch(reduceItemQuantity(item.id))}>
                <FaMinus />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(addItemQuantity(item.id))}>
                <FaPlus />
              </button>
            </div>
            <div>
              <h2>${item.price}</h2>
            </div>
          </div>
        </div>
      ))}
      <hr className="pb-2" />
      <div className="flex justify-between items-center">
        <div className="text-right mt-4 hover:scale-[1.02] ">
          <NavLink
            to="/checkout"
            className="bg-green-600 opacity-90 hover:opacity-100  text-white font-bold py-3 px-5 rounded-3xl transition-all "
          >
            Proceed to pay
          </NavLink>
        </div>
        <div className="text-right">
          <h1 className="text-lg">Total</h1>
          <span className="text-lg font-bold">${cartTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
