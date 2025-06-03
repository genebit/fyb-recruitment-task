import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    // Ensure axios has header set (optional redundancy)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .get(route("api.auth.me"))
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("auth_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
