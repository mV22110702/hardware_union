import {HistoryModalContext} from "~/libs/components/modal-providers/modal-providers.tsx";
import {useContext} from "react";

export const useHistoryModalContext = () => {
    const historyModalContext = useContext(HistoryModalContext)!;
    return historyModalContext;
}
