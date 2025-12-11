import { FaCartPlus } from "react-icons/fa";

const AddToCart = ({ AddToCart }) => {
  return (
    <button
      type="button"
      className="cursor-pointer inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
    >
      Add to cart
    </button>
  );
};

export default AddToCart;
