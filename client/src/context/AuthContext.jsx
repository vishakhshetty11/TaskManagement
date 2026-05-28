import { createContext, useContext, useState } from "react";
import API from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    const res = await API.post("/user/login", data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res;
  };

  const signup = async (data) => {
    const res = await API.post("/user/signup", data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);