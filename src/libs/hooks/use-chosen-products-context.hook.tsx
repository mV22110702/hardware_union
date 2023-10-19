import {useContext} from "react";
import {ChosenProductsContext} from "~/libs/components/chosen-products-provider/chosen-products-provider.tsx";

export const useChosenProductsContext = () => {
    const chosenProductsContext = useContext(ChosenProductsContext)!;

    return chosenProductsContext;
}