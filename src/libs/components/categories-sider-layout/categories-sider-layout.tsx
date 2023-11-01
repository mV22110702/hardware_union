import { Sider } from '~/libs/components/sider/sider.tsx';
import { Layout } from '~/libs/components/layout/layout.tsx';
import { Outlet } from 'react-router-dom';

export const CategoriesSiderLayout = () => {
  return (
    <Layout hasSider>
      <Sider />
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
};
