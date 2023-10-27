import React, { useCallback, useContext } from 'react';
import isUndefined from 'lodash/isUndefined';

import { Dropdown } from '@leafygreen-ui/dropdown';
import { cx } from '@leafygreen-ui/emotion';
import { useAvailableSpace } from '@leafygreen-ui/hooks';
import { Align, Justify } from '@leafygreen-ui/popover';

import { DropdownWidthBasis } from '../Select/Select.types';
import SelectContext from '../SelectContext';
import { useForwardedRef } from '../utils';

import {
  autoWidthStyles,
  maxMenuHeight,
  menuMargin,
  popoverClassName,
} from './ListMenu.styles';
import { ListMenuProps } from './ListMenu.types';

/**
 * @internal
 */
const ListMenu = React.forwardRef<HTMLUListElement, ListMenuProps>(
  function ListMenu(
    {
      children,
      id,
      referenceElement,
      className,
      labelId,
      setOpen,
      dropdownWidthBasis,
      usePortal = true,
      portalContainer,
      scrollContainer,
      portalClassName,
      popoverZIndex,
    }: ListMenuProps,
    forwardedRef,
  ) {
    const { disabled, open } = useContext(SelectContext);

    const ref = useForwardedRef(forwardedRef, null);

    const availableSpace = useAvailableSpace(referenceElement, menuMargin);
    const maxHeightValue = !isUndefined(availableSpace)
      ? Math.min(availableSpace, maxMenuHeight)
      : undefined;

    const onClick = useCallback(
      (event: React.MouseEvent) => {
        if (ref.current) {
          ref.current.focus();
        }
        event.stopPropagation();
      },
      [ref],
    );

    const popoverProps = {
      popoverZIndex,
      ...(usePortal
        ? { usePortal, portalClassName, portalContainer, scrollContainer }
        : { usePortal }),
    };

    return (
      <Dropdown
        {...popoverProps}
        open={open && !disabled}
        setOpen={setOpen}
        spacing={6}
        align={Align.Bottom}
        justify={Justify.Start}
        adjustOnMutation
        className={cx(popoverClassName, className, {
          [autoWidthStyles]: dropdownWidthBasis === DropdownWidthBasis.Option,
        })}
        triggerRef={referenceElement}
        onClick={onClick}
        maxHeight={maxHeightValue}
        id={id}
        aria-labelledby={labelId}
        ref={ref}
      >
        {children}
      </Dropdown>
    );
  },
);

ListMenu.displayName = 'ListMenu';

export default ListMenu;
