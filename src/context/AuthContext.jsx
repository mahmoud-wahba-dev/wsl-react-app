import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URL;

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

  const restoreSession = async () => {
    const token = Cookies.get("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/auth/users/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok || !result.status) {
        throw new Error(result.message || "Session expired");
      }

      setUser(result.data);
    } catch (error) {
      console.error(error);
      Cookies.remove("access_token");
      Cookies.remove("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
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
