<script setup lang="ts">
defineOptions({
  name: 'NumberCounter',
});

type Props = {
  number: number;
}

defineProps<Props>();

type Emits = {
  (event: 'increment'): void;
  (event: 'decrement'): void;
}

defineEmits<Emits>();
</script>

<template>
  <div class="tv-h-[50px] tv-flex tv-items-center tv-bg-yellow-500 tv-rounded-lg tv-w-fit">
    <div
      class="tv-w-[50px] tv-text-center tv-cursor-pointer"
      @click="$emit('decrement')"
    >
      -
    </div>
    <div>
      {{ number }}
    </div>
    <div
      class="tv-w-[50px] tv-text-center tv-cursor-pointer"
      @click="$emit('increment')"
    >
      +
    </div>
  </div>
</template>
