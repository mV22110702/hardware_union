import { FC } from 'react';
import { useNavigate} from 'react-router-dom';
import { List } from 'antd';
import styles from './styles.module.scss'

type Properties = {
  to: string;
  label: string;
};
export const SiderListItem: FC<Properties> = ({ to, label }) => {
    const navigate = useNavigate()
  return (
    <List.Item onClick={()=>navigate(to)} className={styles.siderListItem}>
        <div style={{padding:20}}>
            {label}
        </div>
    </List.Item>
  );
};
