import type { Meta, StoryObj } from '@storybook/vue3';

import NumberCounterContainer from '../NumberCounterContainer.vue';

const meta: Meta<typeof NumberCounterContainer> = {
  title: 'NumberCounter/NumberCounterContainer',
  component: NumberCounterContainer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NumberCounterContainer>;

export const Playground: Story = {};
