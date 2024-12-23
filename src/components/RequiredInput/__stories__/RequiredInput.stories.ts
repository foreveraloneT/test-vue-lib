import type { Meta, StoryObj } from '@storybook/vue3';

import RequiredInput from '../RequiredInput.vue';
import { ref } from 'vue';

const meta: Meta<typeof RequiredInput> = {
  title: 'RequiredInput',
  component: RequiredInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RequiredInput>;

export const Playground: Story = {
  args: {
    name: 'test',
  },
  render: (args) => ({
    components: { RequiredInput },
    setup() {
      const v = ref('');

      return { v, args };
    },
    template: `
      <RequiredInput
        v-model="v"
        v-bind="args"
      />
    `,
  }),
};
