<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import DropdownMenu from '@/components/DropdownMenu/index.vue';
import Selector from '@/components/Selector/index.vue';
import Button from '@/components/Button/index.vue';
import MenuItem from './data';
const menuItems = ref(MenuItem);
const selectorItem = ref('');
const emit = defineEmits(['hambergerClick','ballTypeSelected']);

const props = defineProps({
  isAsideOpened: Boolean,
});

// 遞迴處理選單，將選取的項目展開，其他項目收合
const handleNestedItems = (items, selectedItemKey) => {
  items.forEach((item) => {
    item.expanded = item.key === selectedItemKey;
    if (item.children) {
      handleNestedItems(item.children, selectedItemKey);
    }
  });
};

const handleSelectItem = (selectedItem) => {
  selectorItem.value = selectedItem.key;
  handleNestedItems(menuItems.value, selectedItem.key);
};

const hambergerClick = () => {
  emit('hambergerClick');
};

const ballTypeSelected = (type) => {
  emit('ballTypeSelected', type);
};
</script>

<template>
  <header>
    <!-- 球的狀態選擇按鈕 -->
    <div>
      <Button @click="ballTypeSelected(1)" color="#000" backgroundColor='#fff' borderColor="#000">
        <template v-slot:wording>
          <p>4顆球向右</p>
        </template>
      </Button>
      <Button @click="ballTypeSelected(2)" color="#000" backgroundColor='#fff' borderColor="#000">
        <template v-slot:wording>
          <p>4顆球往同個點</p>
        </template>
      </Button>
      <Button @click="ballTypeSelected(3)" color="#000" backgroundColor='#fff' borderColor="#000">
        <template v-slot:wording>
          <p>100顆球隨機</p>
        </template>
      </Button>
    </div>
    <!-- 漢堡 -->
    <button class="hamburger" type="button" aria-label="Menu" @click="hambergerClick">
      <span></span>
    </button>
  </header>
  <!-- 側邊欄 -->
  <aside :class="{ active: isAsideOpened }">
    <DropdownMenu :menuItems="menuItems" :selectorItem="selectorItem" />
    <Selector :menuItems="menuItems" @seleced="handleSelectItem" />
  </aside>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
