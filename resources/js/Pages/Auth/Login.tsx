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
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const formData = {
    email: "",
    password: "",
  };

  const [viewPassword, setViewPassword] = useState(false);
  const { data, setData, processing, errors, setError } = useForm(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(route("api.auth.login"), data);

      const token = res.data.info.original.access_token;
      localStorage.setItem("auth_token", token);

      // Redirect on success
      router.visit(route("product"));
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        toast("Invalid credentials were sent.", {
          description: "Please fill in all the required fields in the form.",
        });
        setError(error.response.data.errors);
      } else {
        toast(error.response.data.message);
        setError(formData);
      }
    }
  };

  return (
    <GuestRoute>
      <GuestLayout>
        <Head title="Login" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="z-10 w-full max-w-sm shadow-2xl shadow-slate-300 dark:shadow-black">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <span className="flex items-center justify-center w-16 bg-blue-100 rounded-full h-14">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 180 164"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.46446 70.5355L63.4645 8.53553C66.6143 5.38571 72 7.61654 72 12.0711V86.9787C72 88.2753 71.4964 89.5211 70.5953 90.4534L8.59534 154.606C5.47105 157.839 0 155.627 0 151.132V74.0711C0 72.745 0.526783 71.4732 1.46446 70.5355Z"
                      fill="#718BFF"
                    />
                    <path
                      d="M109.464 70.5355L171.464 8.53553C174.614 5.38571 180 7.61654 180 12.0711V86.9787C180 88.2753 179.496 89.5211 178.595 90.4534L116.595 154.606C113.471 157.839 108 155.627 108 151.132V74.0711C108 72.745 108.527 71.4732 109.464 70.5355Z"
                      fill="#060C27"
                    />
                    <path
                      d="M105.929 72H12.4527C8.015 72 5.77663 66.6491 8.89253 63.4893L70.0314 1.48928C70.971 0.53643 72.2534 0 73.5916 0H167.929C172.383 0 174.614 5.3857 171.464 8.53552L109.464 70.5355C108.527 71.4732 107.255 72 105.929 72Z"
                      fill="#00146B"
                    />
                  </svg>
                </span>
                <div className="flex flex-col items-start space-y-2">
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account.
                  </CardDescription>
                </div>
              </div>
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
                  <div className="relative">
                    <Input
                      id="password"
                      type={viewPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={data.password}
                      onChange={(e) => setData("password", e.target.value)}
                      disabled={processing}
                    />
                    {viewPassword ? (
                      <Button
                        type="button"
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => setViewPassword(false)}
                        className="absolute -translate-y-1/2 hover:bg-transparent right-2 top-1/2"
                      >
                        <Eye />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => setViewPassword(true)}
                        className="absolute -translate-y-1/2 hover:bg-transparent right-2 top-1/2"
                      >
                        <EyeClosed />
                      </Button>
                    )}
                  </div>
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
