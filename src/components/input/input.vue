<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <input v-model="modelValue" class="basic-input" />
</template>
<style lang="scss">
.basic-input {
  // flex
  display: flex;
  // h-9
  height: 36px;
  // w-full
  width: 100%;

  max-width: 320px;

  // min-w-0
  min-width: 0;
  // rounded-md
  border-radius: 8px;
  // border-input
  // border
  border: 1px solid var(--input);
  // bg-transparent
  background-color: transparent;
  // px-3
  padding-left: 12px;
  padding-right: 12px;
  // py-1
  padding-top: 4px;
  padding-bottom: 4px;
  // text-base
  font-size: 14px;
  line-height: 20px;
  // shadow-xs
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  // transition-[color,box-shadow]
  transition-property: color, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  // outline-none
  outline: none;
  // md:text-sm,

  box-sizing: border-box;

  &[aria-invalid="true"] {
    border-color: var(--destructive);
  }

  &:focus-visible {
    // focus-visible:border-ring
    // focus-visible:ring-ring/50
    // focus-visible:ring-[3px]
    border: var(--ring);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      color-mix(in oklab, var(--ring) 50%, transparent) 0px 0px 0px 3px,
      rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }

  &::file-selector-button {
    // file:inline-flex
    // file:h-7
    // file:border-0
    // file:bg-transparent
    // file:text-sm
    // file:font-medium
    // file:text-foreground
    display: inline-flex;
    height: 28px;
    border: 0;
    background-color: transparent;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: var(--foreground);
  }

  &:disabled {
    // disabled:opacity-50
    // disabled:pointer-events-none
    // disabled:cursor-not-allowed
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:placeholder {
    // placeholder:text-muted-foreground
    color: var(--muted-foreground);
  }

  &:selection {
    // selection:bg-primary
    // selection:text-primary-foreground
    background-color: var(--primary);
    color: var(--primary-foreground);
  }
}
</style>
