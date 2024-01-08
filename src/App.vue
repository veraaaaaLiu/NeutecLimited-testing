<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Header from '@/components/Header/index.vue'
import Block from '@/components/Block/index.vue'
import Ball from '@/components/Ball/index.vue'
import BallCanvas from '@/components/BallCanvas/index.vue'

// 初始化設定
const setBlockAmount = ref(9)
const setBlockNumberAnimate = ref([3, 5, 9])
const setBallAmount = ref(0)
const setBallPosition = ref([1, 3, 7, 9])
const setBallType = ref(0) // 1: 預設，四個球向右 / 2: 四顆球往同一個隨機的點移動

// 側邊欄狀態
const isAsideOpened = ref(false)
const hamburgerClick = () => {
  isAsideOpened.value = !isAsideOpened.value
}
const closeAside = () => {
  isAsideOpened.value = false
}

onMounted(() => {
    setBallType.value = 1
    setBallAmount.value = 4
})

const ballTypeSelected = (type) => {
  setBallType.value = type
}
</script>

<template>
  <!-- header -->
  <Header :isAsideOpened="isAsideOpened" @hamburgerClick="hamburgerClick" @ballTypeSelected="ballTypeSelected" />

  <!-- content -->
  <main @click="closeAside">
    <div>
      <Ball v-if="setBallType !== 3" :ballAmount="setBallAmount" :ballPosition="setBallPosition"
        :ballType="setBallType" />
      <BallCanvas v-else />
      <Block :blockAmount="setBlockAmount" :blockNumberAnimate="setBlockNumberAnimate" />
    </div>
  </main>
</template>

<style lang="scss">
/* 引入 normalize.min.css */
@import "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css";

* {
  box-sizing: border-box;
}

body,
#app,
html {
  overflow: hidden;
  max-height: calc(100%);
  height: 100%;
  max-width: 100vw;
}

main {
  height: calc(100%);
  max-height: calc(100%);
  max-width: 100vw;
  overflow: hidden;
  background-color: #c1c2c7;
  position: relative;

  > div {
    position: relative;
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    margin-top: calc(65px/2); /*扣掉 header 的高度*/
  }
}
</style>
