import { useEffect, useState } from "react";
import * as ProductColumns from "./ProductColumns";
import { ProductDataTable } from "./ProductDataTable";
import { useProductApi } from "../Hooks/useProductApi";
import useAuth from "@/hooks/useAuth";

const ProductTable = () => {
  const [dtData, setDtData] = useState<ProductColumns.Product[]>([]);
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
