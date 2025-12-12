import React, { use, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { formDataInstance } from "../api/axiosInstance";

const AddPrudoct = () => {
  const { user } = use(AppContext);
  const [formData, setFormData] = useState({
      title: "",
      description: "",
      quantity: 0,
      categoy: "",
      images: [],
      price: 0,
    }),
    [errors, setErros] = useState({
      title: "",
      description: "",
      quantity: "",
      categoy: "",
      images: "",
      price: "",
    }),
    validation = async () => {
      // Check if data empty
      if (!formData.title) {
        setErros({ ...errors, title: "title required" });
        return;
      } else {
        setErros({ ...errors, title: "" });
      }
      if (!formData.description) {
        setErros({ ...errors, description: "description required" });
        return;
      } else {
        setErros({ ...errors, description: "" });
      }
      if (!formData.quantity || formData.quantity == 0) {
        setErros({ ...errors, quantity: "quantity required" });
        return;
      } else {
        setErros({ ...errors, quantity: "" });
      }
      if (!formData.categoy) {
        setErros({ ...errors, categoy: "categoy required" });
        return;
      } else {
        setErros({ ...errors, categoy: "" });
      }
      if (!formData.images || formData.images.length == 0) {
        setErros({ ...errors, images: "images required" });
        return;
      } else {
        setErros({ ...errors, images: "" });
      }
      if (!formData.price) {
        setErros({ ...errors, price: "price required" });
        return;
      } else {
        setErros({ ...errors, price: "" });
      }
    };
  let res;
  const handleSubmit = async (e) => {
    e.preventDefault();
    validation();
    res = formDataInstance.post("/prudocts", {
      body: JSON.stringify(formData),
    });
  };
  const categories = ["tech", "home", "kitchen"];
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form className="" onSubmit={handleSubmit} method="post">
          <div className="flex w-auto flex-col justify-center items-baseline">
            <label htmlFor="" className="font-medium capitalize">
              title <span className="text-blue-600">*</span>
            </label>
            <input
              type="text"
              className={`outline-none p-2 border-2 rounded ${
                errors.title ? "border-red-400" : "border-blue-400"
              } transition-colors focus:${
                errors.title ? "border-red-600" : "border-blue-500"
              } transition-colors  w-full p-3`}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {errors.title && (
              <span className="capitalize text-red-400 font-small">
                {errors.title}
              </span>
            )}
          </div>
          <div className="flex w-auto flex-col justify-center items-baseline">
            <label htmlFor="" className="font-medium capitalize">
              description <span className="text-blue-600">*</span>
            </label>
            <input
              type="text"
              className={`outline-none p-2 border-2 rounded ${
                errors.description ? "border-red-400" : "border-blue-400"
              } transition-colors focus:${
                errors.description ? "border-red-600" : "border-blue-500"
              } transition-colors  w-full p-3`}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            {errors.description && (
              <span className="capitalize text-red-400 font-small">
                {errors.description}
              </span>
            )}
          </div>
          <div className="flex w-auto flex-col justify-center items-baseline">
            <label className="font-medium capitalize">
              category <span className="text-blue-600">*</span>
            </label>
            <select
              name=""
              id=""
              className="outline-none cursor-pointer w-full p-3 border-2 border-blue-400 rounded"
            >
              <option disabled value="dfads">
                category
              </option>
              {categories.map((c, index) => (
                <option
                  onClick={(e) =>
                    setFormData({ ...formData, categoy: e.textContent })
                  }
                  className="capitalize cursor-pointer"
                  key={index}
                  value={c}
                >
                  {c}
                </option>
              ))}
            </select>
            {errors.categoy && (
              <span className="capitalize text-red-400 font-small">
                {errors.categoy}
              </span>
            )}
          </div>
          <div className="flex w-auto flex-col justify-center items-baseline">
            <label htmlFor="price-input" className="font-medium capitalize">
              price <span className="text-blue-600">*</span>
            </label>
            <input
              name="price-input"
              type="number"
              className={`outline-none p-2 border-2 rounded ${
                errors.price ? "border-red-400" : "border-blue-400"
              } transition-colors focus:${
                errors.price ? "border-red-600" : "border-blue-500"
              } transition-colors  w-full p-3`}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
            />
            {errors.price && (
              <span className="capitalize text-red-400 font-small">
                {errors.price}
              </span>
            )}
          </div>
          <div className="flex w-auto flex-col justify-center items-baseline">
            <label htmlFor="quantity-input" className="font-medium capitalize">
              quantity <span className="text-blue-600">*</span>
            </label>
            <input
              name="quantity-input"
              type="number"
              className={`outline-none p-2 border-2 rounded ${
                errors.quantity ? "border-red-400" : "border-blue-400"
              } transition-colors focus:${
                errors.quantity ? "border-red-600" : "border-blue-500"
              } transition-colors  w-full p-3`}
              onChange={(e) =>
                setFormData({ ...formData, quantity: Number(e.target.value) })
              }
            />
            {errors.quantity && (
              <span className="capitalize text-red-400 font-small">
                {errors.quantity}
              </span>
            )}
          </div>
          <div className="flex w-auto flex-col justify-center items-baseline">
            <label htmlFor="images-input" className="font-medium capitalize">
              images <span className="text-blue-600">*</span>
            </label>
            <input
              name="images-input"
              className={`w-50 outline-none p-2 border-2 rounded ${
                errors.images ? "border-red-400" : "border-blue-400"
              } transition-colors focus:${
                errors.images ? "border-red-600" : "border-blue-500"
              } transition-colors  w-full p-3`}
              type="file"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images: [...formData.images, e.target.value],
                })
              }
            />
            {errors.images && (
              <span className="capitalize text-red-400 font-small">
                {errors.images}
              </span>
            )}
            <span className="text-gray-500">up to 10 files</span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white capitalize font-bold p-3 rounded-lg w-full cursor-pointer hover:bg-blue-600 transition-colors"
          >
            {!res && "send"}
            {res && typeof res === Object ? (
              "created successfully"
            ) : res.message ? (
              <span>{res.message}</span>
            ) : (
              <span>{res.error}</span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPrudoct;
