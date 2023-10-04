import { Col, Pagination, Row, Tag } from 'antd';
import styles from './styles.module.scss';
import { Sider } from '~/libs/components/sider/sider';
import { MenuItem } from '~/libs/types/menu-item.type';
import { getMenuItem } from '~/libs/helpers/get-menu-item.helper';
import { categoriesMock } from '~/libs/slices/categories/mocks/categories.mock';
import { productsMock } from '~/libs/slices/products/mocks/products.mock';
import { ProductCard } from '~/libs/components/product-card/product-card';
import { Layout } from '~/libs/components/layout/layout';
import { Content } from '../../libs/components/content/content';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { handleChooseProductCard } from '~/libs/components/product-card/libs/helpers/handle-choose-product-card.helper';
import { useSearchParams } from 'react-router-dom';
import { UrlParamsFilter } from '~/pages/products/libs/enums/url-params-filter.helper';
import { CategoryName } from '~/libs/slices/categories/enum/category-name.enum';
import { toast } from 'react-toastify';
import { CategoryNameValues } from '~/libs/slices/categories/types/category-name-values.type';
import { ChosenProductsContext } from '~/libs/components/chosen-products-provider/chosen-products-provider';
import {ChosenCurrencyContext} from "~/libs/components/chosen-currency-provider/chosen-currency-provider.tsx";

const initialPagination = { page: 0, size: 10 };

const ProductsPage: React.FC = () => {
  useContext(ChosenCurrencyContext)!;
  const categoryErrorToastId = useRef<number | string | null>(null);
  const chosenProductsContext = useContext(ChosenProductsContext);
  const areAnyCheckedProducts =
    chosenProductsContext!.chosenProducts.length !== 0;
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<{
    page: number;
    size: number;
  }>(initialPagination);

  const categorySidebarItems: MenuItem[] = useMemo(
    () =>
      Object.values(categoriesMock).map(({ name }) =>
        getMenuItem({ label: name, key: name }),
      ),
    [categoriesMock],
  );

  const categoryFilter = searchParams.get(
    UrlParamsFilter.CATEGORY,
  ) as CategoryNameValues;

  useEffect(() => {
    if (
      categoryFilter &&
      !Object.values(CategoryName).includes(categoryFilter)
    ) {
      if (!categoryErrorToastId.current) {
        categoryErrorToastId.current = toast.error('Invalid category!');
      }
      setSearchParams((searchParams) => {
        searchParams.delete(UrlParamsFilter.CATEGORY);
        return searchParams;
      });
    }
    setPagination(initialPagination);
  }, [categoryFilter]);

  const filteredProductsMock = categoryFilter
    ? productsMock.filter((product) => product.category.name === categoryFilter)
    : productsMock;

  const paginatedProductsMock = filteredProductsMock.slice(
    pagination.page * pagination.size,
    pagination.page * pagination.size + pagination.size,
  );
  const handleCheck = useCallback(
    handleChooseProductCard(chosenProductsContext!.setChosenProducts),
    [handleChooseProductCard, chosenProductsContext!.setChosenProducts],
  );

  const productCards = paginatedProductsMock.map((product) => {
    const isChecked = !!chosenProductsContext!.chosenProducts.find(
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

  const handleSelect = useCallback(
    (key: string) => {
      setSearchParams((searchParams) => {
        searchParams.set(UrlParamsFilter.CATEGORY, key);
        return searchParams;
      });
      categoryErrorToastId.current = null;
    },
    [setSearchParams],
  );

  const handlePagination = useCallback((page: number, size: number) => {
    setPagination({ page, size });
  }, []);

  return (
    <Layout hasSider>
      <Sider handleSelect={handleSelect} items={categorySidebarItems} />
      <Layout>
        <Content className={styles.productsContent}>
          {areAnyCheckedProducts && (
            <Tag
              style={{ margin: 30, padding: 10, fontSize: 15 }}
              color="geekblue"
              closable
              onClose={() => chosenProductsContext!.setChosenProducts([])}
            >
              {chosenProductsContext!.chosenProducts.length} Chosen
            </Tag>
          )}
          <Row style={{ marginRight: 0 }} justify="start" gutter={[20, 40]}>
            {productCards}
          </Row>
          <Row>
            <Pagination
              showSizeChanger
              onChange={handlePagination}
              pageSize={pagination.size}
              total={filteredProductsMock.length - pagination.size}
            />
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export { ProductsPage };
