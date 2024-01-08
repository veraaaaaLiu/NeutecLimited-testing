<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  ballAmount: Number,
  ballPosition: Array,
  ballType: Number,
});

const targetPoint = ref({ x: 0, y: 0 });

const setBallClass = (i) => {
  return props.ballPosition.map((position, index) => {
    if (index === i - 1) {
      const ballTypeClass = `ball-${props.ballType}-${position} ball-${props.ballType}`;
      return `${ballTypeClass} active`;
    }
  });
};

const setBallPosition = (balls, type) => {
  balls.forEach((ball) => {
    const block = document.querySelector(`.block-${parseInt(ball.classList[0].split(`-${type == 'default' ? 1 : 2}-`)[1])}`);
    const blockPosition = block.getBoundingClientRect();
    const x = blockPosition.top + 2.5;  // - 30 + 32.5
    const y = blockPosition.left + blockPosition.width / 2 - 15;
    ball.style.top = `${x}px`;
    ball.style.left = `${y}px`;
  });

  if (type === 'randomPostion') {
    const main = document.querySelector('main');
    const mainPosition = main.getBoundingClientRect();
    const x = Math.floor(Math.random() * (mainPosition.width - 30 - 32.5));
    const y = Math.floor(Math.random() * (mainPosition.height - 30));
    targetPoint.value = { x, y };
  }
};

const moveBalls = (balls) => {
  balls.forEach((ball) => {
    ball.style.transition = `all 2s linear`;
    ball.style.top = `${targetPoint.value.y - 15}px`;
    ball.style.left = `${targetPoint.value.x - 15}px`;

    ball.addEventListener('transitionend', callback);
  });

  // 動畫結束要拿掉 transition
  // 這裡無法使用箭頭函式，因為對象會跑掉
  function callback() {
    balls.forEach((ball) => {
      ball.style.transition = `all 0s linear`;
    });
  }
};

const setDefaultBallPosition = () => {
  const balls = document.querySelectorAll('.ball-container .active');
  setBallPosition(balls, 'default');
};

const setRandomBallPosition = () => {
  const balls = document.querySelectorAll('.ball-container .ball-2.active');
  setBallPosition(balls, 'randomPostion');
  moveBalls(balls);
};

const positionHandlers = {
  1: setDefaultBallPosition,
  2: setRandomBallPosition,
};

watch(
  () => props.ballType,
  (newSelectedItem, oldSelectedItem) => {
    if (newSelectedItem === 0) {
      return;
    }else{
      requestAnimationFrame(() => {
        positionHandlers[newSelectedItem]();
      });
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="ball-container">
    <div v-for="i in props.ballAmount" :key="i" :class="setBallClass(i)">0</div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>