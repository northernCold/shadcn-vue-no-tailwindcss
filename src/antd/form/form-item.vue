<template>
    <a-row>
        <a-form-item v-for="item in items">
            <a-input placeholder="input placeholder" />
        </a-form-item>
    </a-row>
</template>
<script lang="ts" setup>
const items = Array.from({ length: 5 }).map((_, index) => index)
</script>