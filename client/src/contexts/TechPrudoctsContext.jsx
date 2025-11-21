import React, { createContext, useMemo, useState } from "react";
import { usePrudoctList } from "../api/hooks/usePrudoct";
export const TechPrudoctsContext = createContext();
const TechPrudoctsContextProvider = ({ children }) => {
  const [prdcts, setPrudocts] = useState([{}]);
  const placeholderData = useMemo(() => prdcts, []);

  const {
    data: prudocts = placeholderData,
    isPending,
    isFetching,
    refetch,
    error,
  } = usePrudoctList(
    { category: "tech" },
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
    <TechPrudoctsContext.Provider value={value}>
      {children}
    </TechPrudoctsContext.Provider>
  );
};

export default TechPrudoctsContextProvider;
