import { useQuery } from "@tanstack/react-query";
import { defaultInstance } from "../axiosInstance";

const fetchUser = async ({ params }) => {
  const response = defaultInstance.get("/auth/me");
  return response.data;
};

export const useUser = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["user", params],
    queryFn: fetchUser,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    ...options,
  });
