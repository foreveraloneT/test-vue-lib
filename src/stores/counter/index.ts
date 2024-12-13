import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  function decrement() {
    count.value--;
  }

  return { count, doubleCount, increment, decrement };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
