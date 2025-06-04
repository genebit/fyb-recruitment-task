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
  SheetFooter,
} from "@/components/ui/sheet";
import { Head, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

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

async function postData(token: string, data: any): Promise<void> {
  try {
    const response = await axios.post(route("api.product.store"), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    if (error.response) {
      // Laravel returned a validation error (422)
      if (error.response.status === 422) {
        const errors = error.response.data.errors;
        console.error("Validation errors:", errors);
        throw errors;
      } else {
        // Other server-side error
        console.error("Server error:", error.response.data);
      }
    } else {
      // Network or other unexpected error
      console.error("Network error:", error);
    }
  }
}

export default function Product() {
  const { user, loading } = useAuth();
  const [token, setToken] = useState<string>(
    localStorage.getItem("auth_token") || ""
  );
  const [open, setOpen] = useState(false);
  const [dtData, setDtData] = useState<ProductColumns.Product[]>([]);
  const { data, setData, processing, errors, setError, post } = useForm({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
  });
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    getData(token).then((records) => {
      setDtData(records);
      setDataLoading(false);
    });
  }, []);

  if (loading || dataLoading) return <PulseLoader />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    postData(token, data)
      .then(() => {
        setData({
          name: "",
          description: "",
          quantity: 0,
          price: 0,
        });
        setOpen(false);
        getData(token).then(setDtData);
      })
      .catch((validationErrors) => {
        setError(validationErrors);
      });
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setData({
        name: "",
        description: "",
        quantity: 0,
        price: 0,
      });
      setError("name", "");
      setError("description", "");
      setError("quantity", "");
      setError("price", "");
    }
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
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <Sheet open={open} onOpenChange={handleOpenChange}>
              <SheetTrigger asChild>
                <Button>
                  <Plus />
                  Create Product
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="mb-5">
                  <SheetTitle>Manage Product</SheetTitle>
                </SheetHeader>
                <section className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Product Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter product name"
                      value={data.name || ""}
                      onChange={(e) => setData("name", e.target.value)}
                      disabled={processing}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      placeholder="Enter product description"
                      id="description"
                      value={data.description || ""}
                      onChange={(e) => setData("description", e.target.value)}
                      disabled={processing}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Enter product quantity"
                        value={data.quantity || 0}
                        onChange={(e) =>
                          setData("quantity", parseInt(e.target.value))
                        }
                        disabled={processing}
                      />
                      {errors.quantity && (
                        <p className="text-sm text-red-500">
                          {errors.quantity}
                        </p>
                      )}
                      <Input
                        id="price"
                        type="number"
                        placeholder="Enter product price"
                        value={data.price || 0}
                        onChange={(e) =>
                          setData("price", parseInt(e.target.value))
                        }
                        disabled={processing}
                      />
                      {errors.price && (
                        <p className="text-sm text-red-500">{errors.price}</p>
                      )}
                    </div>
                  </div>
                </section>
                <SheetFooter className="mt-5">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={processing}
                    onClick={handleSubmit}
                  >
                    {processing ? "Creating..." : "Create Product"}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </form>
        </header>
        <ProductDataTable columns={ProductColumns.columns} data={dtData} />
      </AuthenticatedLayout>
    </PrivateRoute>
  );
}
