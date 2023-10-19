import { useContext } from 'react';
import { AuthContext } from '~/libs/components/auth-context-provider/auth-context-provider.tsx';

export const useAuthContext = () => {
  const authContext = useContext(AuthContext)!;

  return authContext;
};
