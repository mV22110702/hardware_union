import { createContext, PropsWithChildren, useState } from 'react';
import { ProductEntityWithCategoryT } from '~/libs/slices/products/types/product-entity-with-category.type.ts';
import {productsMock} from "~/libs/slices/products/mocks/products.mock.ts";

const ProductsContext = createContext<{
  products: ProductEntityWithCategoryT[];
  setProducts: React.Dispatch<
    React.SetStateAction<ProductEntityWithCategoryT[]>
  >;
} | null>(null);

type Properties = PropsWithChildren;

const ProductsProvider: React.FC<Properties> = ({ children }) => {
  const [products, setProducts] = useState<ProductEntityWithCategoryT[]>(productsMock);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, ProductsContext };
