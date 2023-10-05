import React, { PropsWithChildren, useMemo, useState } from 'react';
import { addMonths } from 'date-fns';

import { useDynamicRefs } from '@leafygreen-ui/hooks';

import { getFirstOfMonth, setToUTCMidnight } from '../../../utils';
import { DateRangeMenuProps } from '../DateRangeMenu.types';

import { DateRangeMenuContext } from './DateRangeMenuContext';

export interface DateRangeMenuProviderProps
  extends Pick<DateRangeMenuProps, 'start' | 'end'>,
    PropsWithChildren<{}> {}

/**
 * Receives the start & end dates
 * and initializes the start & end display months
 */
export const DateRangeMenuProvider = ({
  start,
  end,
  children,
}: DateRangeMenuProviderProps) => {
  const today = useMemo(() => setToUTCMidnight(new Date(Date.now())), []);
  const thisMonth = useMemo(() => getFirstOfMonth(today), [today]);

  const [startMonth, setStartMonth] = useState<Date>(start ?? thisMonth);
  const [endMonth, setEndMonth] = useState<Date>(
    end ?? addMonths(thisMonth, 1),
  );

  const startCellRefs = useDynamicRefs<HTMLTableCellElement>();
  const endCellRefs = useDynamicRefs<HTMLTableCellElement>();

  return (
    <DateRangeMenuContext.Provider
      value={{
        startMonth,
        setStartMonth,
        startCellRefs,
        endMonth,
        setEndMonth,
        endCellRefs,
        today,
      }}
    >
      {children}
    </DateRangeMenuContext.Provider>
  );
};
