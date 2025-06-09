import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductModalDelete from "./ProductModalDelete";
import ProductSheet from "./ProductSheet";
import { ProductSheetType } from "../types/ProductSheetType";
import { useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  product_id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "product_id",
    header: () => null, // no header
    cell: () => null, // hide the cell
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center"
      >
        Product Name
        <ArrowUpDown className="w-4 h-4 ml-2" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="ms-4">
        <div className="font-medium">{row.getValue("name")}</div>
        <div className="text-sm text-muted-foreground">
          {row.original.description}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="px-3 py-1 font-semibold rounded-sm text-primary ms-7 bg-secondary w-max">
          {row.getValue("quantity")}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue("price");
      if (typeof price === "number") {
        return (
          <div className="ms-4">
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        );
      }
      return <div className="ms-4">—</div>; // fallback if price isn't a number
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const closeDropdown = () => setOpen(false);

      return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <ProductSheet
                type={ProductSheetType.Update}
                productId={row.getValue("product_id")}
              >
                <Button variant="ghost" className="justify-start w-full px-2">
                  Update
                </Button>
              </ProductSheet>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ProductModalDelete productId={row.getValue("product_id")} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
