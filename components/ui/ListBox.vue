<script setup lang="ts">
import { Maybe } from '~~/utils/types';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue';
import { UseVirtualList } from '@vueuse/components';

const props = defineProps<{
  modelValue: Maybe<any>;
  options: any[];
  disabled?: boolean;
}>();

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
      w-full
      h-full
      p-2
      gap-2
      border="solid 1 light-9 dark:dark-9 focus-within:brand-4"
    >
      <slot name="button" />
    </ListboxButton>
    <ListboxOptions
      divide-y
      divide="black/30 dark:white/30"
      bg="light-1 dark:dark-1 hover:light-3 dark:hover:dark-2"
      border="solid 1 light-9 dark:dark-9 focus-within:brand-4"
      m-t-3
      shadow-md
      overflow-y-auto
      absolute
      w="18rem"
    >
      <UseVirtualList
        v-slot="{ data }"
        :list="props.options"
        :options="{ itemHeight: 40 }"
        height="15rem"
      >
        <ListboxOption
          flex
          gap-2
          p-2
          :value="data"
          cursor-pointer
          h-40px
          overflow-hidden
        >
          <slot name="option" :value="data" />
        </ListboxOption>
      </UseVirtualList>
    </ListboxOptions>
  </Listbox>
</template>
