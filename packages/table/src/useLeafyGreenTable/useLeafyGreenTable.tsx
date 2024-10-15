import React from 'react';
import {
  // ExpandedState,
  // getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import omit from 'lodash/omit';

import { TableHeaderCheckbox } from './TableHeaderCheckbox';
import { TableRowCheckbox } from './TableRowCheckbox';
import { LeafyGreenTableOptions, LGRowData } from './useLeafyGreenTable.types';
import { LeafyGreenTable, LGColumnDef, LGTableDataType } from '.';

const CHECKBOX_WIDTH = 14;

function useLeafyGreenTable<T extends LGRowData, V extends unknown = unknown>({
  // containerRef,
  data,
  columns: columnsProp,
  hasSelectableRows,
  withPagination = false,
  allowSelectAll = true,
  // isVirtual = false,
  // virtualizerOptions,
  ...rest
}: LeafyGreenTableOptions<T, V>): LeafyGreenTable<T> {
  // const [expanded, setExpanded] = React.useState<ExpandedState>({});

  /**
   * A `ColumnDef` object injected into `useReactTable`'s `columns` option when the user is using selectable rows.
   */
  const baseSelectColumnConfig: LGColumnDef<T, V> = {
    id: 'select',
    size: CHECKBOX_WIDTH,
    header: TableHeaderCheckbox,
    cell: TableRowCheckbox,
  };

  const hasSortableColumns = React.useMemo(
    () => columnsProp.some(propCol => !!propCol.enableSorting),
    [columnsProp],
  );
  const selectColumnConfig = allowSelectAll
    ? baseSelectColumnConfig
    : omit(baseSelectColumnConfig, 'header');
  const columns = React.useMemo<Array<LGColumnDef<T, V>>>(
    () => [
      ...(hasSelectableRows ? [selectColumnConfig as LGColumnDef<T, V>] : []),
      ...columnsProp.map(propColumn => {
        return {
          ...propColumn,
          align: propColumn.align ?? 'left',
          enableSorting: propColumn.enableSorting ?? false,
        } as LGColumnDef<T, V>;
      }),
    ],
    [columnsProp, hasSelectableRows, selectColumnConfig],
  );

  const table = useReactTable<LGTableDataType<T>>({
    state: {
      // expanded,
      ...rest.state,
    },
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: row => {
      return !!row.original.renderExpandedContent || !!row.subRows?.length;
    },
    enableExpanding: true,
    enableSortingRemoval: hasSortableColumns ? true : undefined,
    // onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: withPagination ? getPaginationRowModel() : undefined,
    // getExpandedRowModel: getExpandedRowModel(),
    ...rest,
  });

  const { rows, flatRows } = table.getRowModel();

  // A way to include expandableContent inside of the rows object.
  // If a row has expandedContent and its expanded then add a new row below the row
  // const whichRows = isVirtual ? rows : flatRows;
  // const rowsCopy = [...whichRows];

  // for (let i = 0; i < rowsCopy.length; i++) {
  //   if (
  //     rowsCopy[i].original.renderExpandedContent &&
  //     rowsCopy[i].getIsExpanded()
  //   ) {
  //     rowsCopy.splice(i + 1, 0, {
  //       ...rowsCopy[i],
  //       id: `${rowsCopy[i].id}-expandedContent`,
  //       original: {
  //         ...rowsCopy[i].original,
  //         isExpandedContent: true,
  //       },
  //     });
  //     i++; // Increment index to skip the newly added item
  //   }
  // }

  // console.log({ rowsCopy });

  return {
    ...table,
    hasSelectableRows,
    // rows: rowsCopy,
    rows: rows,
  } as LeafyGreenTable<T>;
}

export default useLeafyGreenTable;
