import { AppRoute } from '~/libs/enums/enums';
import { Route, Routes, Router as LibraryRouter } from 'react-router';
import { App } from '../app/app';
import { NotFoundPage } from '~/pages/not-found/not-found.page.tsx';
import { ProductsPage } from '~/pages/products/products.page';
import { ProductPage } from '~/pages/product/product.page.tsx';
import { createBrowserHistory } from 'history';
import { useLayoutEffect, useState } from 'react';
import { useHistoryLogContext } from '~/libs/hooks/use-history-log-context.hook.tsx';
import { CategoriesSiderLayout } from '~/libs/components/categories-sider-layout/categories-sider-layout.tsx';
import {HomePage} from "~/pages/home/home.page.tsx";
const history = createBrowserHistory();
const Router = (): JSX.Element => {
  const [, historyLogDispatch] = useHistoryLogContext();
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    history.listen(({ action, location }) => {
      setState({ action, location });
    });
  }, [historyLogDispatch]);

  useLayoutEffect(() => {
    historyLogDispatch({
      type: state.action,
      payload: { path: state.location.pathname },
    });
  }, [state]);

  return (
    <LibraryRouter
      location={state.location}
      navigator={history}
      navigationType={state.action}
    >
      <Routes>
        <Route element={<App />}>
          <Route element={<CategoriesSiderLayout />}>
            <Route index element={<HomePage/>}/>
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
