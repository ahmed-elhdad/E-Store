import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { usePrudoct } from "../api/hooks/usePrudcot";
import Laoding from "../components/Laoding";
import Header from "../components/Header";
import QuantityButton from "../components/ui/buttons/QuantityButton";
import AddToCart from "../components/ui/buttons/AddToCart";
import { defaultInstance } from "../api/axiosInstant";

const Prudoct = () => {
  const { id } = useParams();
  const { isLoading, isError, data } = usePrudoct({ id: id }),
    [quantity, setQuantity] = React.useState(1),
    handleAddToCart = async (e) => {
      e.preventDefault();
      const res = defaultInstance.post("/cart/add", {
        body: {
          productId: id,
          quantity: quantity,
        },
      });
    };
  if (isError) return <h1>some thing went wrong</h1>;
  if (isLoading) return <Laoding />;

  return (
    <>
      <Header />
      <div className="relative top-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden border bg-white">
              <img
                src={data.images[0]}
                alt={data.title}
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="flex gap-3">
              {data.images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className="cursor-pointer shrink-0 w-20 h-20 rounded-md overflow-hidden border hover:scale-105 transition"
                >
                  <img
                    src={src}
                    alt={`${data.title}-thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Product info (inspired by Tailwind product-overview #3) */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                {data.title}
              </h1>
              <p className="text-2xl font-medium text-gray-900">
                ${data.price}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center text-yellow-500">
                {/* simple stars from rating if available */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(data.rating?.rate || 0)
                        ? "fill-current"
                        : "stroke-current text-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.92-.755 1.688-1.54 1.118l-3.385-2.462a1 1 0 00-1.175 0l-3.385 2.462c-.784.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69L9.05 2.927z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {data.category || "Uncategorized"}
              </p>
            </div>
            <p className="mt-6 text-gray-700 leading-relaxed">
              {data.description}
            </p>
            <div className="mt-8">
              <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <QuantityButton
                    quantity={quantity}
                    setQuantity={setQuantity}
                    foundQuantity={data.quantity}
                  />
                </div>
                {/* Placeholder for variants if present */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Options
                  </label>
                  <select className="cursor-pointer mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
                    <option>Default</option>
                  </select>
                </div>
              </form>
              <div className="mt-6 flex gap-3">
                <AddToCart AddToCart={handleAddToCart} />
                <button
                  type="button"
                  className="cursor-pointer inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  Buy now
                </button>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p>Free returns • 30-day warranty</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prudoct;
