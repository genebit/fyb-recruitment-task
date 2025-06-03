import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import PrivateRoute from "@/Routes/PrivateRoute";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { columns, Payment } from "./Components/ProductColumns";
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
import { Head } from "@inertiajs/react";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export default function Product() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<Payment[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    getData().then((payments) => {
      setData(payments);
      setDataLoading(false);
    });
  }, []);

  if (loading || dataLoading) return <PulseLoader />;

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
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </header>
        <ProductDataTable columns={columns} data={data} />
      </AuthenticatedLayout>
    </PrivateRoute>
  );
}
