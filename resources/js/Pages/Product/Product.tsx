import { useState } from "react";

import useAuth from "@/hooks/useAuth";
import PrivateRoute from "@/Routes/PrivateRoute";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import ProductTable from "./Components/ProductTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ProductSheet from "./Components/ProductSheet";
import { ProductSheetType } from "./types/ProductSheetType";

export default function Product() {
  return (
    <PrivateRoute>
      <Head title="Products" />
      <AuthenticatedLayout>
        <Card className="shadow-none shadow-slate-200">
          <CardContent className="p-5">
            <header className="flex justify-between mb-3">
              <div>
                <h1 className="mb-2 text-xl font-extrabold">
                  Product Management
                </h1>
                <p className="text-base text-muted-foreground">
                  Manage your products by selecting the option icon under each
                  row.
                </p>
              </div>
              <ProductSheet type={ProductSheetType.Create}>
                <Button type="button">
                  <Plus />
                  Create Product
                </Button>
              </ProductSheet>
            </header>
            <ProductTable />
          </CardContent>
        </Card>
      </AuthenticatedLayout>
    </PrivateRoute>
  );
}
