import { createContext, useState } from "react";
import { useCart } from "../api/hooks/useCart";
export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null),
    [cart, setCart] = useState([]);
  const { data } = useCart();
  setCart(data);
  const value = { user, setUser, cart, setCart };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
