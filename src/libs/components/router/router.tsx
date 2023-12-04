import { AppRoute } from '~/libs/enums/enums';
import { Route, Router as LibraryRouter, Routes } from 'react-router';
import { App } from '../app/app';
import { NotFoundPage } from '~/pages/not-found/not-found.page.tsx';
import { ProductsPage } from '~/pages/products/products.page';
import { ProductPage } from '~/pages/product/product.page.tsx';
import { Action, createBrowserHistory } from 'history';
import { useLayoutEffect, useState } from 'react';
import { CategoriesSiderLayout } from '~/libs/components/categories-sider-layout/categories-sider-layout.tsx';
import { HomePage } from '~/pages/home/home.page.tsx';
import { useAppDispatch } from '~/libs/slices/store.ts';
import {
  popHistory,
  pushHistory,
  replaceHistory,
} from '~/libs/slices/history/historySlice.ts';

const history = createBrowserHistory();
const Router = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    history.listen(({ action, location }) => {
      setState({ action, location });
    });
  }, []);

  useLayoutEffect(() => {
    if (state.action === Action.Pop) {
      dispatch(popHistory());
    } else if (state.action === Action.Push) {
      dispatch(pushHistory({ path: state.location.pathname }));
    } else if (state.action === Action.Replace) {
      dispatch(replaceHistory({ path: state.location.pathname }));
    }
  }, [state, dispatch]);

  return (
    <LibraryRouter
      location={state.location}
      navigator={history}
      navigationType={state.action}
    >
      <Routes>
        <Route element={<App />}>
          <Route element={<CategoriesSiderLayout />}>
            <Route index element={<HomePage />} />
            <Route path={AppRoute.CATEGORIES} element={<ProductsPage />} />
          </Route>
          <Route path={AppRoute.PRODUCT} element={<ProductPage />} />
        </Route>
        <Route path={AppRoute.ANY} element={<NotFoundPage />} />
      </Routes>
    </LibraryRouter>
  );
};

export { Router };
