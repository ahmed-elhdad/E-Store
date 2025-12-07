import Header from "../components/Header";
import CategoriesSection from "../components/CategoriesSection";
import Filter from "../components/Filter.jsx";
import Prudocts from "../components/Prudocts.jsx";
("use client");
const Sport = () => {
  const categories = [{ img: "../../public/chair.png", name: "boat" }];
  return (
    <>
      <div>
        <Header />
        <main className="px-4 sm:px-6 lg:px-8">
          <CategoriesSection data={categories} />
          <div className="mt-6 flex gap-4 ">
            <Filter />
            <Prudocts category="sport" />
          </div>
        </main>
      </div>
    </>
  );
};

export default Sport;
