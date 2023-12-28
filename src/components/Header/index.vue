<script setup>
import { ref } from 'vue';
import DropdownMenu from '@/components/DropdownMenu/index.vue';
import Selector from '@/components/Selector/index.vue';
import MenuItem from './data';
// import { useLocalStorage } from '@/composables/useLocalStorage';
const menuItems = ref(MenuItem);
const SelectorItem = ref('');


const handleSelectItem = (selectedItem) => {
  SelectorItem.value = selectedItem;
  console.log(`Selected item: ${selectedItem}`);
};

// const expandItemAllParents = (items, key) => {
//   for (const item of items) {
//     if (item.key === key || expandItemAllParents(item.children || [], key)) {
//       item.expanded = true;
//       return true;
//     } else {
//       item.expanded = false;
//     }
//   }
//   return false;
// };
</script>

<template>
    <header>
      <button class="hamburger" type="button" aria-label="Menu">
        <span></span>
      </button>
    </header>
    <aside @click.stop>
      <DropdownMenu :menuItems="menuItems" />
      <Selector :menuItems="menuItems" @selectItem="handleSelectItem(val)" />
    </aside>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
