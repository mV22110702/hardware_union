import { Modal } from 'antd';
import React, { FC } from 'react';
import {
  Form,
  Field,
  FieldProps,
  Formik,
  useField,
} from 'formik';
import * as yup from 'yup';
import {
  Box,
  Stack,
  TextField,
  Button,
  CircularProgress,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { categoriesMock } from '~/libs/slices/categories/mocks/categories.mock.ts';
import {MuiFormikTextField} from "~/libs/components/sign-up-modal/sign-up-modal.tsx";

export type AddProductFormData = {
  name: string;
  price: number;
  categoryId: number;
};

type RawAddProductFormData = Omit<AddProductFormData, 'price'> & {
  price?: number;
};

export type Properties = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: (formData: AddProductFormData) => Promise<void>;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const AddProductModal: FC<Properties> = ({
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
      title={'Add product'}
      destroyOnClose
    >
      <Formik
        onSubmit={async (values: RawAddProductFormData) => {
          await sleep(1000);
          await handleSubmit(values as AddProductFormData);
          setIsOpen(false);
        }}
        initialValues={{
          name: '',
          categoryId: -1,
        }}
        validationSchema={yup.object({
          name: yup
            .string()
            .required('Required')
            .min(3, 'Minimal length: 3 symbols'),
          price: yup
            .number()
            .required('Required')
            .moreThan(0, 'Cannot be <= 0')
            .lessThan(1e7, 'Inadequate price'),
          categoryId: yup
            .number()
            .required('Required')
            .min(0, 'Invalid category'),
        })}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Stack>
                <Box sx={{ mt: 3, mb: 3 }}>
                  <MuiFormikTextField name={'name'}/>
                </Box>
                <Box sx={{ mt: 3, mb: 3 }}>
                  <MuiFormikTextField name={'price'}/>
                </Box>
                <Box sx={{ mt: 3, mb: 3 }}>
                  <CategorySelect name="categoryId" />
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

export const CategorySelect: FC<{ name: string }> = ({ name }) => {
  const [field, meta, helper] = useField({ name, type: 'number' });
  return (
    <FormControl fullWidth error={meta.touched && !!meta.error}>
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        id="demo-simple-select"
        label={'Category'}
        value={field.value}
        onChange={(event) => {
          helper.setValue(Number.parseInt(event.target.value), true);
        }}
      >
        {Object.values(categoriesMock).map(
          ({ name: categoryName }, categoryId) => {
            return <MenuItem value={categoryId}>{categoryName}</MenuItem>;
          },
        )}
      </Select>
      <FormHelperText error={meta.touched && !!meta.error}>
        {meta.touched && meta.error}
      </FormHelperText>
    </FormControl>
  );
};
