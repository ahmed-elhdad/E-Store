import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { defaultInstance } from "../axiosInstant";
const auth = async ({ queryKey }) => {
  const [, params] = queryKey;
  //   For Get User Profile
  if (params.type == "me") {
    const response = await defaultInstance.get("/auth/me");
    if (!response) return "error";
    return (await response.data) ? response.data : response;
  }
  //   For Register Or LogIn User With Google or FaceBook

  if (params.type == "google" || params.type == "facebook") {
    const response = await defaultInstance.post(`/auth/${params.type}`);
    if (!response) return "error";
    return (await response.data) ? response.data : response;
  }
  //   For Remove User
  if (params.type == "remove") {
    const { id } = Headers;
    const response = await defaultInstance.delete(`/auth/delUser`, { id: id });
    if (!response) return "error";
    return (await response.message) ? response.message : response;
  }
  //   Register Or LogIn With Email
  const response = await defaultInstance.post(
    `/auth/${params.type == "register" ? "new" : "login"}`
  );
  if (!response) return "error";
  return (await response.data) ? response.data : response;
};

export const useAuth = (params = {}, options = {}) => {
  useQuery({
    queryKey: ["auth", params],
    queryFn: auth,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    ...options,
  });
};
