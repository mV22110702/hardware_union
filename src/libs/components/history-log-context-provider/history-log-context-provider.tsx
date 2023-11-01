import { createContext, PropsWithChildren } from 'react';
import { ImmerReducer, useImmerReducer } from 'use-immer';
import { Action as HistoryAction } from 'history';
import { ValueOf } from '~/libs/types/value-of.type.ts';
import { v4 } from 'uuid';

export type HistoryLog = {
  path: string;
  id: string;
};
const HistoryLogContext = createContext<ReturnType<
  typeof useImmerReducer<Array<HistoryLog>, Action>
> | null>(null);

type Properties = PropsWithChildren;

type Action<
  ActionType extends ValueOf<HistoryAction> = ValueOf<HistoryAction>,
> = {
  type: ActionType;
  payload: {
    path: ActionType extends HistoryAction.Pop ? undefined : string;
  };
};

const reducer: ImmerReducer<Array<HistoryLog>, Action> = (
  state,
  { type, payload: { path } },
) => {
  switch (type) {
    case HistoryAction.Pop: {
      state.pop();
      break;
    }
    case HistoryAction.Push: {
      state.push({ path, id: v4() });
      break;
    }
    case HistoryAction.Replace: {
      state[state.length - 1] = { path, id: v4() };
    }
  }
};

const HistoryLogContextProvider: React.FC<Properties> = ({ children }) => {
  const historyLogImmerReducer = useImmerReducer<Array<HistoryLog>, Action>(
    reducer,
    [],
  );
  return (
    <HistoryLogContext.Provider value={historyLogImmerReducer}>
      {children}
    </HistoryLogContext.Provider>
  );
};

export { HistoryLogContextProvider, HistoryLogContext };
