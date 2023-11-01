import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ExampleBlock from './Example';

export default {
  title: 'React/Example',
  component: ExampleBlock,
} as ComponentMeta<typeof ExampleBlock>;

const Example: ComponentStory<typeof ExampleBlock> = () => <ExampleBlock />;

export { Example };
