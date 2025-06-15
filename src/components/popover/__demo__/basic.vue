<template>
  <div class="w-500px m-auto mt-200px">
    <UiPopover>
      <template #content>
        <div class="menu-list">
          <div class="menu-list-item">菜单</div>
          <div class="menu-list-item">菜单</div>
          <div class="menu-list-item">菜单</div>
          <div class="menu-list-item">菜单</div>
        </div>
      </template>
    </UiPopover>
  </div>
</template>
<script setup lang="ts">
import UiPopover from "../popover.vue";
</script>
<style lang="scss">
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  &-item {
    padding: 8px 20px;
    background-color: #f96611;
    color: #fff;
    border-radius: 4px;
  }
}
</style>
