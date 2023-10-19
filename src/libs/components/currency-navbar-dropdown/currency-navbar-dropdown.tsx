import { Dropdown, MenuProps, Space } from 'antd';
import styles from './styles.module.scss';
import { useCallback, useEffect } from 'react';
import { Currency } from '~/libs/enums/currency.enum';
import { CurrencyValues } from '~/libs/types/currency-values.type';
import { useChosenCurrencyContext } from '~/libs/hooks/use-chosen-currency-context.hook.tsx';

const CurrencyNavbarDropdown = () => {
  const { chosenCurrency, setChosenCurrency } = useChosenCurrencyContext();
  useEffect(() => {}, []);
  const handleCurrencyChange = useCallback<NonNullable<MenuProps['onClick']>>(
    (event) => {
      setChosenCurrency(event.key as CurrencyValues);
    },
    [setChosenCurrency],
  );
  const dropDownItems: MenuProps['items'] = [
    {
      label: `USD (${Currency.USD})`,
      key: Currency.USD,
      onClick: handleCurrencyChange,
    },
    {
      label: `UAH (${Currency.UAH})`,
      key: Currency.UAH,
      onClick: handleCurrencyChange,
    },
  ];
  return (
    <Dropdown menu={{ items: dropDownItems }} trigger={['click']}>
      <div className={styles.dropdownTextContainer}>
        <Space className={styles.dropdownText}>{chosenCurrency}</Space>
      </div>
    </Dropdown>
  );
};

export { CurrencyNavbarDropdown };
