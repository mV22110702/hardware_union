import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { useAuthContext } from '~/libs/hooks/use-auth-context.hook.tsx';
import { SignInFormData } from '~/libs/components/auth-modal/auth-modal.tsx';

export const HistoryModalContext = createContext<{
  showHistoryModal: boolean;
  setShowHistoryModal: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export const SignInModalContext = createContext<{
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (isOpen: boolean) => void;
  handleSubmitSignInForm: (formData: SignInFormData) => Promise<void>;
} | null>(null);

export const ModalProviders: FC<PropsWithChildren> = ({ children }) => {
  const authContext = useAuthContext();

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleSubmitSignInForm = useCallback(
    async (formData: SignInFormData) => {
      authContext.setAuth(true);
      alert(`Sign in success. Hello, ${formData.username}`);
      await setTimeout(() => {}, 1000);
    },
    [authContext, setIsSignInModalOpen],
  );

  return (
    <SignInModalContext.Provider
      value={{
        handleSubmitSignInForm,
        isSignInModalOpen,
        setIsSignInModalOpen,
      }}
    >
      <HistoryModalContext.Provider
        value={{ showHistoryModal, setShowHistoryModal }}
      >
        {children}
      </HistoryModalContext.Provider>
    </SignInModalContext.Provider>
  );
};
