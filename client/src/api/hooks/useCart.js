import { useQuery } from "@tanstack/react-query";
import { defaultInstance } from "../axiosInstance";
const getCart = async () => {
  const res = defaultInstance.get("/cart");
  if ((await res).status < 200 || (await res).status > 299) {
    throw new Error("Failed to fetch cart");
  }
  return (await res).data;
};
export const useCart = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["cart", params],
    queryFn: getCart,
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    ...options,
  });
