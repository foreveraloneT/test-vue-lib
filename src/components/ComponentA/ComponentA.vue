<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'ComponentA',
});

const { t } = useI18n();
</script>

<template>
  <div class="tv-p-4 tv-rounded-lg tv-bg-green-500 tv-w-fit">
    {{ t('oapluscomponent.componenta.title') }}
  </div>
</template>
