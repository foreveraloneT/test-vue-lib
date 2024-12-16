<script setup lang="ts">
import toLower from 'lodash/toLower';
import { useTranslator } from '@/locale';

defineOptions({
  name: 'ComponentB',
});

type Props = {
  text: string;
}

defineProps<Props>();

const { t } = useTranslator();
</script>

<template>
  <div class="tv-p-4 tv-rounded-lg tv-bg-red-500 tv-text-white tv-w-fit">
    {{ t('oapluscomponent.componentb.title') }}:
    <b>{{ toLower(text) }}</b>
  </div>
</template>
