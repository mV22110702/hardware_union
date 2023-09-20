import {AppRoute} from '~/libs/enums/enums';
import {RouterProvider} from "../router-provider/router-provider";
import {Route} from "react-router";
import {App} from "../app/app";
import {NotFound} from "~/pages/not-found/not-found";

const Router = (): JSX.Element => (
    <RouterProvider>
        <Route path={AppRoute.ROOT} element={<App />}/>
        <Route path={AppRoute.ANY} element={<NotFound />} />
    </RouterProvider>
);

export { Router };
export { Outlet as RouterOutlet } from 'react-router-dom';
