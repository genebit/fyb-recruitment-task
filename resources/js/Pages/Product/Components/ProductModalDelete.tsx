import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ForwardedRef, forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useProductContext } from "../Contexts/ProductContext";
import axios from "axios";

interface ProductModalDeleteProps {
  productId: number;
}

const ProductModalDelete = forwardRef<HTMLDivElement, ProductModalDeleteProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { productId } = props;
    const { refreshProducts } = useProductContext();
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
      try {
        const res = await axios.delete(
          route("api.product.delete", { id: productId })
        );
        toast("Successfully deleted a product from your list.");
        setOpen(false);
        refreshProducts(); // Use context method
      } catch (error: any) {
        toast(error.response ? error.response.data.message : error.message);
      }
    };

    return (
      <div ref={ref}>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="justify-start w-full px-2 text-destructive"
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete product?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                product from your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive hover:bg-destructive/75 dark:text-white"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
);

export default ProductModalDelete;
