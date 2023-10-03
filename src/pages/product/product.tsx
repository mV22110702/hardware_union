import { useLoaderData } from 'react-router';
import { ProductEntityWithCategoryT } from '~/libs/slices/products/types/product-entity-with-category.type';
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Form,
  Image,
  Input,
  List,
  message,
  Row,
  Typography,
} from 'antd';
import { Layout } from '~/libs/components/layout/layout';
import { getValidClassNames } from '~/libs/helpers/get-valid-class-names.helper';
import styles from './styles.module.scss';
import { categoryToImg } from '~/libs/slices/categories/maps/category-to-img.map';
import Title from 'antd/es/typography/Title';
import {
  ChangeEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  getBreadcrumbItem,
  getRandomAvatarSource,
} from '~/libs/helpers/helpers';
import { NavLink } from 'react-router-dom';
import { CommentEntityT } from '~/libs/slices/comments/types/comment-entity.type';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';

const { Paragraph, Text } = Typography;

type FormData = {
  username: string;
  title: string;
};

const Product: React.FC = () => {
  const [commentContent, setCommentContent] = useState<string>('');
  const [form] = useForm<FormData>();
  const [comments, setComments] = useState<CommentEntityT[]>([]);
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

  const handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((event) => {
        console.log("CHANGE")
        console.log(event.target.value);
        setCommentContent(event.target.value);
    }, [setCommentContent]);

  const handleFinish = useCallback(
    (formData: FormData) => {
      setComments((prevState) => [
        ...prevState,
        {
          id: crypto.randomUUID(),
          date: new Date(),
          author: {
            avatarURL: getRandomAvatarSource(),
            username: formData.username,
          },
          content: commentContent,
          title: formData.title,
        },
      ]);
      toast.success('Comment has been added!');
      console.log(`Comment: ${commentContent}`);
    },
    [setComments, comments, commentContent],
  );

  return (
    <Layout className={getValidClassNames(styles.pageLayout)}>
      <Row>
        <Breadcrumb items={breadCrumbs} />
      </Row>

      <Row
        gutter={[50, 30]}
        className={getValidClassNames(styles.productInfoContainer)}
      >
        <Col flex={2} className={getValidClassNames(styles.imageContainer)}>
          <Image height={300} src={categoryToImg[product.category.name]} />
        </Col>
        <Col flex={1}>
          <Title
            level={3}
            className={getValidClassNames(styles.priceContainer)}
          >
            <p>Name: {product.name}</p>
            <p>Price: {product.price} $</p>
          </Title>
        </Col>
      </Row>
      <Row>
        <Col flex={1}>
          <Title level={4}>Comments</Title>
        </Col>
      </Row>
      <Row>
        <Col flex={1}>
          <Form
            onFinish={handleFinish}
            form={form}
            layout={'vertical'}
            requiredMark={true}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Username required' }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Title required' }]}
            >
              <Input placeholder="Enter comment title" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'Comment cannot be empty' }]}
              label="Comment message"
              name="content"
              required
            >
              <Input.TextArea
                value={commentContent}
                rows={4}
                onChange={handleTextAreaChange}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col flex={1}>
          <List itemLayout={'vertical'}>
            {comments.map((comment) => (
              <List.Item key={comment.id}>
                <List.Item.Meta
                  avatar={
                    <div style={{width:"30px"}}>
                      <Avatar src={comment.author.avatarURL} />
                      <br />
                        <Text ellipsis>{comment.author.username}</Text>
                    </div>
                  }
                  title={comment.title}
                  description={comment.date.toUTCString()}
                />
                <Paragraph
                  ellipsis={{ rows: 1, expandable: true, symbol: 'more' }}
                >
                  {comment.content}
                </Paragraph>
              </List.Item>
            ))}
          </List>
        </Col>
      </Row>
    </Layout>
  );
};

export { Product };
