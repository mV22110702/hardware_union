import { Col, Pagination, Row, Tag } from 'antd';
import styles from './styles.module.scss';
import { ProductCard } from '~/libs/components/product-card/product-card';
import { Content } from '../../libs/components/content/content';
import { useEffect, useMemo, useState } from 'react';
import { handleChooseProductCard } from '~/libs/components/product-card/libs/helpers/handle-choose-product-card.helper';
import { useNavigate, useParams } from 'react-router-dom';
import { useChosenProductsContext } from '~/libs/hooks/use-chosen-products-context.hook.tsx';
import { usePagination } from '~/libs/hooks/use-pagination.hook.tsx';
import { ProductEntityWithCategoryT } from '~/libs/slices/products/types/product-entity-with-category.type.ts';
import { productsMock } from '~/libs/slices/products/mocks/products.mock.ts';
import { AppRoute } from '~/libs/enums/enums.ts';

const ProductsPage: React.FC = () => {
  const params = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [totalProductsCount, setTotalProductsCount] = useState<number>(0);
  const [products, setProducts] = useState<ProductEntityWithCategoryT[]>([]);
  const chosenProductsContext = useChosenProductsContext();
  const areAnyCheckedProducts =
    chosenProductsContext.chosenProducts.length !== 0;
  const { pagination, paginateSlice,resetPagination, handlePaginationChange } = usePagination();

  useEffect(() => {
    resetPagination();
  }, [params.categoryId,resetPagination]);
  const handleCheck = useMemo(
    () => handleChooseProductCard(chosenProductsContext.setChosenProducts),
    [chosenProductsContext.setChosenProducts],
  );

  useEffect(() => {
    if (params.categoryId === undefined || params.categoryId === '') {
      setProducts(productsMock);
      return;
    }
    const categoryId = Number.parseInt(params.categoryId);
    if (Number.isNaN(categoryId)) {
      navigate(AppRoute.ROOT);
    }
    const filteredProductsMock = categoryId
      ? productsMock.filter((product) => product.category.id === categoryId)
      : productsMock;
    setTotalProductsCount(filteredProductsMock.length);
    const paginatedProductsMock = paginateSlice(filteredProductsMock);
    setProducts(paginatedProductsMock);
  }, [navigate, paginateSlice, params.categoryId]);

  const productCards = products.map((product) => {
    const isChecked = !!chosenProductsContext.chosenProducts.find(
      (checkedProduct) => checkedProduct.id === product.id,
    );
    return (
      <Col key={product.id}>
        <ProductCard
          isChecked={isChecked}
          handleCheck={handleCheck}
          key={product.id}
          productWithCategory={product}
        />
      </Col>
    );
  });
  console.log('totalProductsCount');
  console.log(totalProductsCount);
  return (
    <Content className={styles.productsContent}>
      {areAnyCheckedProducts && (
        <Tag
          style={{ margin: 30, padding: 10, fontSize: 15 }}
          color="geekblue"
          closable
          onClose={() => chosenProductsContext.setChosenProducts([])}
        >
          {chosenProductsContext.chosenProducts.length} Chosen
        </Tag>
      )}
      <Row style={{ marginRight: 0 }} justify="start" gutter={[20, 40]}>
        {productCards}
      </Row>
      <Row>
        <Pagination
            current={pagination.page}
          showSizeChanger
          onChange={handlePaginationChange}
          pageSize={pagination.size}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          total={totalProductsCount}
        />
      </Row>
    </Content>
  );
};

export { ProductsPage };
