import { forwardRef, useMemo } from 'react';
import { produce } from 'immer';
import { CloseOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import Title from 'antd/es/typography/Title';
import { Button } from 'antd';
import { useAppSelector } from '~/libs/slices/store.ts';
import { selectHistoryLog } from '~/libs/slices/history/historySlice.ts';
type Properties = {
  onClose: () => void;
};
export const HistoryModal = forwardRef<HTMLDivElement, Properties>(
  ({ onClose }, ref) => {
    const historyLog = useAppSelector(selectHistoryLog);
    console.log(historyLog);
    const reversedHistoryForStack = useMemo(() => {
      return produce(historyLog, (draft) => draft.reverse());
    }, [historyLog.length]);
    return (
      <div ref={ref} className={styles.modalRoot} onClick={onClose}>
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <div className={styles.modalTitle}>
              <Title level={3}>History stack</Title>
            </div>
            <div className={styles.modalCloseIcon}>
              <Button type={'link'} onClick={onClose}>
                <CloseOutlined />
              </Button>
            </div>
          </div>
          <div className={styles.modalBody}>
            <ul>
              {reversedHistoryForStack.map((log) => (
                <li key={log.id}>
                  {log.path} ({log.id.substring(0, 4)})
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.modalFooter}>
            <Button onClick={onClose} className={styles.modalCloseButton}>
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
