import { Button, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FC, useCallback, useEffect, useState } from 'react';

export type SignInFormData = {
  username: string;
  password: string;
};

export type Properties = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: (formData: SignInFormData) => Promise<void>;
};
export const AuthModal: FC<Properties> = ({
  isOpen,
  setIsOpen,
  handleSubmit,
}) => {
  const [form] = useForm<SignInFormData>();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const values = Form.useWatch([], form);

  useEffect(() => {
    console.log('values');
    console.log(values);
    console.log(isDisabled);
    console.log(!values || !values.password || !values.username);
    setIsDisabled(!values || !values.password || !values.username);
  }, [values, setIsDisabled, isDisabled]);

  const onFinish = useCallback(
    (formData: SignInFormData) => {
      setIsLoading(true);
      setTimeout(async () => {
        await handleSubmit(formData);
        setIsLoading(false);
        setIsOpen(false);
      }, 1000);
    },
    [handleSubmit],
  );
  return (
    <Modal
      onCancel={() => setIsOpen(false)}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
      open={isOpen}
      title={'Sign in'}
      destroyOnClose
    >
      <Form<SignInFormData>
        preserve={false}
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          validateDebounce={500}
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          validateDebounce={500}
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={isDisabled}
            loading={isLoading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
