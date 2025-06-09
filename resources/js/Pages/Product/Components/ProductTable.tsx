import { useEffect, useState } from "react";
import * as ProductColumns from "./ProductColumns";
import { ProductDataTable } from "./ProductDataTable";
import { useProductApi } from "../Hooks/useProductApi";
import useAuth from "@/hooks/useAuth";
import { ProductType } from "../types/ProductType";

const ProductTable = () => {
  const [dtData, setDtData] = useState<ProductType[]>([]);
  const { token } = useAuth();
  const { getProducts } = useProductApi(token ?? "");

  useEffect(() => {
    if (token) {
      getProducts().then(setDtData);
    }
  }, [token, getProducts]);

  return <ProductDataTable columns={ProductColumns.columns} data={dtData} />;
};

export default ProductTable;
