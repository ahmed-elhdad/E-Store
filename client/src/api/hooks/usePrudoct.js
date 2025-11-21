import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1";

const fetchPrudocts = async ({ queryKey }) => {
  const [, params] = queryKey;
  const response = await axios.get(`${API_BASE_URL}/prudocts`, {
    params,
  });

  // Support both { data: [] } and [] server responses
  return response?.data?.data ?? response?.data ?? [];
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
