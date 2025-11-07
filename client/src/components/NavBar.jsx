import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { staticContext } from "../contexts/staticContext";

const NavBar = () => {
  const { navBarItems } = useContext(staticContext);

  if (!navBarItems || navBarItems.length === 0) {
    return (
      <nav className="bg-gray-100 p-4">
        <h1 className="text-center">Loading...</h1>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-100 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-8 py-4">
          {navBarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="text-gray-700 hover:text-gray-900 font-medium capitalize transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
