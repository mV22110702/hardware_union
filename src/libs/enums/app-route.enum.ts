const AppRoute = {
  ROOT: '/',
  PRODUCT: '/products/:productId',
  HISTORY: '/history',
  ANY: '*',
} as const;

export { AppRoute };
