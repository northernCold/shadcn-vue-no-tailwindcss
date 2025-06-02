<script lang="ts" setup>
import { ErrorMessage } from "vee-validate";
import { toValue } from "vue";
import { useFormField } from "./use-form-field";

const { name, formMessageId } = useFormField();
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    as="p"
    :name="toValue(name)"
    class="basic-form-message"
  />
</template>
<style lang="scss">
.basic-form-message {
  --destructive: oklch(0.577 0.245 27.325);

  font-size: 14px;
  line-height: 20px;
  color: var(--destructive);
}
</style>
