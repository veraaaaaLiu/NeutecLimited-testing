<script setup>
/**
 * Represents the Arrow component.
 * 
 * @component Arrow
 * @description The Arrow component is used to display an arrow pointing to the left.
 * @props {string} direction - The direction of the arrow. 
 * @props {string} color - The color of the arrow.
 */
import { defineProps } from 'vue'
const props = defineProps({
    direction: String,
    color: String,
})

// 用 map 去判斷方向
const directionMap = {
    left: '180eg',
    right: '0deg',
    up: '270deg',
    down: '90deg',
}
</script>

<template>
    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        :style="{ '--color': props.color, '--direction': directionMap[props.direction] }">
        <path d="M10 7L15 12L10 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
