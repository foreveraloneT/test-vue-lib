import type { Meta, StoryObj } from '@storybook/vue3';

import ComponentB from '../ComponentB.vue';

const meta: Meta<typeof ComponentB> = {
  title: 'ComponentB',
  component: ComponentB,
  tags: ['autodocs'],
  args: {
    text: 'Hello, World!',
  }
};

export default meta;
type Story = StoryObj<typeof ComponentB>;

export const Playground: Story = {};
