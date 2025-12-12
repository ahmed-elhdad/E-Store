import { useQuery } from "@tanstack/react-query";
import { defaultInstance } from "../axiosInstance";
const fetchPrudoct = async ({ queryKey }) => {
  const [, params] = queryKey;
  const response = await defaultInstance.get(`/prudocts/${params.id}`);

  // Support both { data: [] } and [] server responses
  if (!response) {
    return "error";
  }

  return await response.data.data;
};
export const usePrudoct = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["prudoct", params],
    queryFn: fetchPrudoct,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    ...options,
  });
