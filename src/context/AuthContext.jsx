import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
const baseURL = import.meta.env.VITE_BASE_URL;

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  function login(userData) {
    setUser(userData);
  }
  function logout() {
    Cookies.remove("token");
    setUser(null);
  }

  const restoreSession = async () => {
    const token = Cookies.get("token");
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
      console.log(response, "dd");

      const userData = await response.json();
      console.log(userData);

      if (!userData.status) {
        throw new Error(userData.message);
      }
      // Save the logged-in user in Context

      setUser(userData.data);
    } catch (error) {
      console.error(error);
      Cookies.remove("token");
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
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
