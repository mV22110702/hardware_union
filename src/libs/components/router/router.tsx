import { AppRoute } from '~/libs/enums/enums';
import { RouterProvider } from '../router-provider/router-provider';
import {redirect, Route} from 'react-router';
import { App } from '../app/app';
import { NotFound } from '~/pages/not-found/not-found';
import { ProductsPage } from '~/pages/products/products.page';
import { Product } from '~/pages/product/product';
import { productsMock } from '~/libs/slices/products/mocks/products.mock';

const Router = (): JSX.Element => (
  <RouterProvider>
    <Route element={<App />}>
      <Route path={AppRoute.ROOT} element={<ProductsPage />} />
      <Route
        path={AppRoute.PRODUCT}
        element={<Product />}
        loader={({ params }) => {
          const product = productsMock.find(
            (product) => product.id.toString() === params.productId,
          );
          return product ?? redirect(AppRoute.ANY);
        }}
      />
    </Route>

    <Route path={AppRoute.ANY} element={<NotFound />} />
  </RouterProvider>
);

export { Router };
