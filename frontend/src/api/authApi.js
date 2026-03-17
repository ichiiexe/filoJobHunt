import api from "./api";

export const registerUser = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};

export const loggedUser = async () => {
  const response = await api.get("/api/auth/me");
  return response.data.user;
};
