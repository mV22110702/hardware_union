import { AppRoute } from '~/libs/enums/enums';

type ParametersOptions = {
  [AppRoute.PRODUCT]: { productId: string };
};

export { type ParametersOptions };
