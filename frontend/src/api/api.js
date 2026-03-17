import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response) {
      const { status, data } = response;

      switch (status) {
        case 400:
          if (data.errors && Array.isArray(data.errors)) {
            const errorMessages = data.errors
              .map((err) => err.message)
              .join(", ");
            throw new Error(
              errorMessages || data.message || "Validation error",
            );
          }
          throw new Error(data.message || "Bad request");

        case 401:
          localStorage.removeItem("token");
          window.location.href = "/login";
          throw new Error(data.message || "Unauthorized access");

        case 403:
          throw new Error(data.message || "Access forbidden");

        case 404:
          throw new Error(data.message || "Resource not found");

        case 422:
          throw new Error(data.message || "Unprocessable entity");

        case 500:
          throw new Error("Internal server error. Please try again later.");

        default:
          throw new Error(
            data.message || `Request failed with status ${status}`,
          );
      }
    } else if (error.request) {
      throw new Error(
        "Network error. Please check your connection and try again.",
      );
    } else {
      throw new Error(error.message || "An unexpected error occurred");
    }
  },
);

export default api;
