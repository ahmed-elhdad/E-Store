import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantityButton = ({ foundQuantity, quantity, setQuantity }) => {
  return (
    <>
      <button
        onClick={(e) => e.preventDefault()}
        className="cursor-pointer mt-1 w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center p-2  bg-white hover:bg-white/50 text-gray-900 font-medium transition-all"
      >
        <span
          onClick={(e) => {
            e.preventDefault();
            if (quantity == 1 || quantity == 0) {
              return;
            }
            setQuantity(quantity - 1);
          }}
        >
          <FaMinus />
        </span>
        <h3>{quantity}</h3>
        <span
          onClick={(e) => {
            e.preventDefault();
            if (foundQuantity <= quantity) {
              return;
            }
            setQuantity(quantity + 1);
          }}
        >
          <FaPlus />
        </span>
      </button>
    </>
  );
};

export default QuantityButton;
