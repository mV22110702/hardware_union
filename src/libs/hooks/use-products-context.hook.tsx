import { useContext } from 'react';
import {ProductsContext} from "~/libs/components/products-provider.tsx";

export const useProductsContext = () => {
  return useContext(ProductsContext)!;
};
