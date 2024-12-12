<script setup lang="ts">
import toLower from 'lodash/toLower';

defineOptions({
  name: 'ComponentB',
});

type Props = {
  text: string;
}

defineProps<Props>();
</script>

<template>
  <div class="tv-p-4 tv-rounded-lg tv-bg-red-500 tv-text-white tv-w-fit">
    Component B: <b>{{ toLower(text) }}</b>
  </div>
</template>
