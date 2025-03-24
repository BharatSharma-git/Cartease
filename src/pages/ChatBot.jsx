import { Standard } from "@typebot.io/react";
import { useSelector } from "react-redux";
import { getCartList } from "../features/cart/cartSlice";

const ChatBot = () => {
  const cartList = useSelector(getCartList);
  return (
    <Standard
      typebot="my-typebot-z6eubv5"
      style={{ width: "100%", height: "85vh", marginTop: "20px" }}
      prefilledVariables={cartList}
    />
  );
};
export default ChatBot;
