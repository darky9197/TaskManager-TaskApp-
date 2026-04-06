import { jwtDecode } from "jwt-decode";
import { Children, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const getAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const claims = jwtDecode(token);
  // console.log(claims);
  return {
    email: claims.sub,
    name: claims.name,
    role: claims.role,
    userId: claims.userId,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({
      email: decoded.sub,
      name: decoded.name,
      role: decoded.role,
      userId: decoded.userId,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          logout();
        } else {
          setUser({
            email: decoded.sub,
            name: decoded.name,
            role: decoded.role,
            userId: decoded.userId,
          });
        }
      } catch (err) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, saveToken, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);