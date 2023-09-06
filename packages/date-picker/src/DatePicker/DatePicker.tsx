import React, { forwardRef, useMemo, useRef, useState } from 'react';
import { isSameMonth, setMonth } from 'date-fns';

import { useBackdropClick } from '@leafygreen-ui/hooks';

import { DatePickerProvider } from '../DatePickerContext';
import { toDate } from '../utils/toDate';

import { DatePickerProps } from './DatePicker.types';
import { DatePickerInput } from './DatePickerInput';
import { DatePickerMenu } from './DatePickerMenu';

export const DatePicker = forwardRef(
  ({
    value: valueProp,
    initialValue,
    onChange,
    handleValidation,
    ...rest
  }: DatePickerProps) => {
    const inputRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);
    const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

    const utcValue = useMemo(() => toDate(valueProp), [valueProp]);

    const updateValue = (newVal: Date | null) => {
      // if the new value is not the current month, update the month
      if (newVal && !isSameMonth(newVal, displayMonth)) {
        setDisplayMonth(setMonth(displayMonth, newVal.getMonth()));
      }

      onChange?.(newVal);
    };

    useBackdropClick(
      () => {
        setOpen(false);
      },
      [inputRef, menuRef],
      isOpen,
    );

    const handleInputChange = (inputVal: Date | null) => {
      if (inputVal !== utcValue) updateValue(inputVal);
    };

    const handleCellClick = (cellValue: Date) => {
      updateValue(cellValue);
      setOpen(false);
    };

    const handleMonthChange = (newMonth: Date) => {
      setDisplayMonth(newMonth);
    };

    return (
      <DatePickerProvider value={rest}>
        <DatePickerInput
          ref={inputRef}
          value={utcValue}
          setValue={handleInputChange}
          onClick={() => {
            // TODO: Set focus to appropriate segment
            setOpen(true);
          }}
        />
        <DatePickerMenu
          refEl={inputRef}
          ref={menuRef}
          value={utcValue}
          isOpen={isOpen}
          month={displayMonth}
          onCellClick={handleCellClick}
          onMonthChange={handleMonthChange}
          usePortal={true}
        />
      </DatePickerProvider>
    );
  },
);

DatePicker.displayName = 'DatePicker';
