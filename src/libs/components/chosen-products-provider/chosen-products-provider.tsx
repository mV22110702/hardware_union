import { createContext, PropsWithChildren, useState } from 'react';
import { ChosenProduct } from '~/pages/products/libs/types/checked-product.type';

const ChosenProductsContext = createContext<{
  chosenProducts: ChosenProduct[];
  setChosenProducts: React.Dispatch<React.SetStateAction<ChosenProduct[]>>;
} | null>(null);

type Properties = PropsWithChildren;

const ChosenProductsProvider: React.FC<Properties> = ({ children }) => {
  const [chosenProducts, setChosenProducts] = useState<ChosenProduct[]>([]);

  return (
    <ChosenProductsContext.Provider
      value={{ chosenProducts, setChosenProducts }}
    >
      {children}
    </ChosenProductsContext.Provider>
  );
};

export { ChosenProductsProvider, ChosenProductsContext };
