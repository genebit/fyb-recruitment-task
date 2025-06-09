import { useState } from "react";

import useAuth from "@/hooks/useAuth";
import PrivateRoute from "@/Routes/PrivateRoute";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import ProductTable from "./Components/ProductTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Product() {
  return (
    <PrivateRoute>
      <Head title="Products" />
      <AuthenticatedLayout>
        <header className="flex justify-between mb-3">
          <div>
            <h1 className="mb-2 text-5xl font-extrabold">Product Management</h1>
            <p className="opacity-75">
              Manage your products efficiently with ease.
            </p>
          </div>
          <Button>
            <Plus />
            Create Product
          </Button>
        </header>
        {/* <ProductTable /> */}
      </AuthenticatedLayout>
    </PrivateRoute>
  );
}
