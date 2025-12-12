import { useMutation } from "@tanstack/react-query";
import { defaultInstance } from "../axiosInstance";

export const useAuth = () => {
  const login = useMutation(async ({ email, password }) => {
    const res = await defaultInstance.post("/auth/login", { email, password });
    return res.data;
  });

  const register = useMutation(async ({ name, email, password }) => {
    const res = await defaultInstance.post("/auth/new", {
      name,
      email,
      password,
    });
    return res.data;
  });

  return { login, register };
};
