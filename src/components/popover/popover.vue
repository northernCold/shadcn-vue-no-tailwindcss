<script setup>
import { computed, ref, watch } from "vue";
import { useFloating, offset, flip, shift } from "@floating-ui/vue";
import { AnimatePresence, motion } from "motion-v";

const reference = ref(null);
const floating = ref(null);
const { floatingStyles } = useFloating(reference, floating, {
  middleware: [offset(10), flip(), shift()],
});

const open = ref(false);

const toggle = () => {
  open.value = !open.value;
};

const handlePointerenter = () => {
  open.value = true;
};

const handlePointerleave = () => {
  open.value = false;
};
</script>

<template>
  <button
    ref="reference"
    @click="toggle"
    @pointerleave="handlePointerleave"
    @pointerenter="handlePointerenter"
  >
    Button
  </button>
  <AnimatePresence>
    <div
      v-if="open"
      ref="floating"
      class="ui-popover-content"
      :style="floatingStyles"
    >
      <motion.div
        :initial="{ opacity: 0, scale: 0.95 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.95 }"
        class="ui-popover-content-inner"
      >
        <slot name="content" />
      </motion.div>
    </div>
  </AnimatePresence>
</template>
<style lang="scss" scoped>
.ui-popover {
  &-content {

    &-inner {
      padding: 10px;
      border-radius: 12px;
      box-shadow: 0px 2px 10px 0px #0000001a;
    }
  }
}
</style>
