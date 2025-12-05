import { useQuery } from "@tanstack/react-query";
import { defaultInstance } from "../axiosInstant";

const fetchPrudocts = async () => {
  const response = await defaultInstance.get(`/prudocts`);

  // Support both { data: [] } and [] server responses
  if (!response) {
    return "error";
  }
  console.log("response: ", response.data.data);

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
