import { ProductEntityWithCategoryT } from '~/libs/slices/products/types/product-entity-with-category.type';
import {
  Avatar,
  Breadcrumb,
  Card,
  Checkbox,
  Col,
  Image,
  List,
  Row,
  Typography,
} from 'antd';
import { Layout } from '~/libs/components/layout/layout';
import { getValidClassNames } from '~/libs/helpers/get-valid-class-names.helper';
import styles from './styles.module.scss';
import { categoryToImg } from '~/libs/slices/categories/maps/category-to-img.map';
import Title from 'antd/es/typography/Title';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { exchangeCurrency, getBreadcrumbItem } from '~/libs/helpers/helpers';
import { generatePath, Navigate, NavLink, useParams } from 'react-router-dom';
import { CommentForm } from '~/libs/components/comment-form/comment-form.tsx';
import { AppRoute, Currency } from '~/libs/enums/enums.ts';
import { useComments } from '~/libs/hooks/use-comments.hook.tsx';
import { useAppDispatch, useAppSelector } from '~/libs/slices/store.ts';
import { selectChosenCurrency } from '~/libs/slices/currency/currencySlice.ts';
import {
  addChosenOne,
  removeChosenOne,
  selectChosenOne,
  selectProducts,
} from '~/libs/slices/products/productsSlice.ts';

const { Paragraph, Text } = Typography;

const ProductPage: React.FC = () => {
  const chosenCurrency = useAppSelector(selectChosenCurrency);
  const params = useParams<{ productId: string }>();
  const [isError, setIsError] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductEntityWithCategoryT | null>(
    null,
  );
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!params.productId) {
      setIsError(true);
      return;
    }
    const productId = Number.parseInt(params.productId);
    if (Number.isNaN(productId)) {
      setIsError(true);
      return;
    }
    const product = products.find((product) => product.id === productId);
    if (!product) {
      setIsError(true);
      return;
    }
    setProduct(product);
  }, [params.productId]);

  const breadCrumbs = useMemo(() => {
    return !product
      ? []
      : [
          getBreadcrumbItem({
            title: (
              <NavLink
                to={generatePath(AppRoute.CATEGORIES, {
                  categoryId: product.category.id.toString(),
                })}
              >
                {product.category.name}
              </NavLink>
            ),
          }),
          getBreadcrumbItem({ title: product.name }),
        ];
  }, [product?.name, product?.category, products]);

  const { comments, handleCommentSubmit } = useComments();

  const isChecked = !!useAppSelector(selectChosenOne(product?.id));

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

  const productInfo =
    !product && !isError ? (
      <Col flex={1}>Loading...</Col>
    ) : isError ? (
      <Navigate to={AppRoute.ROOT} />
    ) : !product ? (
      <Navigate to={AppRoute.ROOT} />
    ) : (
      <>
        <Col flex={2} className={getValidClassNames(styles.imageContainer)}>
          <Image height={300} src={categoryToImg[product.category.name]} />
        </Col>
        <Col flex={1}>
          <Card
            extra={
              <Checkbox
                checked={isChecked}
                onChange={(event) =>
                  handleCheck({
                    id: product.id,
                    isChecked: event.target.checked,
                  })
                }
              />
            }
            title={
              <Text
                copyable={{ text: window.location.href, tooltips: 'Copy link' }}
              >
                {product.name}
              </Text>
            }
          >
            <Paragraph>
              <Text strong>Price: </Text>
              <Text>
                {`${exchangeCurrency({
                  have: Currency.UAH,
                  want: chosenCurrency,
                  amount: product.price,
                })} 
                ${chosenCurrency}`}
              </Text>
            </Paragraph>
          </Card>
        </Col>
      </>
    );

  return (
    <Layout className={getValidClassNames(styles.pageLayout)}>
      <Row>
        <Breadcrumb items={breadCrumbs} />
      </Row>
      {productInfo}
      <Row gutter={[50, 30]}></Row>
      <Row>
        <Col flex={1}>
          <Title level={4}>Comments</Title>
        </Col>
      </Row>
      <Row>
        <Col flex={1}>
          <CommentForm handleFinish={handleCommentSubmit} />
        </Col>
      </Row>
      <Row>
        <Col flex={1}>
          <List itemLayout={'vertical'}>
            {comments.map((comment) => (
              <List.Item key={comment.id}>
                <List.Item.Meta
                  avatar={
                    <div>
                      <Avatar src={comment.author.avatarURL} />
                    </div>
                  }
                  description={comment.author.username}
                  title={comment.title}
                />
                <Paragraph
                  ellipsis={{ rows: 1, expandable: true, symbol: 'more' }}
                >
                  {comment.content}
                </Paragraph>
                <Text type={'secondary'}>{comment.date.toUTCString()}</Text>
              </List.Item>
            ))}
          </List>
        </Col>
      </Row>
    </Layout>
  );
};

export { ProductPage };
