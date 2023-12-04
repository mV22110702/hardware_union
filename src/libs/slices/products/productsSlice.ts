import { ProductEntityWithCategoryT } from '~/libs/slices/products/types/product-entity-with-category.type.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChosenProduct } from '~/pages/products/libs/types/checked-product.type.ts';
import { RootState } from '~/libs/slices/store.ts';
import { AddProductFormData } from '~/libs/components/add-product-modal/add-product-modal.tsx';
import { categoriesMock } from '~/libs/slices/categories/mocks/categories.mock.ts';
import {productsMock} from "~/libs/slices/products/mocks/products.mock.ts";

export type ProductsSlice = {
  products: ProductEntityWithCategoryT[];
  chosenProducts: ChosenProduct[];
};
const initialState: ProductsSlice = {
  products: productsMock,
  chosenProducts: [],
};
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addOne: {
      reducer(
        state,
        action: PayloadAction<Omit<ProductEntityWithCategoryT, 'id'>>,
      ) {
        const id = state.products.slice(-1)[0].id + 1;
        state.products.push({ ...action.payload, id });
      },
      prepare(formData: AddProductFormData) {
        const category = Object.values(categoriesMock)[formData.categoryId];
        const price = Number.parseInt(formData.price.toString());
        return {
          payload: {
            ...formData,
            id: -1,
            category,
            price,
          },
        };
      },
    },

    removeChosenOne(state, action: PayloadAction<ChosenProduct>) {
      state.chosenProducts = state.chosenProducts.filter(
        (chosenProduct) => chosenProduct.id !== action.payload.id,
      );
    },
    clearChosenProducts(state) {
      state.chosenProducts = [];
    },
    addChosenOne(state, action: PayloadAction<ChosenProduct>) {
      state.chosenProducts.push(action.payload);
    },
  },
});

export const { clearChosenProducts, removeChosenOne, addChosenOne, addOne } =
  productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;
export const selectChosenProducts = (state: RootState) =>
  state.products.chosenProducts;
export const selectChosenOne =
  (id?: ChosenProduct['id']) => (state: RootState) =>
    state.products.chosenProducts.find(
      (chosenProduct) => chosenProduct.id === id,
    );
