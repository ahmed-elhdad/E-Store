import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import CategoriesSection from "../components/CategoriesSection";
import Filter from "../components/Filter.jsx";
import Prudocts from "../components/Prudocts.jsx";
import axios from "axios";
import Laoding from "../components/Laoding.jsx";

const Tech = () => {
  const categories = [{ img: "/client/public/chair.png", title: "" }];
  const [prudocts, setPrudocts] = useState([]),
    [isLoaded, setIsLoaded] = useState(true),
    [error, setError] = useState(false);
  // const res = axios.get("http://localhost:3000/api/v1/prudocts", {
  //   category: "tech",
  // });
  const url = "http://localhost:3000/api/v1/prudocts";
  const getPrudocts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/prudocts");
      setIsLoaded(false);
      if (!res.ok) {
        setError("Failed to get products");
      }

      const data = await res.json();
      setPrudocts(data.data || data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getPrudocts();
  }, [url]);
  return (
    <div>
      <Header />
      <main className="px-4 sm:px-6 lg:px-8">
        <CategoriesSection data={categories} />
        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-64 lg:shrink-0">
            <Filter />
          </div>
          {isLoaded ? (
            <Prudocts items={prudocts} isLoaded={isLoaded} />
          ) : (
            <Laoding />
          )}
        </div>
      </main>
    </div>
  );
};

export default Tech;
