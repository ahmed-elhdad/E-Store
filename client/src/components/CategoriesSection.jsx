import React from "react";
import Loading from "./Laoding";
import { Link } from "react-router";
const CategoriesSection = (props) => {
  return (
    <div className="cursor-pointer overflow-x-scroll px-4 flex items-center gap-5 justify-center">
      {props.data.map((category, index) => (
        <Link key={index} to={`${category.name}`}>
          <div
            key={index}
            className="flex flex-col gap-3 items-center justify-center"
          >
            <img
              src={category.img}
              className="size-60 rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
              alt={category.name}
            />
            <h3 className="font-medium capitalize">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesSection;
