import React from "react";
import { Link } from "react-router-dom";

const CategorySection = ({
  title,
  items,
  discoverMoreLink,
  discoverMoreText = "Discover more",
  linkKey = "link",
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-4xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer flex flex-col items-center"
            >
              {item.img && (
                <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-100 mb-2 max-w-[200px] sm:max-w-[220px]">
                  <img
                    src={item.img}
                    alt={item.txt || item.name || `Category ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              {item.txt && (
                <h3 className="text-center text-sm sm:text-base font-medium text-gray-900 capitalize px-2">
                  {item.txt}
                </h3>
              )}
              {item.name && !item.txt && (
                <h3 className="text-center text-sm sm:text-base font-medium text-gray-900 capitalize px-2">
                  {item.name}
                </h3>
              )}
            </div>
          ))}
        </div>
        {discoverMoreLink && (
          <div className="text-center mt-8">
            <Link
              to={discoverMoreLink}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              {discoverMoreText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
