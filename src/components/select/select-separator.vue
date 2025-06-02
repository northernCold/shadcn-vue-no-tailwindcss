<script setup lang="ts">
import { SelectSeparator, type SelectSeparatorProps } from "reka-ui";

const props = defineProps<SelectSeparatorProps>();
</script>

<template>
  <SelectSeparator
    data-slot="select-separator"
    v-bind="props"
    class="basic-select-separator"
  />
</template>
<style lang="scss">
.basic-select-separator {
  // -mx-1 my-1 h-px bg-muted
  margin: 4px -4px;
  height: 1px;
  background-color: var(--muted);
}
</style>
