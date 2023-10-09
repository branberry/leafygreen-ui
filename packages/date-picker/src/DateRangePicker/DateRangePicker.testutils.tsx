import React from 'react';
import {
  getByRole as globalGetByRole,
  render,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DateRangePicker, DateRangePickerProps } from '.';

interface RenderDateRangePickerResult extends RenderResult {
  formField: HTMLElement;
  inputContainer: HTMLElement;
  inputElements: Array<HTMLInputElement>;
  calendarButton: HTMLButtonElement;
  getMenuElements: () => RenderMenuResult;
  openMenu: () => RenderMenuResult;
}

interface RenderMenuResult {
  menuContainerEl: HTMLElement | null;
  leftChevron: HTMLButtonElement | null;
  rightChevron: HTMLButtonElement | null;
  monthSelect: HTMLButtonElement | null;
  yearSelect: HTMLButtonElement | null;
  calendarGrids: Array<HTMLTableElement> | null;
  calendarCells: Array<HTMLTableCellElement>;
  todayCell: HTMLTableCellElement | null;
}

/**
 * Renders a date picker for jest environments
 */
export const renderDateRangePicker = (
  props?: Partial<DateRangePickerProps>,
): RenderDateRangePickerResult => {
  const defaultProps = { label: '' };
  const result = render(
    <DateRangePicker
      data-testid="lg-date-picker"
      {...defaultProps}
      {...props}
    />,
  );

  const formField = result.getByTestId('lg-date-picker');
  const inputContainer = result.getByRole('combobox');

  const inputElements = Array.from(inputContainer.querySelectorAll('input'));

  const calendarButton = globalGetByRole(
    inputContainer,
    'button',
  ) as HTMLButtonElement;

  /**
   * Returns relevant menu elements.
   * Call this after the menu has been opened
   */
  function getMenuElements(): RenderMenuResult {
    const menuContainerEl = result.queryByRole('listbox');

    const calendarGrids = result.queryAllByRole(
      'grid',
    ) as Array<HTMLTableElement>;

    const calendarCells = result.queryAllByRole(
      'gridcell',
    ) as Array<HTMLTableCellElement>;

    // label text is tested in DatePickerMenu.spec
    const leftChevron = result.queryByLabelText(
      'Previous month',
    ) as HTMLButtonElement;
    const rightChevron = result.queryByLabelText(
      'Next month',
    ) as HTMLButtonElement;
    const monthSelect = result.queryByLabelText(
      'Select month',
    ) as HTMLButtonElement;
    const yearSelect = result.queryByLabelText(
      'Select year',
    ) as HTMLButtonElement;
    const todayCell = menuContainerEl?.querySelector(
      '[aria-current="true"]',
    ) as HTMLTableCellElement;

    return {
      menuContainerEl,
      calendarGrids,
      calendarCells,
      todayCell,
      leftChevron,
      rightChevron,
      monthSelect,
      yearSelect,
    };
  }

  function openMenu(): RenderMenuResult {
    userEvent.click(inputContainer);
    return getMenuElements();
  }

  return {
    ...result,
    formField,
    inputContainer,
    inputElements,
    calendarButton,
    getMenuElements,
    openMenu,
  };
};
