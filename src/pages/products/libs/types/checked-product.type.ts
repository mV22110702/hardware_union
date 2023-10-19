import { ProductEntityT } from '~/libs/slices/products/types/product-entity.type';

type ChosenProduct = Pick<ProductEntityT, 'id'>;

export { type ChosenProduct };
