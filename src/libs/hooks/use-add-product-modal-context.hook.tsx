import {AddProductModalContext} from '~/libs/components/modal-providers/modal-providers.tsx';
import { useContext } from 'react';

export const useAddProductModalContext = () => {
  const addProductModalContext = useContext(AddProductModalContext)!;
  return addProductModalContext;
};
