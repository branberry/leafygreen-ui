/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import { Month } from '../constants';
import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../DatePickerContext';
import { Locales, TimeZones } from '../testUtils';
import { DateRangeType } from '../types';
import { newUTC } from '../utils';

import { DateRangePicker } from './DateRangePicker';

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => (
  <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
    <DatePickerProvider
      value={{
        ...ctx?.args,
      }}
    >
      <Story />
    </DatePickerProvider>
  </LeafyGreenProvider>
);

const meta: StoryMetaType<typeof DateRangePicker, DatePickerContextProps> = {
  title: 'Components/DatePicker/DateRangePicker',
  component: DateRangePicker,
  decorators: [ProviderWrapper],
  parameters: {
    default: null,
    controls: {
      exclude: [
        'handleValidation',
        'initialValue',
        'onChange',
        'onSegmentChange',
        'value',
      ],
    },
    // generate: {
    //   combineArgs: {
    //     darkMode: [false, true],
    //     value: [newUTC(2023, Month.December, 26)],
    //     dateFormat: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
    //     timeZone: ['UTC', 'Europe/London', 'America/New_York', 'Asia/Seoul'],
    //     disabled: [false, true],
    //   },
    //   decorator: ProviderWrapper,
    // },
  },
  args: {
    dateFormat: 'en-US',
    label: 'Pick a Range',
    description: 'Coordinated Universal Time',
    min: newUTC(1996, Month.October, 14),
    max: newUTC(2026, Month.October, 14),
    size: Size.Default,
    timeZone: 'America/New_York',
  },
  argTypes: {
    baseFontSize: { control: 'select' },
    dateFormat: { control: 'select', options: Locales },
    description: { control: 'text' },
    label: { control: 'text' },
    min: { control: 'date' },
    max: { control: 'date' },
    size: { control: 'select' },
    state: { control: 'select' },
    timeZone: { control: 'select', options: TimeZones },
  },
};

export default meta;

export const Basic: StoryFn<typeof DateRangePicker> = props => {
  const [range, setRange] = useState<DateRangeType>();

  return <DateRangePicker {...props} value={range} onChange={setRange} />;
};

// export const Uncontrolled: StoryFn<typeof DateRangePicker> = props => {
//   return <DateRangePicker {...props} />;
// };

// export const Generated = () => {};
