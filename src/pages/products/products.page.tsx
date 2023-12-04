import { Col, Pagination, Row, Tag } from 'antd';
import styles from './styles.module.scss';
import { ProductCard } from '~/libs/components/product-card/product-card';
import { Content } from '../../libs/components/content/content';
import {
  createRef,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePagination } from '~/libs/hooks/use-pagination.hook.tsx';
import { ProductEntityWithCategoryT } from '~/libs/slices/products/types/product-entity-with-category.type.ts';
import { AppRoute } from '~/libs/enums/enums.ts';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Fab, IconButton } from '@mui/material';
import { PlusOutlined } from '@ant-design/icons';
import { useAddProductModalContext } from '~/libs/hooks/use-add-product-modal-context.hook.tsx';
import { AddProductModal } from '~/libs/components/add-product-modal/add-product-modal.tsx';
import { useAppDispatch, useAppSelector } from '~/libs/slices/store.ts';
import {
  addChosenOne,
  clearChosenProducts,
  removeChosenOne,
  selectChosenProducts,
  selectProducts,
} from '~/libs/slices/products/productsSlice.ts';

export type ProductWithRef = {
  product: ProductEntityWithCategoryT;
  nodeRef: RefObject<HTMLDivElement>;
};
const ProductsPage: React.FC = () => {
  const params = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [totalProductsCount, setTotalProductsCount] = useState<number>(0);
  const [products, setProducts] = useState<ProductWithRef[]>([]);
  const areAnyCheckedProducts = !!useAppSelector(selectChosenProducts).length;
  const { pagination, paginateSlice, resetPagination, handlePaginationChange } =
    usePagination();
  const rawProducts = useAppSelector(selectProducts);
  const chosenProducts = useAppSelector(selectChosenProducts);
  console.log(rawProducts.filter((product) => product.category.name === 'SSD'));
  const dispatch = useAppDispatch();
  useEffect(() => {
    resetPagination();
  }, [params.categoryId, resetPagination]);
  const handleCheck = useCallback(
    ({ id, isChecked }: { id: number; isChecked: boolean }) => {
      if (isChecked) {
        dispatch(removeChosenOne({ id }));
      } else {
        dispatch(addChosenOne({ id }));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (params.categoryId === undefined || params.categoryId === '') {
      setProducts(
        rawProducts.map((product) => ({
          product,
          nodeRef: createRef<HTMLDivElement>(),
        })),
      );
      return;
    }
    const categoryId = Number.parseInt(params.categoryId);
    if (Number.isNaN(categoryId)) {
      navigate(AppRoute.ROOT);
    }
    const filteredProductsMock = categoryId
      ? rawProducts
          .map((product) => ({
            product,
            nodeRef: createRef<HTMLDivElement>(),
          }))
          .filter((productObj) => productObj.product.category.id === categoryId)
      : rawProducts.map((product) => ({
          product,
          nodeRef: createRef<HTMLDivElement>(),
        }));
    setTotalProductsCount(filteredProductsMock.length);
    const paginatedProductsMock = paginateSlice(filteredProductsMock);
    setProducts(paginatedProductsMock);
  }, [navigate, paginateSlice, params.categoryId, rawProducts]);

  const addProductModalContext = useAddProductModalContext();

  const productCards = products.map((product) => {
    const isChecked = !!chosenProducts.find(
      (chosenProduct) => chosenProduct.id === product.product.id,
    );
    return (
      <CSSTransition
        nodeRef={product.nodeRef}
        timeout={500}
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive,
        }}
      >
        <Col key={product.product.id} ref={product.nodeRef}>
          <ProductCard
            isChecked={isChecked}
            handleCheck={handleCheck}
            key={product.product.id}
            productWithCategory={product.product}
          />
        </Col>
      </CSSTransition>
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
          onClose={() => dispatch(clearChosenProducts())}
        >
          {chosenProducts.length} Chosen
        </Tag>
      )}
      <Row
        style={{ marginRight: 0, marginBottom: 20 }}
        justify="start"
        gutter={[20, 40]}
      >
        <TransitionGroup component={null}>{productCards}</TransitionGroup>
      </Row>
      <Row justify={'center'}>
        <Pagination
          current={pagination.page}
          showSizeChanger
          onChange={handlePaginationChange}
          pageSize={pagination.size}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          total={totalProductsCount}
        />
      </Row>
      <Fab
        color={'primary'}
        sx={{ position: 'fixed', right: '30px', bottom: '30px' }}
      >
        <IconButton
          sx={{ color: 'white' }}
          onClick={() => addProductModalContext.setIsAddProductModalOpen(true)}
        >
          <PlusOutlined />
        </IconButton>
      </Fab>
      <AddProductModal
        setIsOpen={addProductModalContext.setIsAddProductModalOpen}
        handleSubmit={addProductModalContext.handleSubmitAddProductForm}
        isOpen={addProductModalContext.isAddProductModalOpen}
      />
    </Content>
  );
};

export { ProductsPage };
