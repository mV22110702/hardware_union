import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import {Form, Formik} from 'formik';
import { MuiFormikTextField } from '~/libs/components/sign-up-modal/sign-up-modal.tsx';
import * as yup from 'yup';

type CommentFormData = {
  username: string;
  title: string;
  content: string;
};

type Properties = {
  handleFinish: (formData: CommentFormData) => void;
};

const CommentForm: React.FC<Properties> = ({ handleFinish }) => {
  return (
    <Formik<CommentFormData>
      initialValues={{ username: '', content: '', title: '' }}
      validationSchema={yup.object({
        username: yup
          .string()
          .required('Required')
          .min(3, 'Minimum length: 3 symbols'),
        title: yup.string().required('Required'),
        content: yup.string().required('Required'),
      })}
      onSubmit={(formData,formikHelpers) => {
        console.log('finish');
        handleFinish(formData);
        formikHelpers.resetForm()
      }}
    >
      <Form>
        <Stack
          sx={{ m: 3, borderWidth: 1, p: 3, gap: 3 }}
          component={'fieldset'}
        >
          <Box>
            <MuiFormikTextField name={'username'} />
          </Box>
          <Box>
            <MuiFormikTextField name={'title'} />
          </Box>
          <Box>
            <MuiFormikTextField name={'content'} multiline rows={5} />
          </Box>
          <Button type={'submit'} color={'primary'}>
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
};

export { CommentForm, type CommentFormData };
