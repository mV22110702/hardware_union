import { Dropdown, MenuProps, Space } from 'antd';
import styles from './styles.module.scss';
import { useCallback } from 'react';
import { Currency } from '~/libs/enums/currency.enum';
import { CurrencyValues } from '~/libs/types/currency-values.type';
import { useAppDispatch, useAppSelector } from '~/libs/slices/store.ts';
import {
  changeCurrency,
  selectChosenCurrency,
} from '~/libs/slices/currency/currencySlice.ts';

const CurrencyNavbarDropdown = () => {
  const chosenCurrency = useAppSelector(selectChosenCurrency);
  const dispatch = useAppDispatch();
  const handleCurrencyChange = useCallback<NonNullable<MenuProps['onClick']>>(
    (event) => {
      dispatch(changeCurrency(event.key as CurrencyValues));
    },
    [dispatch],
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
