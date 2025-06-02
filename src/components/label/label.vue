<script setup lang="ts">
import { Label } from "reka-ui";
</script>

<template>
  <Label data-slot="label" class="basic-label">
    <slot />
  </Label>
</template>
<style lang="scss">
.basic-label {
  // flex
  display: flex;
  // items-center
  align-items: center;
  // gap-2
  gap: 8px;
  // text-sm
  font-size: 14px;
  // leading-none
  line-height: 1;

  // font-medium
  font-weight: 500;
  // select-none
  user-select: none;
  // group-data-[disabled=true]:pointer-events-none
  // group-data-[disabled=true]:opacity-50
  // peer-disabled:cursor-not-allowed
  // peer-disabled:opacity-50
}
</style>
