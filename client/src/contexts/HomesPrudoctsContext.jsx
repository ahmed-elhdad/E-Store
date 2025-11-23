import React, { createContext, useMemo, useState } from "react";
import { usePrudoctList } from "../api/hooks/usePrudoct";
export const HomesPrudoctsContext = createContext();
const HomesPrudoctsContextProvider = ({ children }) => {
  const [prdcts, setPrudocts] = useState([
    {
      title: "fafsdfd",
      description: "fdsfasf",
      image: "../../public/clean_tools.png",
    },
  ]);
  const placeholderData = useMemo(() => prdcts, []);

  const {
    data: prudocts = placeholderData,
    isPending,
    isFetching,
    refetch,
    error,
  } = usePrudoctList(
    { category: "homes" },
    {
      placeholderData,
    }
  );

  const value = {
    prudocts,
    isLoaded: !(isPending || isFetching),
    refresh: refetch,
    error,
  };

  return (
    <HomesPrudoctsContext.Provider value={value}>
      {children}
    </HomesPrudoctsContext.Provider>
  );
};

export default HomesPrudoctsContextProvider;
