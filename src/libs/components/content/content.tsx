import { getValidClassNames } from '~/libs/helpers/get-valid-class-names.helper';
import styles from './styles.module.scss';
import { Layout } from 'antd';
import { PropsWithChildren } from 'react';
const { Content: AntContent } = Layout;

type Properties = PropsWithChildren<{ className?: string }>;

const Content = ({ children, className }: Properties) => {
  return (
    <AntContent className={getValidClassNames(styles.content, className)}>
      {children}
    </AntContent>
  );
};

export { Content };
