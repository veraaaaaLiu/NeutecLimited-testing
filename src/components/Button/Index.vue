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
    button{
        background-color: #fff;
        border: 1px solid #000;
        padding: 0 5px;
        font-size: 13px;
        cursor: pointer;
    }
</style>
