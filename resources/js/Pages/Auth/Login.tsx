import { FormEvent, useState } from "react";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import GuestRoute from "@/Routes/GuestRoute";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(route("api.auth.login"), {
        email,
        password,
      });
      localStorage.setItem("auth_token", res.data.access_token);
      router.visit(route("product"));
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <GuestRoute>
      <Head title="Login" />
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </GuestRoute>
  );
}
