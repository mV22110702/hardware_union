import { Card, Checkbox } from 'antd';
import { ProductEntityWithCategoryT } from '~/libs/slices/products/types/product-entity-with-category.type';
import { handleChooseProductCard } from '~/libs/components/product-card/libs/helpers/handle-choose-product-card.helper';
import { memo, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '~/libs/enums/enums';
import { getValidPath } from '~/libs/helpers/helpers';

type Properties = {
  productWithCategory: ProductEntityWithCategoryT;
  handleCheck: ReturnType<typeof handleChooseProductCard>;
  isChecked: boolean;
};

const ProductCard: React.FC<Properties> = memo(
  ({ productWithCategory, handleCheck, isChecked }) => {
    const productPath = useMemo(() => {
      return getValidPath(AppRoute.PRODUCT, {
        productId: productWithCategory.id.toString(),
      });
    }, [productWithCategory.id]);
    return (
      <Card
        extra={
          <Checkbox
            checked={isChecked}
            onChange={(event) =>
              handleCheck({
                id: productWithCategory.id,
                isChecked: event.target.checked,
              })
            }
          />
        }
        color="red"
        bordered={true}
        style={{ width: 300 }}
      >
        <NavLink to={productPath}>
          <h1>{productWithCategory.name}</h1>
          <h3>{productWithCategory.category.name}</h3>
          <p>{productWithCategory.price}</p>
        </NavLink>
      </Card>
    );
  },
  (prevProps, nextProps) =>
    prevProps.isChecked === nextProps.isChecked &&
    prevProps.productWithCategory.id === nextProps.productWithCategory.id,
);

export { ProductCard };
