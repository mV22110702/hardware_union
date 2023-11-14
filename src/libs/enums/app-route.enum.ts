const AppRoute = {
  ROOT: '/',
  CATEGORIES:'/categories/:categoryId',
  PRODUCT: '/products/:productId',
  ANY: '*',
} as const;

export { AppRoute };
