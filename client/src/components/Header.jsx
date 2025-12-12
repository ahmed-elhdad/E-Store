import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaCartPlus, FaSearch } from "react-icons/fa";
import { AppContext } from "../contexts/AppContext";
import Cart from "./Cart";
import PrimaryButton from "./ui/buttons/PrimaryButton";
import Logo from "./ui/logos/Logo";

const Header = () => {
  const { user } = use(AppContext);
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false),
    [showCart, setShowCart] = useState(false);
  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Header */}
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo/Brand */}
            <div className="flex items-center shrink-0">
              <Logo />
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  className="w-full px-4 py-2.5 pl-10 pr-12 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search for products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button className="cursor-pointer absolute right-0 top-0 bottom-0 px-6 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors flex items-center">
                  <FaSearch />
                </button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button
                onClick={() => {
                  if (showCart == true) {
                    setShowCart(false);
                  } else {
                    setShowCart(true);
                  }
                }}
                className="cursor-pointer relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Shopping Cart"
              >
                <FaCartPlus size="1.3rem" />
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {0}
                </span>
              </button>

              {/* User Account - Desktop */}
              {user !== null ? (
                <><div>
                  {user.photo === "" ? (
                    <h2 className="rounded-full size-20 bg-gray-800 text-white text-2xl capitalize">
                      {user.name.slice(0, 2)}
                    </h2>
                  ) : (
                    <img
                      className="size-20 rounded-full"
                      src={user.photo}
                      alt="user profile photo" />
                  )}
                </div><div>
                    {user.photo === "" ? (
                      <h2 className="rounded-full size-20 bg-gray-800 text-white text-2xl capitalize">
                        {user.name.slice(0, 2)}
                      </h2>
                    ) : (
                      <img
                        className="size-20 rounded-full"
                        src={user.photo}
                        alt="user profile photo" />
                    )}
                  </div></>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/auth/login"
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Log in
                  </Link>
                  <Link to="/auth/register">
                    <PrimaryButton text={"register"} />
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="cursor-pointer md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Menu"
              >
                <FaBars size="1.3rem" />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <input
                className="w-full px-4 py-2.5 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
              />
              <FaSearch className="cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                <FaSearch size="0.9rem" />
              </button>
            </div>
          </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden border-t border-gray-200 py-4">
        {user !== null ? (
          <div>
            {user.photo === "" ? (
              <h2 className="rounded-full size-20 bg-gray-800 text-white text-2xl capitalize">
                {user.name.slice(0, 2)}
              </h2>
            ) : (
              <img
                className="size-20 rounded-full"
                src={user.photo}
                alt="user profile photo"
              />
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link
              to="/auth/login"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Log in
            </Link>
            <Link to="/auth/register">
              <PrimaryButton text={"register"} />
            </Link>
          </div>
        )}
      </div>
    )}
  </div>
</header>
    </>
  );
};

export default Header;
