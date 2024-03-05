import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';

import Badge, { BadgeProps, Variant } from '.';

const meta: StoryMetaType<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        variant: Object.values(Variant),
      },
    },
  },
  args: {
    children: 'Badge',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};
export default meta;

export const LiveExample: StoryFn<BadgeProps> = args => <Badge {...args} />;
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Truncated: StoryFn<BadgeProps> = args => (
  <div
    className={css`
      max-width: 150px;
    `}
  >
    <Badge
      {...args}
      children="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    />
  </div>
);

export const Generated = () => {};
