import {Dispatch, SetStateAction, useState} from 'react';
import { CheckedProduct } from '~/pages/products/libs/types/checked-product.type';

const handleChooseProductCard =
  (setState: Dispatch<SetStateAction<CheckedProduct[]>>) =>
  ({ id, isChecked }: CheckedProduct & { isChecked: boolean }) => {
    setState((checkedProducts) => {
      if (!checkedProducts) {
        return checkedProducts;
      }

      return isChecked
        ? [...checkedProducts, { id }]
        : checkedProducts.filter((checkedProduct) => checkedProduct.id !== id);
    });
  };

export { handleChooseProductCard };
