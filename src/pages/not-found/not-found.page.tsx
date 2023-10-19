import { NavLink } from 'react-router-dom';
import { AppRoute } from '~/libs/enums/enums';
import styles from './styles.module.scss';

const NotFoundPage: React.FC = () => (
  <div>
    <h2>
      Oops, <span className={styles.error404}>404</span>.
    </h2>

    <NavLink to={AppRoute.ROOT}>
      <span>Back to Home page</span>
    </NavLink>
  </div>
);

export { NotFoundPage };
