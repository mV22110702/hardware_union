import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { SignUpFormData } from '~/libs/components/sign-up-modal/sign-up-modal.tsx';
import { SignInFormData } from '~/libs/components/sign-in-modal/sign-in-modal.tsx';
import { AddProductFormData } from '~/libs/components/add-product-modal/add-product-modal.tsx';
import { useAppDispatch } from '~/libs/slices/store.ts';
import { signIn, signUp } from '~/libs/slices/auth/authSlice.ts';
import { v4 } from 'uuid';
import { addOne } from '~/libs/slices/products/productsSlice.ts';

export const HistoryModalContext = createContext<{
  showHistoryModal: boolean;
  setShowHistoryModal: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export const SignInModalContext = createContext<{
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (isOpen: boolean) => void;
  handleSubmitSignInForm: (formData: SignInFormData) => Promise<void>;
} | null>(null);

export const SignUpModalContext = createContext<{
  isSignUpModalOpen: boolean;
  setIsSignUpModalOpen: (isOpen: boolean) => void;
  handleSubmitSignUpForm: (formData: SignUpFormData) => Promise<void>;
} | null>(null);

export const AddProductModalContext = createContext<{
  isAddProductModalOpen: boolean;
  setIsAddProductModalOpen: (isOpen: boolean) => void;
  handleSubmitAddProductForm: (formData: AddProductFormData) => Promise<void>;
} | null>(null);

export const ModalProviders: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleSubmitSignInForm = useCallback(
    async (formData: SignInFormData) => {
      dispatch(signIn({ token: v4() }));
      alert(`Sign in success. Hello, ${formData.username}`);
      await setTimeout(() => {}, 1000);
    },
    [dispatch],
  );

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const handleSubmitSignUpForm = useCallback(
    async (formData: SignUpFormData) => {
      dispatch(signUp({ token: v4() }));
      alert(`Sign up success. Hello, ${formData.email}`);
      await setTimeout(() => {}, 1000);
    },
    [dispatch],
  );

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleSubmitAddProductForm = useCallback(
    async (formData: AddProductFormData) => {
      dispatch(addOne(formData));
      await setTimeout(() => {}, 1000);
    },
    [dispatch],
  );

  return (
    <AddProductModalContext.Provider
      value={{
        handleSubmitAddProductForm,
        isAddProductModalOpen,
        setIsAddProductModalOpen,
      }}
    >
      <SignInModalContext.Provider
        value={{
          handleSubmitSignInForm,
          isSignInModalOpen,
          setIsSignInModalOpen,
        }}
      >
        <SignUpModalContext.Provider
          value={{
            handleSubmitSignUpForm,
            isSignUpModalOpen,
            setIsSignUpModalOpen,
          }}
        >
          <HistoryModalContext.Provider
            value={{ showHistoryModal, setShowHistoryModal }}
          >
            {children}
          </HistoryModalContext.Provider>
        </SignUpModalContext.Provider>
      </SignInModalContext.Provider>
    </AddProductModalContext.Provider>
  );
};
