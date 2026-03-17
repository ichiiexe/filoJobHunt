
import { createContext, useEffect, useState } from "react";
import { loggedUser, loginUser, registerUser } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  const register = async (data) => {
    try {
      const res = await registerUser(data);
      const { token, user } = res;

      localStorage.setItem("token", token);
      setCurrUser(user);
      setToken(token);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrUser(null);
    setToken(null);
  };

  const login = async (data) => {
    try {
      const res = await loginUser(data);
      const { token, user } = res;
      localStorage.setItem("token", token);
      setCurrUser(user);
      setToken(token);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const user = await loggedUser();
          setCurrUser(user);
        }
      } catch {
        localStorage.removeItem("token");
        setCurrUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        currUser,
        loading,
        register,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
