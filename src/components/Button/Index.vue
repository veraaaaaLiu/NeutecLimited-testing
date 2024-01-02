<script setup>
const props = defineProps({
    color: String,
    backgroundColor: String,
    borderColor: String,
})
</script>

<template>
    <button type="button" :style="{ '--color': props.color, '--background': props.backgroundColor,  '--border-color': props.borderColor}">
        <slot name="wording"></slot>
    </button>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>