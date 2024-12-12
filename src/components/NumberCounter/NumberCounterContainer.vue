<script setup lang="ts">
import NumberCounter from './NumberCounter.vue';
import { useCounterStore } from '@/stores/counter';

defineOptions({
  name: 'NumberCounterContainer',
});
const store = useCounterStore();
</script>

<template>
  <NumberCounter
    :number="store.count"
    @increment="store.increment"
    @decrement="store.decrement"
  />
</template>
