import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getCartLength,
  getCartList,
} from "../features/cart/cartSlice";
import { MdAddShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Cart from "../features/cart/Cart";
import { useUser } from "@clerk/clerk-react";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartListLength = useSelector(getCartLength);

  const cartItems = useSelector(getCartList);
  const { user } = useUser();

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
  }, [cartItems]);

  return (
    <div className="py-4">
      {cartListLength ? (
        <div className="border-2 border-black rounded-lg  max-w-[1000px] mx-auto py-5 px-8 flex flex-col ">
          <div>
            <h1 className="text-xl font-bold">Shopping Cart</h1>
            <button onClick={() => dispatch(clearCart())}>
              <span className="text-blue-500 text-sm">Remove all items</span>
            </button>
            <hr className="mt-2" />
            <Cart />
          </div>
        </div>
      ) : (
        <div className="border-2 border-black rounded-lg min-h-[250px] max-w-[700px] mx-auto p-5 flex flex-col items-center justify-center">
          <MdAddShoppingCart size={50} />
          <h1 className="text-xl font-bold ">Your cart in empty</h1>
          <NavLink to={`/`}>
            <h1 className="text-blue-500 hover:font-bold">Continue Shoping</h1>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default CartPage;
