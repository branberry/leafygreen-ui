/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum aa200f912666400fa37709652cc362c7
 */
import { css, cx } from '@leafygreen-ui/emotion';
import PropTypes from 'prop-types';
import * as React from 'react';

import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface MultiLayersProps extends LGGlyph.ComponentProps {}
const MultiLayers = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: MultiLayersProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'MultiLayers', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
  });
  return (
    <svg
      className={cx(
        {
          [fillStyle]: fill != null,
        },
        noFlexShrink,
        className,
      )}
      height={typeof size === 'number' ? size : sizeMap[size]}
      width={typeof size === 'number' ? size : sizeMap[size]}
      role={role}
      {...accessibleProps}
      {...props}
      viewBox="0 0 16 16"
    >
      <path
        d="M12.4311 9.74514L12.1717 9.62373L12.4311 9.50233C12.7321 9.3607 13.0019 9.15837 13.1887 8.90545C13.3858 8.65253 13.5 8.32879 13.5 8.00506C13.5 7.68132 13.3858 7.3677 13.1887 7.10467C12.9915 6.85175 12.7321 6.64942 12.4311 6.50778L12.1406 6.36615L12.3585 6.26498C12.6594 6.12335 12.9292 5.92101 13.116 5.66809C13.3132 5.41517 13.4274 5.09144 13.4274 4.7677C13.4274 4.44397 13.3132 4.13035 13.116 3.86732C12.9189 3.6144 12.6594 3.41206 12.3585 3.27043L9.1934 1.76303C8.79906 1.58093 8.38396 1.5 7.96887 1.5C7.55377 1.5 7.1283 1.58093 6.74434 1.76303L3.56887 3.27043C3.26792 3.41206 2.99811 3.6144 2.81132 3.86732C2.61415 4.12023 2.5 4.44397 2.5 4.7677C2.5 5.09144 2.61415 5.40506 2.81132 5.66809C3.00849 5.92101 3.26792 6.12335 3.56887 6.26498L3.85943 6.40661L3.64151 6.50778C3.34057 6.64942 3.07075 6.85175 2.88396 7.10467C2.68679 7.35759 2.57264 7.68132 2.57264 8.00506C2.57264 8.32879 2.68679 8.64241 2.88396 8.90545C3.08113 9.15837 3.34057 9.3607 3.64151 9.50233L3.90094 9.62373L3.64151 9.74514C3.34057 9.88677 3.07075 10.0891 2.88396 10.342C2.68679 10.5949 2.57264 10.9187 2.57264 11.2424C2.57264 11.5661 2.68679 11.8798 2.88396 12.1428C3.08113 12.3957 3.34057 12.5981 3.64151 12.7397L6.8066 14.237C7.19057 14.4191 7.61604 14.5 8.03113 14.5C8.44623 14.5 8.8717 14.4191 9.25566 14.237L12.4208 12.7397C12.7217 12.5981 12.9915 12.3957 13.1783 12.1428C13.3755 11.8899 13.4896 11.5661 13.4896 11.2424C13.4896 10.9187 13.3755 10.6051 13.1783 10.342C12.9811 10.0891 12.7217 9.88677 12.4208 9.74514H12.4311ZM8.04151 12.9926C7.83396 12.9926 7.63679 12.9521 7.50189 12.8813L4.33679 11.384C4.22264 11.3335 4.17075 11.2728 4.15 11.2525L4.17075 11.2323L4.33679 11.121L5.69623 10.4837L6.82736 11.0198C7.21132 11.2019 7.63679 11.2829 8.05189 11.2829C8.46698 11.2829 8.89245 11.2019 9.27642 11.0198L10.4075 10.4837L11.767 11.121C11.8811 11.1716 11.933 11.2323 11.9538 11.2525L11.933 11.2728L11.767 11.384L8.60189 12.8813C8.4566 12.9521 8.25943 12.9926 8.06226 12.9926H8.04151ZM4.13962 8.00506L4.16038 7.98482L4.32642 7.87354L5.64434 7.2463L6.74434 7.76226C7.1283 7.94436 7.55377 8.02529 7.96887 8.02529C8.38396 8.02529 8.80943 7.94436 9.1934 7.76226L10.366 7.20584L11.7566 7.86342C11.8708 7.91401 11.9226 7.97471 11.9434 7.99494L11.9226 8.01517L11.7566 8.12646L8.59151 9.62373C8.44623 9.69455 8.24906 9.73502 8.05189 9.73502C7.84434 9.73502 7.64717 9.69455 7.51226 9.62373L4.34717 8.12646C4.23302 8.07588 4.18113 8.01517 4.16038 7.99494L4.13962 8.00506ZM4.06698 4.7677L4.08774 4.74747L4.25377 4.63619L7.41887 3.13891C7.56415 3.06809 7.76132 3.02763 7.95849 3.02763C8.16604 3.02763 8.36321 3.06809 8.49811 3.13891L11.6632 4.63619C11.7774 4.68677 11.8292 4.74747 11.85 4.7677L11.8292 4.78794L11.6632 4.89922L8.49811 6.3965C8.35283 6.46731 8.15566 6.50778 7.95849 6.50778C7.75094 6.50778 7.55377 6.46731 7.41887 6.3965L4.25377 4.89922C4.13962 4.84864 4.08774 4.78794 4.06698 4.7677Z"
        fill={'currentColor'}
      />
    </svg>
  );
};
MultiLayers.displayName = 'MultiLayers';
MultiLayers.isGlyph = true;
MultiLayers.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default MultiLayers;
