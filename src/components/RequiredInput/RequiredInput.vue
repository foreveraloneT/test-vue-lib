<script setup lang="ts">
import { Field as VField } from 'vee-validate';

import { useTestVueLibOptions } from '@/plugin';

defineOptions({
  name: 'RequiredInput',
});

type Props = {
  name: string;
}

defineProps<Props>();

const value = defineModel();

const options = useTestVueLibOptions();

function errorAttr(isError: boolean): Record<string, boolean> {
  if (!isError || !options.validation?.errorAttribute) return {};

  return {
    [options.validation.errorAttribute]: true,
  };
}
</script>

<template>
  <VField
    v-slot="{ errors, field }"
    rules="required"
    :name="name"
  >
    <div>
      <input
        class="tv-outline-none tv-border tv-border-gray-300 focus:tv-border-gray-400 hover:tv-border-gray-400 tv-rounded-lg tv-p-2 tv-w-full"
        :class="{
          '!tv-border-red-500': errors.length > 0,
        }"
        v-model="value"
        v-bind="{...errorAttr(errors.length > 0), ...field}"
        type="text"
      />
      <div
        class="tv-text-red-500 tv-text-sm"
        v-if="errors.length > 0"
      >
        {{ errors[0] }}
      </div>
    </div>
  </VField>
</template>
