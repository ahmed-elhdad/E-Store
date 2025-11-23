import { use, useState } from "react";
import { AppContext } from "../contexts/AppContext";

const Filter = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    price: props.price,
    payment: props.payment,
  });

  return (
    <div className="w-3xs min-h-screen p-2 sm:hidden md:flex flex-col">
      <div className="flex flex-col gap-2" id="price">
        <h3 className="font-medium capitalize">price</h3>
        <ul aria-label="price">
          <li
            className="cursor-pointer font-medium hover:bg-white/5"
            onClick={(e) => {
              setSearchFilter(...searchFilter, {
                price: e.target.value.strip(),
              });
            }}
          >
            <input type="checkbox" /> 20 ~ 60
          </li>
          <li
            className="cursor-pointer font-medium hover:bg-white/5"
            onClick={(e) => {
              setSearchFilter(...searchFilter, {
                price: e.target.value.strip(),
              });
            }}
          >
            <input type="checkbox" /> 60 ~ 80
          </li>
          <li
            className="cursor-pointer font-medium hover:bg-white/5"
            onClick={(e) => {
              setSearchFilter(...searchFilter, {
                price: e.target.value.strip(),
              });
            }}
          >
            <input type="checkbox" /> 80 ~ 100
          </li>
          <li
            className="cursor-pointer font-medium hover:bg-white/5"
            onClick={(e) => {
              setSearchFilter(...searchFilter, {
                price: e.target.value.strip(),
              });
            }}
          >
            <input type="checkbox" /> 100 ~ 200
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2" id="payment">
        <h3 className="font-medium capitalize">payment</h3>
        <ul aria-label="payment">
          <li
            className="cursor-pointer font-medium hover:bg-white/5"
            onClick={(e) => {
              setSearchFilter(...searchFilter, {
                payment: e.target.value.strip(),
              });
            }}
          >
            <input type="checkbox" /> with receive
          </li>
          <li
            className="cursor-pointer font-medium hover:bg-white/5"
            onClick={(e) => {
              setSearchFilter({
                ...searchFilter,
                payment: e.target.value,
              });
            }}
          >
            <input type="checkbox" /> online
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
