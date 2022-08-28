<script setup lang="ts">
import { Maybe } from '~~/utils/types';
import phoneData, { Country } from 'country-telephone-data';
// @ts-ignore
import { findFlagUrlByIso2Code } from 'country-flags-svg';

const props = defineProps<{
  number: Maybe<string>;
  code: Maybe<string>;
  name: string;
  id: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:number', value: string): void;
  (e: 'update:code', value: string): void;
}>();

const { number: numberVModel, code: codeVModel } = useVModels(props, emit);

const FRENCH_DIAL_CODE = '33';
const defaultCountry = phoneData.allCountries.find(
  country => country.dialCode === (props.code ?? FRENCH_DIAL_CODE)
) as Country;

const selectedCountry = ref<Country>(defaultCountry);
const countryVModel = computed({
  get: () => selectedCountry.value,
  set: val => {
    codeVModel.value = val?.dialCode;
    selectedCountry.value = val;
  }
});

const onKeypress = (e: KeyboardEvent) => {
  if (!/^[0-9]+$/.test(e.key)) e.preventDefault();
};

const getFlag = (iso2: string): string => findFlagUrlByIso2Code(iso2);
</script>

<template>
  <div flex gap-2 items-center max-w-full>
    <UiListBox
      v-model="countryVModel"
      :options="phoneData.allCountries"
      w="1/3"
      h-full
    >
      <template #button>
        <img
          v-if="selectedCountry"
          :src="getFlag(selectedCountry?.iso2)"
          h-5
          aspect="4/3"
        />
        +({{ selectedCountry?.dialCode }})
        <span m-l-auto i-ui-caret-down h-4 />
      </template>

      <template #option="{ value: country }">
        <img
          :id="props.id"
          :src="getFlag(country.iso2)"
          h-5
          aspect="4/3"
          loading="lazy"
        />
        {{ country.name }} (+{{ country.dialCode }})
      </template>
    </UiListBox>

    <input
      v-model="numberVModel"
      max-w="2/3"
      flex-1
      bg="light-2 dark:dark-3"
      border="solid 1 light-9 dark:dark-9 focus-within:brand-4"
      pattern="[0-9]"
      p="x-3 y-2"
      outline="focus:none"
      type="tel"
      :name="props.name"
      :disabled="props.disabled"
      @keypress="onKeypress"
    />
  </div>
</template>
