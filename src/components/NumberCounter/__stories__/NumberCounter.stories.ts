import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';

import NumberCounter from '../NumberCounter.vue';

const meta: Meta<typeof NumberCounter> = {
  title: 'NumberCounter/NumberCounter',
  component: NumberCounter,
  tags: ['autodocs'],
  args: {
    number: 0,
    onIncrement: fn(),
    onDecrement: fn(),
  }
};

export default meta;
type Story = StoryObj<typeof NumberCounter>;

export const Playground: Story = {};
