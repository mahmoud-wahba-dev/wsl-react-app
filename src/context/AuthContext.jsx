import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  function login(data) {
    Cookies.set("access_token", data.access_token, {
      expires: 365,
      sameSite: "strict",
    });
    Cookies.set("user", JSON.stringify(data.user), {
      expires: 365,
      sameSite: "strict",
    });
    setUser(data.user);
  }

  function logout() {
    Cookies.remove("access_token");
    Cookies.remove("user");
    setUser(null);
  }

  useEffect(() => {
    const token = Cookies.get("access_token");
    const storedUser = Cookies.get("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isLoggedIn: user !== null }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
