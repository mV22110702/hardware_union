import { CategoryEntityT } from '~/libs/slices/categories/types/category-entity.type';
import { ProductEntityT } from '~/libs/slices/products/types/product-entity.type';

type ProductEntityWithCategoryT = ProductEntityT & {
  category: CategoryEntityT;
};

export { type ProductEntityWithCategoryT };
