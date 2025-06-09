import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface ProductContextType {
  refreshTrigger: number;
  refreshProducts: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const refreshProducts = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const value: ProductContextType = {
    refreshTrigger,
    refreshProducts,
    isLoading,
    setIsLoading,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
