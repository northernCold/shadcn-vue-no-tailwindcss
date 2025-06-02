<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core";
import { ChevronDown } from "lucide-vue-next";
import {
  SelectIcon,
  SelectTrigger,
  type SelectTriggerProps,
  useForwardProps,
} from "reka-ui";

const props = withDefaults(
  defineProps<
    SelectTriggerProps & {
      size?: "sm" | "default";
    }
  >(),
  { size: "default" }
);

const delegatedProps = reactiveOmit(props, "size");
const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="forwardedProps"
    class="basic-select-trigger"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="basic-select-trigger-icon" />
    </SelectIcon>
  </SelectTrigger>
</template>
<style lang="scss">
.basic-select-trigger {
  // border-input
  // border
  border: 1px solid var(--border);
  // flex
  display: flex;
  // w-fit
  width: fit-content;
  // items-center
  align-items: center;
  // justify-between
  justify-content: space-between;
  // gap-2
  gap: 8px;
  // rounded-md
  border-radius: 8px;
  // bg-transparent
  background-color: transparent;
  // px-3
  padding-left: 12px;
  padding-right: 12px;
  // py-2
  padding-top: 8px;
  padding-bottom: 8px;
  // text-sm
  font-size: 14px;
  line-height: 20px;
  // whitespace-nowrap
  white-space: nowrap;
  // shadow-xs
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  transition-property: color, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  // outline-none
  outline: none;
  [data-placeholder] {
    // data-[placeholder]:text-muted-foreground
    color: var(--muted-foreground);
  }
  &:focus-visible {
    // focus-visible:ring-ring/50
    // focus-visible:border-ring
    // focus-visible:ring-[3px]
    border: var(--ring);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      color-mix(in oklab, var(--ring) 50%, transparent) 0px 0px 0px 3px,
      rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }
  &:disabled {
    // disabled:cursor-not-allowed
    // disabled:opacity-50
    cursor: not-allowed;
    opacity: 0.5;
  }
  &[data-size="default"] {
    // data-[size=default]:h-9
    height: 36px;
  }
  &[data-size="sm"] {
    // data-[size=sm]:h-8
    height: 32px;
  }
  svg {
    // [&_svg:not([class*='text-'])]:text-muted-foreground
    // [&_svg]:pointer-events-none
    // [&_svg]:shrink-0
    // [&_svg:not([class*='size-'])]:size-4

    flex-shrink: 0;
    &:not([class*="text-"]) {
      pointer-events: none;
      color: var(--muted-foreground);
    }

    &:not([class*="size-"]) {
      height: 16px;
      width: 16px;
    }
  }

  // *:data-[slot=select-value]:line-clamp-1
  // *:data-[slot=select-value]:flex
  // *:data-[slot=select-value]:items-center
  // *:data-[slot=select-value]:gap-2

  // aria-invalid:ring-destructive/20
  // aria-invalid:border-destructive
  &[aria-invalid="true"] {
    border-color: var(--destructive);
  }

  // dark:aria-invalid:ring-destructive/40
  // dark:bg-input/30
  // dark:hover:bg-input/50

  //   size-4 opacity-50

  &-icon {
    height: 16px;
    width: 16px;
    opacity: 0.5;
  }
}
</style>
