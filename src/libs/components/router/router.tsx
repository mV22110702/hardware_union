import { AppRoute } from '~/libs/enums/enums';
import { RouterProvider } from '../router-provider/router-provider';
import { redirect, Route } from 'react-router';
import { App } from '../app/app';
import { NotFoundPage } from '~/pages/not-found/not-found.page.tsx';
import { ProductsPage } from '~/pages/products/products.page';
import { ProductPage } from '~/pages/product/product.page.tsx';
import { productsMock } from '~/libs/slices/products/mocks/products.mock';

const Router = (): JSX.Element => (
  <RouterProvider>
    <Route element={<App />}>
      <Route path={AppRoute.ROOT} element={<ProductsPage />} />
      <Route
        path={AppRoute.PRODUCT}
        element={<ProductPage />}
        loader={({ params }) => {
          const product = productsMock.find(
            (product) => product.id.toString() === params.productId,
          );
          return product ?? redirect(AppRoute.ANY);
        }}
      />
    </Route>

    <Route path={AppRoute.ANY} element={<NotFoundPage />} />
  </RouterProvider>
);

export { Router };
