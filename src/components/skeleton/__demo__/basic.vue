<template>
  <Skeleton :loading="true">
    <SkeletonLine :rows="3" />
    <SkeletonShape />
  </Skeleton>
</template>
<script setup lang="ts">
import { Skeleton, SkeletonLine, SkeletonShape } from "../.";
</script>
