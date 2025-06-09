import { useState } from "react";
import * as ProductColumns from "./ProductColumns";
import { ProductDataTable } from "./ProductDataTable";

const ProductTable = () => {
  const [dtData, _] = useState<ProductColumns.Product[]>([]);

  return <ProductDataTable columns={ProductColumns.columns} data={dtData} />;
};

export default ProductTable;
