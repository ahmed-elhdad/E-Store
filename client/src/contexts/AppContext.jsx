import React, { createContext, useState } from "react";
export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({
      _id: "3423423fdfafad4ddscc ",
      photo: "/client/public/clothing.png",
      name: "user",
    });
  const value = { user, setUser };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
