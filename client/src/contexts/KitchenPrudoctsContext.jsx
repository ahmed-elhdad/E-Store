import React, { createContext, useMemo, useState } from "react";
import { usePrudoctList } from "../api/hooks/usePrudoct";
export const KitchenPrudoctsContext = createContext();
const KitchenPrudoctsContextProvider = ({ children }) => {
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
    { category: "kitchen" },
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
    <KitchenPrudoctsContext.Provider value={value}>
      {children}
    </KitchenPrudoctsContext.Provider>
  );
};

export default KitchenPrudoctsContextProvider;
