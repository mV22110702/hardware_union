import { Dispatch, SetStateAction } from 'react';
import { ChosenProduct } from '~/pages/products/libs/types/checked-product.type';

const handleChooseProductCard =
  (setState: Dispatch<SetStateAction<ChosenProduct[]>>) =>
  ({ id, isChecked }: ChosenProduct & { isChecked: boolean }) => {
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
