import React, {PropsWithChildren} from 'react';
import styles from './styles.module.scss';
import { Button } from 'antd';

type Properties = {
  onClick: ()=>void;
};
const NavbarButton: React.FC<PropsWithChildren<Properties>> = ({ onClick, children }) => {
  return (
    <Button type={'link'} onClick={onClick} className={styles.navButtonDefault}>
      {children}
    </Button>
  );
};

export { NavbarButton };
