import React, { useContext } from "react";
import Header from "../components/Header";
import CategoriesSection from "../components/CategoriesSection";
import { staticContext } from "../contexts/StaticContext";
import TechPrudoctsContextProvider, {
  TechPrudoctsContext,
} from "../contexts/TechPrudoctsContext.jsx";
import Filter from "../components/Filter.jsx";
import Prudocts from "../components/Prudocts.jsx";

const TechContent = ({ techCategories }) => {
  const { prudocts, isLoaded } = useContext(TechPrudoctsContext);
  return (
    <div>
      <Header />
      <main className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold capitalize mb-4">Categories:</h1>
        <CategoriesSection data={techCategories} />
        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-64 lg:shrink-0">
            <Filter />
          </div>
          <Prudocts
            items={prudocts}
            isLoading={!isLoaded}
            title=""
            subtitle=""
            className="flex-1"
          />
        </div>
      </main>
    </div>
  );
};

const Tech = () => {
  const { techCategories } = useContext(staticContext);

  return (
    <TechPrudoctsContextProvider>
      <TechContent techCategories={techCategories} />
    </TechPrudoctsContextProvider>
  );
};

export default Tech;
