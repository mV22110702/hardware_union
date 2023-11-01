import {Layout, List} from 'antd';
import styles from './styles.module.scss';
import { getValidClassNames } from '~/libs/helpers/get-valid-class-names.helper';
import {categoriesMock} from "~/libs/slices/categories/mocks/categories.mock.ts";
import {generatePath, NavLink} from "react-router-dom";
import {AppRoute} from "~/libs/enums/app-route.enum.ts";

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
          <List.Item>
            <NavLink
              to={generatePath(AppRoute.CATEGORIES, {
                categoryId: id.toString(),
              })}
            >
              {name}
            </NavLink>
          </List.Item>
        )}
      />
    </AntSider>
  );
};

export { Sider };
