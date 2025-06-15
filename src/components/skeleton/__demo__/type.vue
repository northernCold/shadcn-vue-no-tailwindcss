<template>
  <skeleton :loading="true">
    <div class="flex space-x-4">
      <skeleton-shape size="small" />
      <skeleton-shape />
      <skeleton-shape size="large" />
      <skeleton-shape shape="circle" size="small" />
      <skeleton-shape shape="circle" />
      <skeleton-shape shape="circle" size="large" />
    </div>
  </skeleton>
</template>
<script setup lang="ts">
import { Skeleton, SkeletonLine, SkeletonShape } from "../.";
</script>
