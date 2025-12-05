import React from "react";
import CategoriesSection from "../components/CategoriesSection";
import Prudocts from "../components/Prudocts.jsx";
import Filter from "../components/Filter.jsx";

const Main = (props) => {
  return (
    <main className="px-4 sm:px-6 lg:px-8">
      <CategoriesSection data={props.categories} />
      <div className="mt-6 flex gap-4 lg:flex-row">
        <Filter />
        <Prudocts />
      </div>
    </main>
  );
};

export default Main;
