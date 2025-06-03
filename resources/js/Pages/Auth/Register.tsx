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

export default function Register() {
  const { data, setData, processing, errors, setError } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(route("api.auth.register"), {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      localStorage.setItem("auth_token", res.data.access_token);

      // Redirect on success
      window.location.href = route("product");
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setError(error.response.data.errors);
      } else {
        setError({
          name: "Unexpected error occurred. Please try again.",
          email: "",
          password: "",
          password_confirmation: "",
        });
      }
    }
  };

  return (
    <GuestRoute>
      <GuestLayout>
        <Head title="Register" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="w-full max-w-sm shadow-2xl">
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Fill in the details to register your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    disabled={processing}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

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

                <div className="grid gap-2">
                  <Label htmlFor="password_confirmation">
                    Confirm Password
                  </Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    placeholder="********"
                    value={data.password_confirmation}
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                    disabled={processing}
                  />
                  {errors.password_confirmation && (
                    <p className="text-sm text-red-500">
                      {errors.password_confirmation}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full" disabled={processing}>
                {processing ? "Registering..." : "Register"}
              </Button>
              <small>
                Already have an account?{" "}
                <a
                  href={route("auth.login")}
                  className="font-semibold underline"
                >
                  Login
                </a>
              </small>
            </CardFooter>
          </Card>
        </form>
      </GuestLayout>
    </GuestRoute>
  );
}
