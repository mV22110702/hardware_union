import { createSlice } from '@reduxjs/toolkit';
import { ValueOf } from '~/libs/types/value-of.type.ts';
import { Action as HistoryAction } from 'history';
import { v4 } from 'uuid';
import { RootState } from '~/libs/slices/store.ts';

export type Action<
  ActionType extends ValueOf<HistoryAction> = ValueOf<HistoryAction>,
> = {
  type: ActionType;
  payload: {
    path: ActionType extends HistoryAction.Pop ? undefined : string;
  };
};
export type HistoryLog = {
  path: string;
  id: string;
};

export type HistorySlice = {
  historyLog: HistoryLog[];
};
const initialState: HistorySlice = {
  historyLog: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    pop(state) {
      state.historyLog.pop();
    },
    push(state, action: Action) {
      state.historyLog.push({ path: action.payload.path, id: v4() });
    },
    replace(state, action: Action) {
      state.historyLog[state.historyLog.length - 1] = {
        path: action.payload.path,
        id: v4(),
      };
    },
  },
});

export const {
  pop: popHistory,
  push: pushHistory,
  replace: replaceHistory,
} = historySlice.actions;
export const selectHistoryLog = (state: RootState) => state.history.historyLog;
