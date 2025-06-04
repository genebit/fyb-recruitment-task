import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import PrivateRoute from "@/Routes/PrivateRoute";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import * as ProductColumns from "./Components/ProductColumns";
import { ProductDataTable } from "./Components/ProductDataTable";
import PulseLoader from "@/components/ui/pulse-loader";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "@/components/ui/sheet";
import { Head, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

async function getData(token: string): Promise<ProductColumns.Product[]> {
  try {
    const response = await fetch(route("api.product"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();

    return data; // return the fetched data
  } catch (error) {
    alert("Failed to fetch products. Please try again later.");
    return []; // return empty array on error to satisfy return type
  }
}

export default function Product() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<ProductColumns.Product[]>([]);
  const { data, setData, processing, errors, setError } = useForm({});
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token") || "";

    getData(token).then((payments) => {
      setData(payments);
      setDataLoading(false);
    });
  }, []);

  if (loading || dataLoading) return <PulseLoader />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    // For example, you can send the data to your API
    console.log("Form submitted with data:", data);
  };

  return (
    <PrivateRoute>
      <Head title="Products" />
      <AuthenticatedLayout user={user!}>
        <header className="flex justify-between mb-3">
          <div>
            <h1 className="mb-2 text-5xl font-extrabold">Product Management</h1>
            <p className="opacity-75">
              Manage your products efficiently with ease.
            </p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus />
                Create Product
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create Product</SheetTitle>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <p className="text-sm text-red-500">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </header>
        <ProductDataTable columns={ProductColumns.columns} data={data} />
      </AuthenticatedLayout>
    </PrivateRoute>
  );
}
