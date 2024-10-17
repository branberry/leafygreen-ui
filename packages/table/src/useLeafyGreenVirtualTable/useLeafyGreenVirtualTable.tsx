import { useState } from 'react';
import { ExpandedState, getExpandedRowModel } from '@tanstack/react-table';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';

import useLeafyGreenTable, { LGRowData } from '../useLeafyGreenTable';

import {
  LeafyGreenVirtualItem,
  LeafyGreenVirtualTable,
  LeafyGreenVirtualTableOptions,
} from './useLeafyGreenVirtualTable.types';

function useLeafyGreenVirtualTable<
  T extends LGRowData,
  V extends unknown = unknown,
>({
  containerRef,
  data,
  columns,
  hasSelectableRows,
  withPagination = false,
  allowSelectAll = true,
  virtualizerOptions,
  ...rest
}: LeafyGreenVirtualTableOptions<T, V>): LeafyGreenVirtualTable<T> {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const table = useLeafyGreenTable({
    data,
    columns,
    withPagination,
    allowSelectAll,
    hasSelectableRows,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      expanded,
    },
    ...rest,
  });

  const { rows } = table;

  //TODO: this memo breaks the for loop below 😭
  // const rowsCopy = useMemo(() => [...rows], [rows]);
  const rowsCopy = [...rows];

  // A way to include expandableContent inside of the rows object.
  // If a row has expandedContent and its expanded then add a new row below the row
  for (let i = 0; i < rowsCopy.length; i++) {
    if (
      rowsCopy[i].original.renderExpandedContent &&
      rowsCopy[i].getIsExpanded()
    ) {
      rowsCopy.splice(i + 1, 0, {
        ...rowsCopy[i],
        id: `${rowsCopy[i].id}-expandedContent`,
        original: {
          ...rowsCopy[i].original,
          isExpandedContent: true,
        },
      });
      i++; // Increment index to skip the newly added item
    }
  }

  const _virtualizer = useVirtualizer({
    count: rowsCopy.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 40,
    overscan: 20,
    // getItemKey: useCallback(
    //   (index: number) => rowsCopy[index]?.id ?? index,
    //   [rowsCopy],
    // ),
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    ...virtualizerOptions,
  });

  const _virtualItems: Array<LeafyGreenVirtualItem<T>> = _virtualizer
    .getVirtualItems()
    .map((virtualRow: VirtualItem) => ({
      ...virtualRow,
      row: rowsCopy[virtualRow.index],
    }));

  return {
    ...table,
    rows: rowsCopy,
    virtual: { ..._virtualizer, virtualItems: _virtualItems },
  } as LeafyGreenVirtualTable<T>;
}

export default useLeafyGreenVirtualTable;
