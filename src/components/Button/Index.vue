<script setup>
const props = defineProps({
    color: String,
    background: String,
})
</script>

<template>
    <button type="button">
        <slot name="wording"></slot>
    </button>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>