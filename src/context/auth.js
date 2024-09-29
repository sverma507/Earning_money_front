import axios from "axios";
import { useState, useContext, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Sync axios headers with token whenever auth changes
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`; // Use Bearer scheme
    } else {
      delete axios.defaults.headers.common['Authorization']; // Remove token when not available
    }
  }, [auth?.token]); // Dependency on auth token to ensure it's up-to-date

  // Initialize auth state from localStorage
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user,
        token: parsedData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
