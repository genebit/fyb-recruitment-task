import { FormEvent, useState } from "react";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import GuestRoute from "@/Routes/GuestRoute";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <GuestLayout>
        <Head title="Login" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="w-full max-w-sm shadow-2xl">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <small>
                Don't have an account?{" "}
                <a
                  href={route("auth.register")}
                  className="font-semibold underline"
                >
                  Register
                </a>
              </small>
            </CardFooter>
          </Card>
        </form>
      </GuestLayout>
    </GuestRoute>
  );
}
