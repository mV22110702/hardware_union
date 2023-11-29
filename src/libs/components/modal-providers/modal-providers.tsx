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
import { SignUpFormData } from '~/libs/components/sign-up-modal/sign-up-modal.tsx';
import { SignInFormData } from '~/libs/components/sign-in-modal/sign-in-modal.tsx';
import { AddProductFormData } from '~/libs/components/add-product-modal/add-product-modal.tsx';
import { useProductsContext } from '~/libs/hooks/use-products-context.hook.tsx';
import { categoriesMock } from '~/libs/slices/categories/mocks/categories.mock.ts';

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

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const handleSubmitSignUpForm = useCallback(
    async (formData: SignUpFormData) => {
      authContext.setAuth(true);
      alert(`Sign up success. Hello, ${formData.email}`);
      await setTimeout(() => {}, 1000);
    },
    [authContext, setIsSignUpModalOpen],
  );

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const { setProducts } = useProductsContext();

  const handleSubmitAddProductForm = useCallback(
    async ({ categoryId, ...formData }: AddProductFormData) => {
      setProducts((prev) => {
        const id = prev.slice(-1)[0].id + 1;
        const category = Object.values(categoriesMock)[categoryId];
        return [...prev, { ...formData, id, category }];
      });

      await setTimeout(() => {}, 1000);
    },
    [authContext, setIsAddProductModalOpen],
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
