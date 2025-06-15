<template>
  <ul v-for="(style, index) of lines" :key="index" class="ui-skeleton-line">
    <li class="ui-skeleton-line-row" :style="style"></li>
  </ul>
</template>
<script setup lang="ts">
import type { CSSProperties } from 'vue';

defineOptions({
  name: "ui-skeleton-line",
});

interface Props {
  rows?: number;
  widths?: string[];
  lineHeight?: number;
  lineSpacing?: number;
}

const props = withDefaults(defineProps<Props>(), {
  widths: () => [] as string[],
  rows: 3,
  lineHeight: 20,
  lineSpacing: 15,
});

const lines: CSSProperties[] = [];

for (let i = 0; i < props.rows; i++) {
  const style: CSSProperties = {};
  if (typeof props.widths[i] === "number") {
    style.width = `${props.widths[i]}px`;
  } else if (typeof props.widths[i] === "string") {
    style.width = String(props.widths[i]);
  }
  style.height = `${props.lineHeight}px`;
  if (i > 0) {
    style.marginTop = `${props.lineSpacing}px`;
  }
  lines.push(style);
}
</script>
