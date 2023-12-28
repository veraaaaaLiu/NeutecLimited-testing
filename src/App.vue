<script setup>
import { defineProps, defineEmits, ref, provide, onMounted } from 'vue'
import Header from '@/components/Header/index.vue'
import Block from '@/components/Block/index.vue'
import Ball from '@/components/Ball/index.vue'

// 初始化設定
const setBlockAmount = ref(9)
const setBlockNumberAnimate = ref([3, 5, 9])
const setBallAmount = ref(4)
const setBallPosition = ref([1, 3, 7, 9])
const setBallType = ref(1) // 1: 預設, 2: 往同一個不規則的點移動, 3: 100顆球隨機跑

// 側邊欄狀態
const isAsideOpened = ref(false)
const onOpenAsideClick = () => {
  isAsideOpen.value = !isAsideOpen.value
}

</script>

<template>
  <!-- header -->
  <transition>
    <Header />
  </transition>

  <!-- content -->
  <main>
    <Ball :ballAmount="setBallAmount" :ballPosition="setBallPosition" :ballType="setBallType" />
    <Block :blockAmount="setBlockAmount" :blockNumberAnimate="setBlockNumberAnimate" />
  </main>
</template>

<style>
/* 引入 normalize.min.css */
@import "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css";

* {
  box-sizing: border-box;
}

body{
  overflow: hidden;
}

main {
  height: calc(100vh - 65px); /*扣掉 header 的高度*/
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c1c2c7;
}
</style>
