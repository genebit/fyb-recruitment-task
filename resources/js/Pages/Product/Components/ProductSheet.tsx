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
import { ForwardedRef, forwardRef, ReactNode, useState } from "react";
import { toast } from "sonner";
import { ProductSheetType } from "../types/ProductSheetType";
import { useProductContext } from "../Contexts/ProductContext";
import axios from "axios";

interface ProductSheetProps {
  type: ProductSheetType;
  productId?: number;
  children: ReactNode;
}

const ProductSheet = forwardRef<HTMLDivElement, ProductSheetProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { type, productId, children } = props;
    const { refreshProducts } = useProductContext();

    const formData = {
      name: "",
      description: "",
      quantity: "0",
      price: "0",
    };

    const { data, setData, processing, errors, setError } = useForm(formData);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      switch (type) {
        case ProductSheetType.Create:
          try {
            const res = await axios.post(route("api.product.store"), data);
            toast("Successfully inserted product to your list.");
            setOpen(false);
            refreshProducts(); // Use context method
          } catch (error: any) {
            if (error.response && error.response.status === 422) {
              toast("Invalid credentials were sent.", {
                description:
                  "Please fill in all the required fields in the form.",
              });
              setError(error.response.data.errors);
            } else {
              toast(error.response.data.message);
              setError(formData);
            }
          }
          break;

        case ProductSheetType.Update:
          try {
            const res = await axios.put(
              route("api.product.update", { id: productId }),
              data
            );
            toast("Successfully updated product on your list.");
            setOpen(false);
            refreshProducts();
          } catch (error: any) {
            if (error.response && error.response.status === 422) {
              toast("Invalid credentials were sent.", {
                description:
                  "Please fill in all the required fields in the form.",
              });
              setError(error.response.data.errors);
            } else {
              toast(error.response.data.message);
              setError(formData);
            }
          }
          break;

        default:
          toast("An error occurred. Please try again.");
          break;
      }
    };

    const setFormData = async () => {
      try {
        const res = await axios.get(
          route("api.product.find", { id: productId })
        );
        setData(res.data.info);
        toast("Successfully fetched product.");
      } catch (error: any) {
        toast(error.response ? error.response.data.message : error.message);
      }
    };

    const handleOpenChange = async (open: boolean) => {
      setOpen(open);

      if (productId && open) {
        setFormData();
      } else {
        setData(formData);
      }
    };

    return (
      <div ref={ref}>
        <form onSubmit={handleSubmit}>
          <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent>
              <SheetHeader className="mb-5">
                <SheetTitle>
                  {type === ProductSheetType.Create ? "Create" : "Update"}{" "}
                  Product
                </SheetTitle>
              </SheetHeader>
              <section className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
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
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-2 h-max">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Enter product quantity"
                      value={data.quantity || 0}
                      onChange={(e) => setData("quantity", e.target.value)}
                      disabled={processing}
                    />
                    {errors.quantity && (
                      <p className="text-sm text-red-500">{errors.quantity}</p>
                    )}
                  </div>
                  <div className="grid gap-2 h-max">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Enter product price"
                      value={data.price || 0}
                      onChange={(e) => setData("price", e.target.value)}
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
                  {processing
                    ? `${
                        type === ProductSheetType.Create
                          ? "Creating..."
                          : "Updating..."
                      }`
                    : `${
                        type === ProductSheetType.Create ? "Create" : "Update"
                      } Product`}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </form>
      </div>
    );
  }
);

export default ProductSheet;
