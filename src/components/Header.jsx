import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import cartEaseLogo from "../assets/images/cartEaseLogoCrop.png";
import { IoMdCart } from "react-icons/io";
import { useSelector } from "react-redux";
import { getCartLength } from "../features/cart/cartSlice";
import { UserButton } from "@clerk/clerk-react";
import { RiRobot2Fill } from "react-icons/ri";

const Header = () => {
  const cartListLength = useSelector(getCartLength);

  return (
    <nav className="flex justify-between items-center py-2 ">
      <NavLink to="/" className="flex items-center gap-3">
        <img src={cartEaseLogo} alt="img" className="w-14   sm:w-16" />
        <div className=" logo__text hidden sm:flex flex-col justify-center items-center leading-none">
          <span className=" sm:text-2xl  font-bold p-0">Cartease</span>
          {/* <span className="text-sm">Shoping</span> */}
        </div>
      </NavLink>
      <div className="flex items-center gap-4 relative ">
        <NavLink to="/chatbot">
          <RiRobot2Fill size={30} />
        </NavLink>

        <NavLink to="/cart">
          <IoMdCart size={30} />
          {cartListLength ? (
            <span className="absolute top-[-10px] right-[53px] bg-green-600 rounded-lg text-white text-[10px] px-[4px]">
              {cartListLength}
            </span>
          ) : null}
        </NavLink>

        <UserButton />
      </div>
    </nav>
  );
};

export default Header;
