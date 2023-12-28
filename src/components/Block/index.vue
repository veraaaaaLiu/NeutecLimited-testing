<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    blockAmount: Number,
    blockNumberAnimate: Array
})

const setBlockClass = (i) => {
    return props.blockNumberAnimate.includes(i) ? `active block-${i}` : `block-${i}`
}
</script>

<template>
    <div class="block-container">
        <!-- 如果 i 有在 blockNumberAnimate 裡面，則會有動畫 -->
        <div v-for="i in props.blockAmount" :key="i" :class="setBlockClass(i)"></div>
    </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
