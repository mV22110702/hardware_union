import { Dropdown, MenuProps, Space } from 'antd';
import styles from './styles.module.scss';
import { useCallback, useContext, useEffect } from 'react';
import { Currency } from '~/libs/enums/currency.enum';
import { ChosenCurrencyContext } from '~/libs/components/chosen-currency-provider/chosen-currency-provider';
import { CurrencyValues } from '~/libs/types/currency-values.type';

const CurrencyNavbarDropdown = () => {
  const { chosenCurrency, setChosenCurrency } = useContext(
    ChosenCurrencyContext,
  )!;
  useEffect(() => {}, []);
  const handleCurrencyChange = useCallback<NonNullable<MenuProps['onClick']>>(
    (event) => {
      setChosenCurrency(event.key as CurrencyValues);
    },
    [chosenCurrency, setChosenCurrency],
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
