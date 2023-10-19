import styles from './styles.module.scss';
import { Layout as AntLayout } from 'antd';
const { Footer: AntFooter } = AntLayout;

const Footer: React.FC = () => {
  return (
    <AntFooter className={styles.footer}>
      <span>Max Vaisov, 2023</span>
    </AntFooter>
  );
};

export { Footer };
