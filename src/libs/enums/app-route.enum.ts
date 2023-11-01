const AppRoute = {
  ROOT: '/',
  CATEGORIES:'/categories/:categoryId',
  PRODUCT: '/products/:productId',
  HISTORY: '/history',
  ANY: '*',
} as const;

export { AppRoute };
