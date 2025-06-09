import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";

const ProductSheet = () => {
  const { data, setData, processing, errors, setError, post } = useForm({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
  });

  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
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
                <p className="text-sm text-red-500">{errors.description}</p>
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
                  <p className="text-sm text-red-500">{errors.quantity}</p>
                )}
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter product price"
                  value={data.price || 0}
                  onChange={(e) => setData("price", parseInt(e.target.value))}
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
  );
};

export default ProductSheet;
