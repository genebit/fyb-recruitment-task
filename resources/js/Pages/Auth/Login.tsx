import { Head, router, useForm } from "@inertiajs/react";
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
import axios from "axios";

export default function Login() {
  const { data, setData, post, processing, errors, setError } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(route("api.auth.login"), {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("auth_token", res.data.access_token);

      // Redirect on success
      window.location.href = route("product");
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        // Laravel validation errors come here
        setError(error.response.data.errors);
      } else {
        // Handle other errors (optional)
        setError({
          email: "Unexpected error occurred. Please try again.",
          password: "",
        });
      }
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
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    disabled={processing}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    disabled={processing}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full" disabled={processing}>
                {processing ? "Logging in..." : "Login"}
              </Button>
              <small>
                Don&apos;t have an account?{" "}
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
