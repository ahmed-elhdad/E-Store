import { useQuery } from "@tanstack/react-query";
import { defaultInstance } from "../axiosInstance";

const fetchPrudocts = async ({ queryKey }) => {
  const [, params] = queryKey;
  console.log("cateory: ", params.category);

  const response = await defaultInstance.get(`/prudocts?category=${params.category}`);

  if (!response) {
    return "error";
  }

  return await response.data.data;
};

export const usePrudoctList = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["prudocts", params],
    queryFn: fetchPrudocts,
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    ...options,
  });

export default usePrudoctList;
