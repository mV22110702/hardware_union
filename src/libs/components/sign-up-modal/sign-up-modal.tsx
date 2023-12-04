import { Modal } from 'antd';
import { ComponentProps, FC } from 'react';
import { Form, Formik, useField } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Stack,
  TextField,
  Button,
  CircularProgress,
  capitalize,
} from '@mui/material';

export type SignUpFormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type Properties = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: (formData: SignUpFormData) => Promise<void>;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const SignUpModal: FC<Properties> = ({
  isOpen,
  setIsOpen,
  handleSubmit,
}) => {
  return (
    <Modal
      onCancel={() => setIsOpen(false)}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
      open={isOpen}
      title={'Sign up'}
      destroyOnClose
    >
      <Formik
        onSubmit={async (values) => {
          await sleep(1000);
          await handleSubmit(values);
          setIsOpen(false);
        }}
        initialValues={{
          name: '',
          surname: '',
          email: '',
          password: '',
        }}
        validationSchema={yup.object({
          name: yup
            .string()
            .required('Required')
            .min(3, 'Minimal length: 3 symbols'),
          surname: yup
            .string()
            .required('Required')
            .min(3, 'Minimal length: 3 symbols')
            .max(40, 'Maximum length: 40 symbols'),
          email: yup.string().required('Required').email('Invalid email'),
          password: yup
            .string()
            .required('Required')
            .matches(
              /^(?=.*[A-Z])(?=.*[^a-zA-Z]).+$/,
              'At least 1 uppercase letter, at least 1 non-letter character are required',
            ),
        })}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Stack>
                <Box sx={{ mt: 3, mb: 3 }}>
                  <MuiFormikTextField name={'name'} />
                </Box>
                <Box sx={{ mt: 3, mb: 3 }}>
                  <MuiFormikTextField name={'surname'} />
                </Box>
                <Box sx={{ mt: 3, mb: 3 }}>
                  <EmailField name={'email'} />
                </Box>
                <Box sx={{ mt: 3, mb: 3 }}>
                  <PasswordField name={'password'} />
                </Box>
                <Button
                  type={'submit'}
                  startIcon={isSubmitting && <CircularProgress />}
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export const MuiFormikTextField: FC<{
  name: string;
  type?: ComponentProps<typeof TextField>['type'];
  multiline?: ComponentProps<typeof TextField>['multiline'];
  rows?: ComponentProps<typeof TextField>['rows'];
}> = ({ name, type = 'text', multiline,rows }) => {
  const [field, meta] = useField({ name, type });
  return (
    <TextField
      fullWidth
      label={capitalize(name)}
      type={type}
      multiline={multiline}
      rows={rows}
      {...field}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};
export const EmailField: FC<{ name: string }> = ({ name }) => {
  const [field, meta] = useField({ name, type: 'email' });
  return (
    <TextField
      fullWidth
      id="email"
      label="Email"
      {...field}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export const PasswordField: FC<{ name: string }> = ({ name }) => {
  const [field, meta] = useField({ name, type: 'password' });
  return (
    <TextField
      fullWidth
      id="password"
      label="Password"
      {...field}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};
