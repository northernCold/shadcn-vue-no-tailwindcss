<template>
  <div class="ui-skeleton-shape" :class="cls"></div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: "ui-skeleton-shape",
});

interface Props {
  shape?: "circle" | "square";
  size?: "small" | "medium" | "large";
}

const props = withDefaults(defineProps<Props>(), {
  shape: "square",
  size: "medium",
});

const cls = computed(() => {
  return {
    [`ui-skeleton-shape-${props.shape}`]: true,
    [`ui-skeleton-shape-${props.size}`]: true,
  };
});
</script>
