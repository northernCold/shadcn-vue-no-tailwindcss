<script lang="ts" setup>
import { Label } from "../label";
import { useFormField } from "./use-form-field";
import { watch } from "vue";


const { error, formItemId } = useFormField();

watch(error, () => {
  console.log(error.value);
});
</script>

<template>
  <Label
    class="basic-form-label"
    :class="{
      'basic-form-label--error': error,
    }"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
<style lang="scss">
.basic-form-label {
  &--error {
    --destructive: oklch(0.577 0.245 27.325);

    color: var(--destructive);
  }
}
</style>
