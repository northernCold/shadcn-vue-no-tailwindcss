<template>
  <div
    class="ui-skeleton"
    :class="{
      'ui-skeleton-animation': props.animation,
    }"
  >
    <slot v-if="loading"></slot>
    <slot v-else name="content"></slot>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "ui-skeleton",
});

interface Props {
  loading?: boolean;
  animation?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  animation: true,
});
</script>
<style lang="scss">
$skeleton-color-bg-base: rgb(242, 243, 245);
$skeleton-radius-image-border: 2px;
$skeleton-size-image-default: 48px;
$skeleton-size-image-small: 36px;
$skeleton-size-image-large: 60px;
$skeleton-size-image-spacing: 16px;

$skeleton-size-row-height: 16px;
$skeleton-color-animate-bg: rgb(229, 230, 235);

.ui-skeleton {
  &-shape {
    width: $skeleton-size-image-default;
    height: $skeleton-size-image-default;
    border-radius: $skeleton-radius-image-border;
    background-color: $skeleton-color-bg-base;

    &-circle {
      border-radius: 50%;
    }

    &-small {
      width: $skeleton-size-image-small;
      height: $skeleton-size-image-small;
    }

    &-large {
      width: $skeleton-size-image-large;
      height: $skeleton-size-image-large;
    }
  }

  &-line {
    margin: 0;
    padding: 0;
    list-style: none;

    &-row {
      height: $skeleton-size-row-height;
      background-color: $skeleton-color-bg-base;
    }

    &-row:not(:last-child) {
      margin-bottom: $skeleton-size-image-spacing;
    }
  }

  &-animation {
    .ui-skeleton-shape,
    .ui-skeleton-line-row {
      background: linear-gradient(
        90deg,
        $skeleton-color-bg-base 25%,
        $skeleton-color-animate-bg 37%,
        $skeleton-color-bg-base 63%
      );
      background-size: 400% 100%;
      animation: skeleton-circle 1.5s cubic-bezier(0, 0, 1, 1) infinite;
    }
  }
}

@keyframes skeleton-circle {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
