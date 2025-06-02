<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { Check } from "lucide-vue-next";
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,
} from "reka-ui";

const props = defineProps<
  SelectItemProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectItem data-slot="select-item" v-bind="forwardedProps" class="basic-select-item">
    <span class="basic-select-item-content">
      <SelectItemIndicator>
        <Check class="basic-select-item-check" />
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
<style lang="scss">
.basic-select-item {
  // relative
  position: relative;
  // flex
  display: flex;
  // w-full
  width: 100%;
  // cursor-default
  cursor: default;
  // select-none
  user-select: none;
  // items-center
  align-items: center;
  // rounded-sm
  border-radius: 8px;
  // py-1.5
  padding-top: 6px;
  padding-bottom: 6px;
  // pr-8
  // pl-2
  padding-left: 8px;
  padding-right: 32px;
  // text-sm
  font-size: 14px;
  line-height: 20px;
  // outline-none
  outline: none;

  &:focus {
    // focus:bg-accent
    // focus:text-accent-foreground
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  &[data-disabled] {
    // data-[disabled]:pointer-events-none
    // data-[disabled]:opacity-50
    pointer-events: none;
    opacity: 0.5;
  }

  &-content {
    // absolute left-2 flex h-3.5 w-3.5 items-center justify-center
    position: absolute;
    left: 8px;
    display: flex;
    width: 14px;
    height: 14px;
    align-items: center;
    justify-content: center;
  }

  &-check {
    width: 16px;
    height: 16px;
  }
}
</style>
