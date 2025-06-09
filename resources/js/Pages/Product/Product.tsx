import { useState, useEffect } from "react";
import PrivateRoute from "@/Routes/PrivateRoute";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ProductDataTable } from "./Components/ProductDataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ProductSheet from "./Components/ProductSheet";
import { ProductSheetType } from "./types/ProductSheetType";
import { ProductProvider, useProductContext } from "./Contexts/ProductContext";
import axios from "axios";
import { columns } from "./Components/ProductColumns";
import { ProductType } from "./types/ProductType";

function ProductContent() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { refreshTrigger, isLoading, setIsLoading } = useProductContext();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(route("api.product"));
      setProducts(response.data.info || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products on component mount and when refreshTrigger changes
  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  return (
    <Card className="shadow-none shadow-slate-200">
      <CardContent className="p-5">
        <header className="flex justify-between mb-3">
          <div>
            <h1 className="mb-2 text-xl font-extrabold">Product Management</h1>
            <p className="text-base text-muted-foreground">
              Manage your products by selecting the option icon under each row.
            </p>
          </div>
          <ProductSheet type={ProductSheetType.Create}>
            <Button type="button">
              <Plus />
              Create Product
            </Button>
          </ProductSheet>
        </header>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div>Loading products...</div>
          </div>
        ) : (
          <ProductDataTable columns={columns} data={products} />
        )}
      </CardContent>
    </Card>
  );
}

export default function Product() {
  return (
    <PrivateRoute>
      <Head title="Products" />
      <AuthenticatedLayout>
        <ProductProvider>
          <ProductContent />
        </ProductProvider>
      </AuthenticatedLayout>
    </PrivateRoute>
  );
}
