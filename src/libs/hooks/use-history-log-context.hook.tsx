import { useContext } from 'react';
import {
  HistoryLogContext,
} from "~/libs/components/history-log-context-provider/history-log-context-provider.tsx";

export const useHistoryLogContext = () => {
  const historylogContext = useContext(HistoryLogContext)!;

  return historylogContext;
};
