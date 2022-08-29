<script setup lang="ts">
import { Maybe } from '~~/utils/types';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue';
import { UseVirtualList } from '@vueuse/components';

const props = withDefaults(
  defineProps<{
    modelValue: Maybe<any>;
    options: any[];
    disabled?: boolean;
    h?: string;
  }>(),
  { h: '15rem' }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
</script>

<template>
  <Listbox v-model="vModel" relative as="div">
    <ListboxButton
      flex
      items-center
      p-2
      gap-2
      whitespace-pre
      border="solid 1 light-9 dark:dark-9 focus-within:brand-4"
    >
      <slot name="button" />
      <span m-l-auto i-ui-caret-down h-4 aspect-square />
    </ListboxButton>
    <ClientOnly>
      <ListboxOptions
        divide-y
        divide="black/30 dark:white/30"
        bg="light-1 dark:dark-1 hover:light-3 dark:hover:dark-2"
        border="solid 1 light-9 dark:dark-9"
        m-t-3
        shadow-md
        overflow-y-auto
        absolute
        min-w="full"
      >
        <UseVirtualList
          v-slot="{ data }"
          :list="props.options"
          :options="{ itemHeight: 40 }"
          :height="props.h"
        >
          <ListboxOption
            flex
            gap-2
            p-2
            :value="data"
            cursor-pointer
            h-40px
            overflow-hidden
            bg="hover:light-6 dark:hover:dark-3"
          >
            <slot name="option" :value="data" />
          </ListboxOption>
        </UseVirtualList>
      </ListboxOptions>
    </ClientOnly>
  </Listbox>
</template>
