import React from "react";
import { createContext } from "react";
export const staticContext = createContext(null);
const StaticContextProvider = ({ children }) => {
  const navBarItems = [
    {
      name: "tech",
      link: "/prudocts/tech",
    },

    {
      name: "kitchen",
      link: "/prudocts/kitchen",
    },
    {
      name: "home",
      link: "/prudocts/homes",
    },
    {
      name: "clothes",
      link: "/prudocts/clothes",
    },
  ];
  const gamesPrefixes = [
    {
      img: "/headPhone.png",
      name: "Head phones",
      link: "/prudacts/tech/headPhones",
    },
    {
      img: "/keyBoard.png",
      name: "keyboards",
      link: "/prudacts/tech/keyboards",
    },
    {
      img: "/mouse.png",
      name: "mouses",
      link: "/prudacts/tech/mouses",
    },
    {
      img: "/chair.png",
      name: "chairs",
      link: "/prudacts/tech/chairs",
    },
  ];
  const heroContent = [
    "/main.png",
    "/main2.png",
    "/main3.png",
    "/main4.png",
    "/main5.png",
  ];
  const startGames = [{ img: "/tech.png", txt: "start your games" }];
  const buyYourHouseDecor = [
    {
      img: "/clean_tools.png",
      txt: "cleaning tools",
    },
    {
      img: "/Home_Decor.png",
      txt: "House Decor",
    },
    {
      img: "/Sheets.png",
      txt: "sheets",
    },
  ];
  const computerPrefixes = [
    {
      img: "/computers.png",
      txt: "computers",
    },
    {
      img: "/laptops.png",
      txt: "laptops",
    },
    {
      img: "/DVD.png",
      txt: "DVG Engins",
    },
    {
      img: "/computer_prefixes.png",
      txt: "presonal computer frefixes",
    },
  ];
  const techCategories = [
    {
      img: "/public/tech.png",
      name: "computers",
    },
    {
      img: "/public/laptops.png",
      name: "laptops",
    },
    {
      img: "/public/keyBoard.png",
      name: "accessories",
    },
  ];
  const value = {
    navBarItems,
    gamesPrefixes,
    heroContent,
    startGames,
    buyYourHouseDecor,
    computerPrefixes,
    techCategories,
  };

  return (
    <staticContext.Provider value={value}>{children}</staticContext.Provider>
  );
};

export default StaticContextProvider;
