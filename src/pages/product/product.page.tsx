import { useLoaderData } from 'react-router';
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
import {
  useCallback,
  useMemo,
} from 'react';
import {
    exchangeCurrency,
    getBreadcrumbItem,
} from '~/libs/helpers/helpers';
import { NavLink } from 'react-router-dom';
import { handleChooseProductCard } from '~/libs/components/product-card/libs/helpers/handle-choose-product-card.helper';
import {CommentForm} from '~/libs/components/comment-form/comment-form.tsx';
import {Currency} from "~/libs/enums/enums.ts";
import {useChosenProductsContext} from "~/libs/hooks/use-chosen-products-context.hook.tsx";
import {useChosenCurrencyContext} from "~/libs/hooks/use-chosen-currency-context.hook.tsx";
import {useComments} from "~/libs/hooks/use-comments.hook.tsx";

const { Paragraph, Text } = Typography;

const ProductPage: React.FC = () => {
  const chosenProductsContext = useChosenProductsContext();
  const { chosenCurrency } = useChosenCurrencyContext();

  const product = useLoaderData() as ProductEntityWithCategoryT;
  const breadCrumbs = useMemo(() => {
    return [
      getBreadcrumbItem({
        title: (
          <NavLink to={`/?category=${product.category.name}`}>
            {product.category.name}
          </NavLink>
        ),
      }),
      getBreadcrumbItem({ title: product.name }),
    ];
  }, [product.name, product.category]);

const {comments,commentContent,handleCommentContentChange,handleCommentSubmit}= useComments()



  const isChecked = !!chosenProductsContext!.chosenProducts.find(
    (checkedProduct) => checkedProduct.id === product.id,
  );

  const handleCheck = useCallback(
    handleChooseProductCard(chosenProductsContext!.setChosenProducts),
    [handleChooseProductCard, chosenProductsContext!.setChosenProducts],
  );

  return (
    <Layout className={getValidClassNames(styles.pageLayout)}>
      <Row>
        <Breadcrumb items={breadCrumbs} />
      </Row>

      <Row gutter={[50, 30]}>
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
            title={product.name}
          >
            <p>
              <b>Price</b>: {exchangeCurrency({have:Currency.UAH,want:chosenCurrency,amount:product.price})} {chosenCurrency}
            </p>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col flex={1}>
          <Title level={4}>Comments</Title>
        </Col>
      </Row>
      <Row>
        <Col flex={1}>
          <CommentForm
            commentContent={commentContent}
            handleFinish={handleCommentSubmit}
            handleTextAreaChange={handleCommentContentChange}
          />
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
