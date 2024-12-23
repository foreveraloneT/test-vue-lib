import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import ComponentA from '../ComponentA.vue';

describe('ComponentA', () => {
  describe('snapshots', () => {
    it('should render properly', () => {
      const wrapper = shallowMount(ComponentA);

      expect(wrapper.element).matchSnapshot();
    });
  });
});
