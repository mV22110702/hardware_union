import {useContext} from "react";
import {ChosenCurrencyContext} from "~/libs/components/chosen-currency-provider/chosen-currency-provider.tsx";

export const useChosenCurrencyContext = () => {
    const chosenCurrencyContext = useContext(ChosenCurrencyContext)!;

    return chosenCurrencyContext;
}