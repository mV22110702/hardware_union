import {ProductEntityT} from "~/libs/slices/products/types/product-entity.type";

type CheckedProduct = Pick<ProductEntityT,'id'>;

export { type CheckedProduct };
