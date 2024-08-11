import { createContext, useState, useEffect, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

import { LoginCredentials, RegisterCredentials, User } from "@/lib/types";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  loggedInUser: User | null | undefined;
  login: (user: LoginCredentials) => Promise<void>;
  register: (user: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>(
    undefined
  );
  const [token, setToken] = useLocalStorage("token", null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      try {
        const response = await api.get("/loggedInUser");
        setLoggedInUser(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.error("Invalid token, logging out");
          logout();
        } else if (error.response?.status === 404) {
          console.error("User not found, logging out");
          logout();
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUser();
  }, [token]);

  function logout() {
    setToken(null);
    setLoggedInUser(null);
  }

  async function login(cred: LoginCredentials) {
    try {
      const response = await api.post("/auth/login", cred);
      setToken(response.data.token);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async function register(cred: RegisterCredentials) {
    try {
      await api.post("/auth/register", cred);
      navigate("auth/login");
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ loggedInUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
