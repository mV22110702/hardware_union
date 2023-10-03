import { categoriesMock } from '~/libs/slices/categories/mocks/categories.mock';
import { ProductEntityWithCategoryT } from '~/libs/slices/products/types/product-entity-with-category.type';

let id = 0;
const productsMock: ProductEntityWithCategoryT[] = Object.values(categoriesMock)
  .map(({ name: categoryName }, categoryId) => {
    return Object.keys(Array.from({ length: 10 })).map((index) => ({
      id: id++,
      name: `${index}-${categoryName}`,
      price: Number.parseFloat((Math.random() * 1000).toFixed(1)),
      category: {
        id: categoryId,
        name: categoryName,
      },
    }));
  })
  .flat();

export { productsMock };
