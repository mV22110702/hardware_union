import { Layout, List } from 'antd';
import styles from './styles.module.scss';
import { getValidClassNames } from '~/libs/helpers/get-valid-class-names.helper';
import { categoriesMock } from '~/libs/slices/categories/mocks/categories.mock.ts';
import { generatePath } from 'react-router-dom';
import { AppRoute } from '~/libs/enums/app-route.enum.ts';
import { SiderListItem } from '~/libs/components/sider-list-item/sider-list-item.tsx';

const { Sider: AntSider } = Layout;

type Properties = {
  className?: string;
};

const Sider: React.FC<Properties> = ({ className }) => {
  return (
    <AntSider
      className={getValidClassNames(className, styles.sider)}
      theme={'light'}
    >
      <List
        itemLayout={'vertical'}
        dataSource={Object.values(categoriesMock)}
        renderItem={({ name, id }) => (
          <SiderListItem
            to={generatePath(AppRoute.CATEGORIES, {
              categoryId: id.toString(),
            })}
            label={name}
          />
        )}
      />
    </AntSider>
  );
};

export { Sider };
