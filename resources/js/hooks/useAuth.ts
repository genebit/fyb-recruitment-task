import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initialize token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    setToken(storedToken);
    setInitialized(true);
  }, []);

  // Handle authentication when token changes
  useEffect(() => {
    if (!initialized) return;

    if (!token) {
      setLoading(false);
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
      return;
    }

    // Set axios header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Fetch user data
    const fetchUser = async () => {
      try {
        const res = await axios.get(route("api.auth.me"));
        setUser(res.data.info);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("auth_token");
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, initialized]);

  const logout = () => {
    localStorage.removeItem("auth_token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setToken(null);
  };

  const login = (newToken: string) => {
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);
  };

  return { user, loading, token, logout, login };
}
