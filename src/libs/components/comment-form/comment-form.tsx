import { Button, Form, Input } from 'antd';
import { ChangeEventHandler } from 'react';
import { useForm } from 'antd/es/form/Form';

type CommentFormData = {
  username: string;
  title: string;
};

type Properties = {
  handleFinish: (formData: CommentFormData) => void;
  handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement>;
  commentContent: string;
};

const CommentForm: React.FC<Properties> = ({
  handleFinish,
  commentContent,
  handleTextAreaChange,
}) => {
  const [form] = useForm<CommentFormData>();
  return (
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
  );
};

export { CommentForm, type CommentFormData };
