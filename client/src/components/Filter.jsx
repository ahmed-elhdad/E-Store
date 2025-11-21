import { useState } from "react";
import { AppContext } from "../contexts/AppContext";

const Filter = () => {
  const [searchFilter, setSearchFilter] = useState({
    price: 0,
    payment: "online",
  });
  return (
    <div className="w-3xs md:hidden sm:hidden">
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
            20 ~ 60
          </li>
          <li
            className="cursor-pointer font-medium hover:bg-white/5"
            onClick={(e) => {
              setSearchFilter(...searchFilter, {
                price: e.target.value.strip(),
              });
            }}
          >
            60 ~ 80
          </li>
          <li
            className="cursor-pointer font-medium hover:bg-white/5"
            onClick={(e) => {
              setSearchFilter(...searchFilter, {
                price: e.target.value.strip(),
              });
            }}
          >
            80 ~ 100
          </li>
          <li
            className="cursor-pointer font-medium hover:bg-white/5"
            onClick={(e) => {
              setSearchFilter(...searchFilter, {
                price: e.target.value.strip(),
              });
            }}
          >
            100 ~ 200
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
            with receive
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
            online
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
