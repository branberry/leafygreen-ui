import React from 'react';
import PropTypes from 'prop-types';

import { DropdownLabel } from '@leafygreen-ui/dropdown';

import { InternalOptionProps, OptionGroupProps } from './OptionGroup.types';

export function InternalOptionGroup({
  label,
  children,
  ...rest
}: InternalOptionProps) {
  return (
    <DropdownLabel label={label} {...rest}>
      {children}
    </DropdownLabel>
  );
}

InternalOptionGroup.displayName = 'OptionGroup';

export function OptionGroup(_: OptionGroupProps): JSX.Element {
  throw Error('`OptionGroup` must be a child of a `Select` instance');
}

OptionGroup.displayName = 'OptionGroup';

OptionGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOf([false, null, undefined, '']),
        PropTypes.element,
      ]),
    ),
  ]).isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export type OptionGroupElement = React.ReactComponentElement<
  typeof OptionGroup
>;
