<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import {
  SelectContent,
  type SelectContentEmits,
  type SelectContentProps,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from "reka-ui";
import { SelectScrollDownButton, SelectScrollUpButton } from ".";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes["class"] }>(),
  {
    position: "popper",
  }
);
const emits = defineEmits<SelectContentEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SelectPortal>
    <SelectContent
      data-slot="select-content"
      v-bind="{ ...forwarded, ...$attrs }"
      class="basic-select-content"
      :class="{
        'basic-select-content--popper': position === 'popper',
      }"
    >
      <SelectScrollUpButton />
      <SelectViewport
        class="basic-select-viewport"
        :class="{
          'basic-select-viewport--popper': position === 'popper',
        }"
      >
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>
<style lang="scss">
.basic-select {
  &-content {
    // relative
    position: relative;
    // z-50
    z-index: 50;
    // max-h-96
    max-height: 384px;
    // min-w-32
    min-width: 128px;
    // overflow-hidden
    overflow: hidden;
    // rounded-md
    border-radius: 8px;
    // border
    border: 1px solid var(--border);
    // bg-popover
    background-color: var(--popover);
    // text-popover-foreground
    color: var(--popover-foreground);
    // shadow-md
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px -2px;
    &[data-state="open"] {
      // data-[state=open]:animate-in
      // data-[state=open]:fade-in-0
      // data-[state=open]:zoom-in-95
      // --enter-opacity: 0;
      // --enter-scale: 0.95;

      // animation-name: enter;
      // animation-duration: 150ms;
    }

    &[data-state="close"] {
      // data-[state=closed]:animate-out
      // data-[state=closed]:fade-out-0
      // data-[state=closed]:zoom-out-95
      --exit-opacity: 0
      --exit-scale: .95

      animation-name: exit;
      animation-duration: .15s;
    }

    // data-[side=bottom]:slide-in-from-top-2
    // &[data-side="bottom"] {
    //     --enter-translate-y: -8px;
    // }

    // // data-[side=left]:slide-in-from-right-2
    // &[data-side="left"] {
    //     --enter-translate-x: 8px;
    // }

    // // data-[side=right]:slide-in-from-left-2
    // &[data-side="right"] {
    //     --enter-translate-x:-8px;
    // }

    // // data-[side=top]:slide-in-from-bottom-2
    // &[data-side="top"] {
    //     --enter-translate-y:8px;
    // }

    &--popper {
      // data-[side=bottom]:translate-y-1
      // data-[side=left]:-translate-x-1
      // data-[side=right]:translate-x-1
      // data-[side=top]:-translate-y-1
      &[data-side='bottom'] {
        transform: translateY(4px);
      }
      &[data-side='left'] {
        transform: translateX(-4px);
      }

      &[data-side='right'] {
        transform: translateX(4px);
      }

      &[data-side='top'] {
        transform: translateY(-4px);
      }

    }
  }

  &-viewport {
    padding: 4px;

    &--popper {
        // 'h-[--reka-select-trigger-height] w-full min-w-[--reka-select-trigger-width]'
        height: var(--reka-select-trigger-height);
        width: 100%;
        min-width: var(--reka-select-trigger-width);
    }
  }
}
</style>
