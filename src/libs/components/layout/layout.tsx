import styles from './styles.module.scss';
import { Layout as AntLayout } from 'antd';
import { ComponentProps, PropsWithChildren } from 'react';
import { getValidClassNames } from '~/libs/helpers/get-valid-class-names.helper';

type Properties = PropsWithChildren<
  Pick<ComponentProps<typeof AntLayout>, 'hasSider' | 'className'>
>;

const Layout: React.FC<Properties> = ({
  children,
  hasSider,
  className,
}: Properties) => {
  return (
    <AntLayout
      className={getValidClassNames(styles.contentWrapper, className)}
      hasSider={hasSider}
    >
      {children}
    </AntLayout>
  );
};

export { Layout };
