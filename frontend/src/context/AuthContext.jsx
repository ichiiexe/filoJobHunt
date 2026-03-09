import { createContext, useState } from "react";
import { loginUser, registerUser } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const register = async (data) => {
    const res = await registerUser(data);
    const { token, user } = res;

    localStorage.setItem("token", token);
    setCurrUser(user);
    setToken(token);

    console.log(res);
    console.log(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrUser(null);
    setToken(null);
  };

  const login = async (data) => {
    const res = await loginUser(data);
    const { token, user } = res;
    localStorage.setItem("token", token);
    setCurrUser(user);
    setToken(token);

    console.log(res);
    console.log(token);
  };

  return (
    <AuthContext.Provider value={{ token, currUser, register, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
