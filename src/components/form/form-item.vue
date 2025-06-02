<script lang="ts" setup>
import { useId } from "reka-ui";
import { provide } from "vue";
import { FORM_ITEM_INJECTION_KEY } from "./injection-keys";

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
  <div class="basic-form-item">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.basic-form-item {
  display: grid;
  gap: 8px;
}
</style>
