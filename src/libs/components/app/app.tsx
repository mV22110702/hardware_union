import { Main } from '../main/main';
import { Layout as AntLayout } from 'antd';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Outlet } from 'react-router-dom';
import '~/assets/css/scaffolding.scss';

function App() {
  return (
    <AntLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </AntLayout>
  );
}

export { App };
