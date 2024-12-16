import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

import { useTestVueLibOptions } from '@/plugin';

export const useCounterStore = defineStore('counter', () => {
  const options = useTestVueLibOptions();

  const count = ref<number>(options.counter?.initialValue ?? 0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value += options.counter?.step ?? 1;
  }
  function decrement() {
    count.value -= options.counter?.step ?? 1;
  }

  return { count, doubleCount, increment, decrement };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
