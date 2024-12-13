import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, computed } from 'vue';
import toLower from 'lodash/toLower';

export const useTestStore = defineStore('test', () => {
  const text = ref<string>('');
  const upper = computed(() => text.value.toUpperCase());

  function set(v: string) {
    text.value = toLower(v);
  }

  return {
    text,
    upper,
    set,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTestStore, import.meta.hot));
}
