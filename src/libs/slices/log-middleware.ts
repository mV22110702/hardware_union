import { Middleware } from 'redux';
import { RootState } from '~/libs/slices/store.ts';

export const LogMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action) => {
    console.log('Incoming action:');
    console.log(action);
    console.log('store before action:');
    console.log(store.getState());
    next(action);
    console.log('store after action:');
    console.log(store.getState());
  };
