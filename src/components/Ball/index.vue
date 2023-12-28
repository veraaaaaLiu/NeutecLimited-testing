<script setup>
import { defineProps, onMounted, ref } from 'vue';

const props = defineProps({
  ballAmount: Number,
  ballPosition: Array,
  ballType: Number,
});

const targetPoint = ref({ x: 0, y: 0 });

const setBallClass = (i) => {
  switch (props.ballType) {
    case 1:
      return `ball-1-${props.ballPosition[i - 1]} ball-1 active`;
    case 2:
      return `ball-2-${props.ballPosition[i - 1]} ball-2 active`;
    case 3:
      // type3: 100顆球隨機跑
      break;
  }
};

const setBallPosition = (balls, type) => {
  balls.forEach((ball) => {
    const block = document.querySelector(`.block-${parseInt(ball.classList[0].split(`-${type == 'default' ? 1 : 2}-`)[1])}`);
    const blockPosition = block.getBoundingClientRect();
    const x = blockPosition.top;
    const y = blockPosition.left;
    ball.style.top = `${x + 50 - 15}px`;
    ball.style.left = `${y + blockPosition.width / 2 - 15}px`;
  });

  if (type === 'randomPostion') {
    const main = document.querySelector('main');
    const mainPosition = main.getBoundingClientRect();
    const x = Math.floor(Math.random() * (mainPosition.height - 30)) + 15;
    const y = Math.floor(Math.random() * (mainPosition.width - 30)) + 15;
    targetPoint.value = { x, y };
  }
};

const setDefaultBallPosition = () => {
  const balls = document.querySelectorAll('.ball-container .active');
  // console.log(balls)
  setBallPosition(balls, 'default');
};

const setRandomBallPosition = () => {
  const balls = document.querySelectorAll('.ball-container .ball-2.active');
  setBallPosition(balls, 'randomPostion');
  moveBalls(balls);
};


// ::todo 優化，讓他到達目標點後再次觸發
const moveBalls = (balls) => {
  balls.forEach((ball) => {
    const ballPosition = ball.getBoundingClientRect();
    const x = ballPosition.top;
    const y = ballPosition.left;
    const distance = Math.sqrt(Math.pow(targetPoint.value.x - x, 2) + Math.pow(targetPoint.value.y - y, 2));
    const time = distance / 400;
    ball.style.transition = `all ${time}s linear`;
    ball.style.top = `${targetPoint.value.x - 15}px`;
    ball.style.left = `${targetPoint.value.y - 15}px`;
  });
};

const positionHandlers = {
  1: setDefaultBallPosition,
  2: setRandomBallPosition,
  3: () => {
    // type3: 100顆球隨機跑
    // ::todo 完成第三種情況
  },
};

onMounted(() => {
  setDefaultBallPosition();
});
</script>

<template>
  <div class="ball-container">
    <div v-for="i in props.ballAmount" :key="i" :class="setBallClass(i)">0</div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>