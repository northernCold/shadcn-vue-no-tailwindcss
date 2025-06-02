<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core";
import { ChevronDown } from "lucide-vue-next";
import {
  SelectScrollDownButton,
  type SelectScrollDownButtonProps,
  useForwardProps,
} from "reka-ui";

const props = defineProps<SelectScrollDownButtonProps>();

const delegatedProps = reactiveOmit(props);

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectScrollDownButton
    data-slot="select-scroll-down-button"
    v-bind="forwardedProps"
    class="basic-select-scroll-down-button"
  >
    <slot>
      <ChevronDown class="h-4 w-4" />
    </slot>
  </SelectScrollDownButton>
</template>
<style lang="scss">
.basic-select-scroll-down-button {
  // flex cursor-default items-center justify-center py-1
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
}
</style>
