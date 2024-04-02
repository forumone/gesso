import { Meta, StoryObj } from '@storybook/react';

import ExampleBlock from './Example';

export default {
  title: 'React/Example',
  component: ExampleBlock,
} as Meta<typeof ExampleBlock>;

const Example: StoryObj<typeof ExampleBlock> = {};

export { Example };
