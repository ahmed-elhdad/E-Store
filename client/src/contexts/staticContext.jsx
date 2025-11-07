import React from "react";
import { createContext } from "react";
export const staticContext = createContext(null);
const staticContextProvider = ({ children }) => {
  const navBarItems = [
    {
      name: "tech",
      link: "/prudocts/tech",
    },
    {
      name: "sport",
      link: "/prudocts/sport",
    },
    {
      name: "kitchen",
      link: "/prudocts/kitchen",
    },
    {
      name: "home",
      link: "/prudocts/home",
    },
  ];
  const gamesPrefixes = [
    {
      name: "Head phones",
      link: "/prudacts/tech/headPhones",
    },
    {
      name: "keyboards",
      link: "/prudacts/tech/keyboards",
    },
    {
      name: "mouses",
      link: "/prudacts/tech/mouses",
    },
    {
      name: "chairs",
      link: "/prudacts/tech/chairs",
    },
  ];
  const value = { navBarItems, gamesPrefixes };
  return (
    <staticContext.Provider value={value}>{children}</staticContext.Provider>
  );
};

export default staticContextProvider;
