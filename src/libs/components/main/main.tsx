import { PropsWithChildren } from 'react';
import { Layout } from '~/libs/components/layout/layout';

type Properties = PropsWithChildren;

const Main: React.FC<Properties> = ({ children }: Properties) => {
  return <Layout hasSider>{children}</Layout>;
};

export { Main };
