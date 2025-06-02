<script lang="ts" setup>
import { useFormField } from "./use-form-field";

const { formDescriptionId } = useFormField();
</script>

<template>
  <p
    :id="formDescriptionId"
    class="basic-form-description"
  >
    <slot />
  </p>
</template>
<style lang="scss">
.basic-form-decription {
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);

  font-size: 14px;
  line-height: 20px;
  color: var(--muted-foreground)
}
</style>
