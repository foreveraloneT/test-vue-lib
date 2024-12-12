import type { Meta, StoryObj } from '@storybook/vue3';

import ComponentA from '../ComponentA.vue';

const meta: Meta<typeof ComponentA> = {
  title: 'ComponentA',
  component: ComponentA,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComponentA>;

export const Playground: Story = {};
