import Header from "../components/Header";
import HomesPrudoctsContextProvider, {
  HomesPrudoctsContext,
} from "../contexts/HomesPrudoctsContext";
import CategoriesSection from "../components/CategoriesSection";
import Filter from "../components/Filter";
import Prudocts from "../components/Prudocts";
import { use, useContext, useState } from "react";
("use client");
const Houses = () => {
  const categories = [{ img: "../../public/Home_Decor.png", name: "decor" }],
    context = HomesPrudoctsContext,
    { prudocts, isLoaded } = context,
    [searchFilter, setSearchFilter] = useState({ price: "", payment: "" });
  {
    /* <div className="mt-6 flex flex-col gap-6 lg:flex-row"> */
  }
  {
    /* <div className="lg:w-64 lg:shrink-0"> */
  }
  return (
    <>
      <Header />
      <HomesPrudoctsContextProvider>
        <main className="px-4 sm:px-6 lg:px-8">
          <CategoriesSection data={categories} />
          <Filter price={searchFilter.price} payment={searchFilter.payment} />
          <Prudocts
            filter={searchFilter}
            items={prudocts}
            isLoading={!isLoaded}
            className="flex-1"
          />
        </main>
      </HomesPrudoctsContextProvider>
    </>
  );
};

export default Houses;
