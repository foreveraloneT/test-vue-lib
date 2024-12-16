<script setup lang="ts">
import { useTranslator } from '@/locale';

defineOptions({
  name: 'ComponentA',
});

const { t } = useTranslator();
</script>

<template>
  <div class="tv-p-4 tv-rounded-lg tv-bg-green-500 tv-w-fit">
    {{ t('oapluscomponent.componenta.title') }}
  </div>
</template>
