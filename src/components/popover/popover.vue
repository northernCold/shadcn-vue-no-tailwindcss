<script setup>
import { ref, onMounted, onUnmounted } from "vue";
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

const handlePointerleave = (event) => {
  // 检查鼠标是否移动到floating元素
  if (event.relatedTarget && floating.value?.contains(event.relatedTarget)) {
    return;
  }
  open.value = false;
};

const handleFloatingPointerenter = () => {
  open.value = true;
};

const handleFloatingPointerleave = (event) => {
  // 检查鼠标是否移动到reference元素
  if (event.relatedTarget && reference.value?.contains(event.relatedTarget)) {
    return;
  }
  open.value = false;
};

</script>

<template>
  <button
    ref="reference"
    @click="toggle"
    @pointerenter="handlePointerenter"
    @pointerleave="handlePointerleave"
  >
    Button
  </button>
  <AnimatePresence>
    <div
      v-if="open"
      ref="floating"
      class="ui-popover-content"
      :style="floatingStyles"
      @pointerenter="handleFloatingPointerenter"
      @pointerleave="handleFloatingPointerleave"
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
    padding-top: 20px;
    top: -20px !important;
    &-inner {
      padding: 10px;
      border-radius: 12px;
      box-shadow: 0px 2px 10px 0px #0000001a;
    }
  }
}
</style>  