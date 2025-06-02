<script setup lang="ts">
import { SelectLabel } from "reka-ui";

</script>

<template>
  <SelectLabel data-slot="select-label" class="basic-select-label">
    <slot />
  </SelectLabel>
</template>
<style lang="scss">
.basic-select-label {
  // py-1.5 pl-8 pr-2 text-sm font-semibold
  padding: 6px 8px 6px 24px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}
</style>
