import {SignUpModalContext} from '~/libs/components/modal-providers/modal-providers.tsx';
import { useContext } from 'react';

export const useSignUpModalContext = () => {
  const signUpModalContext = useContext(SignUpModalContext)!;
  return signUpModalContext;
};
