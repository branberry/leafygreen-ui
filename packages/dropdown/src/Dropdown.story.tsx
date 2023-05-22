import React from 'react';
import { ComponentStory } from '@storybook/react';

import { Dropdown, DropdownItem, DropdownProvider } from './Dropdown/Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
};

const Template: ComponentStory<typeof Dropdown> = props => (
  <DropdownProvider>
    <Dropdown>
      <DropdownItem>A</DropdownItem>
      <DropdownItem>B</DropdownItem>
      <DropdownItem>C</DropdownItem>
      <DropdownItem>D</DropdownItem>
    </Dropdown>
  </DropdownProvider>
);

export const Basic = Template.bind({});
