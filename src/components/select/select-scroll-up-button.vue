<script setup lang="ts">
import { ChevronUp } from "lucide-vue-next";
import {
  SelectScrollUpButton,
  type SelectScrollUpButtonProps,
  useForwardProps,
} from "reka-ui";

const props = defineProps<SelectScrollUpButtonProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectScrollUpButton
    data-slot="select-scroll-up-button"
    v-bind="forwardedProps"
    class="basic-select-scroll-up-button"
  >
    <slot>
      <ChevronUp class="basic-select-scroll-up-button-inner" />
    </slot>
  </SelectScrollUpButton>
</template>
<style lang="scss">
.basic-select-scroll-up-button {
  // flex cursor-default items-center justify-center py-1
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding-block: 4px; // py-1

  &-inner {
    // h-4 w-4
    height: 16px;
    width: 16px;
  }
}
</style>
