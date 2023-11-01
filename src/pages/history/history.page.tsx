import { useHistoryLogContext } from '~/libs/hooks/use-history-log-context.hook.tsx';
import { useMemo } from 'react';
import { produce } from 'immer';
const HistoryPage: React.FC = () => {
  const [historyLog] = useHistoryLogContext();
  console.log(historyLog);
  const reversedHistoryForStack = useMemo(() => {
    return produce(historyLog, (draft) => draft.reverse());
  }, [historyLog.length]);
  return (
    <ul>
      {reversedHistoryForStack.map((log) => (
        <li key={log.id}>
          {log.path} ({log.id.substring(0, 4)})
        </li>
      ))}
    </ul>
  );
};

export { HistoryPage };
