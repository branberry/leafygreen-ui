import React, { useMemo } from 'react';
import isEqual from 'react-fast-compare';

import { cx } from '@leafygreen-ui/emotion';
import { useMergeRefs } from '@leafygreen-ui/hooks';

import { LGRowData } from '../useLeafyGreenTable';

import InternalRowBase from './InternalRowBase';
import { getRowWithRTStyles } from './Row.styles';
import { InternalRowWithRTProps, RowComponentWithRTType } from './Row.types';
import { RowContextProvider } from './RowContext';

/**
 * Renders row data provided by `useReactTable`
 *
 * @internal
 */
const InternalRowWithRT = <T extends LGRowData>({
  children,
  className,
  row,
  virtualRow,
  disabled = false,
  shouldAlternateRowColor,
  theme,
  measureElement,
  isExpanded,
  isParentExpanded,
  isSelected,
  rowRef,
  ...rest
}: InternalRowWithRTProps<T>) => {
  // We need to use the virtualRow index instead of nth-of-type because the rows are not static
  const isOddVSRow = !!virtualRow && virtualRow.index % 2 !== 0;

  const isExpandable = row.getCanExpand();
  const depth = row.depth;

  const contextValues = useMemo(() => {
    return {
      disabled,
      isExpanded,
      isExpandable,
      depth,
      toggleExpanded: () => row.toggleExpanded(),
    };
  }, [depth, disabled, isExpandable, isExpanded, row]);

  return (
    <RowContextProvider {...contextValues}>
      <InternalRowBase
        className={cx(
          getRowWithRTStyles(
            isOddVSRow,
            shouldAlternateRowColor,
            isSelected,
            !!virtualRow,
            disabled,
            isExpanded || isParentExpanded,
            theme,
          ),
          className,
        )}
        data-selected={isSelected}
        data-expanded={isExpanded}
        data-depth={row.depth}
        id={`lg-table-row-${row.id}`}
        ref={useMergeRefs([rowRef, measureElement])}
        data-index={virtualRow ? virtualRow!.index : ''}
        {...rest}
      >
        {children}
      </InternalRowBase>
    </RowContextProvider>
  );
};

export const MemoizedInternalRowWithRT = React.memo(
  InternalRowWithRT,
  (prevProps, nextProps) => {
    const { children: prevChildren, ...restPrevProps } = prevProps;
    const { children: nextChildren, ...restNextProps } = nextProps;

    const propsAreEqual = isEqual(restPrevProps, restNextProps);

    return propsAreEqual;
  },
) as RowComponentWithRTType;
