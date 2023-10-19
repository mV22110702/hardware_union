import { Menu as AntMenu } from 'antd';
import { type MenuItem, type MenuMode } from '~/libs/types/types';

type Properties = {
  items: MenuItem[];
  className?: string;
  mode?: MenuMode;
  handleSelect?: (key: string) => void;
};

const Menu: React.FC<Properties> = ({
  items,
  className,
  mode,
  handleSelect,
}) => {
  return (
    <AntMenu
      onSelect={({ key }) => handleSelect?.(key)}
      mode={mode}
      className={className}
      theme={'light'}
      items={items}
    />
  );
};

export { Menu };
