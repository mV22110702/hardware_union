import { SignInModalContext } from '~/libs/components/modal-providers/modal-providers.tsx';
import { useContext } from 'react';

export const useSignInModalContext = () => {
  const signInModalContext = useContext(SignInModalContext)!;
  return signInModalContext;
};
