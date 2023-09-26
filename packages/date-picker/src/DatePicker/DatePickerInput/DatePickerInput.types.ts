import { MouseEventHandler } from 'react';

import { DynamicRefGetter } from '@leafygreen-ui/hooks/src/useDynamicRefs';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { DateInputBoxProps } from '../../DateInput';
import { DateSegment } from '../../hooks/useDateSegments/DateSegments.types';

export interface DatePickerInputProps
  extends Pick<DateInputBoxProps, 'value' | 'setValue' | 'onSegmentChange'>,
    HTMLElementProps<'div'> {
  /**
   * Click handler
   */
  onClick?: MouseEventHandler;

  segmentRefs: Record<
    DateSegment,
    ReturnType<DynamicRefGetter<HTMLInputElement>>
  >;
}
