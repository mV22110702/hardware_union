import { Main } from '../main/main';
import { Layout as AntLayout } from 'antd';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Outlet, useNavigation } from 'react-router-dom';
import '~/assets/css/scaffolding.scss';

function App() {
  const navigation = useNavigation();
  const hasSider = navigation.location;
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
