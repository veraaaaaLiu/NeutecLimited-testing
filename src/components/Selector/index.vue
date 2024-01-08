<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { useLocalStorage } from '@/composables/useLocalStorage';
const { storage } = useLocalStorage('selectedItem', '');

const props = defineProps({
  menuItems: Array,
});

const emit = defineEmits(['selected']);
const flatItems = ref([]);
const selectedItem = ref('');

const flattenItems = (items, prefix = '') => {
  const flattened = [];
  items.forEach((item) => {
    const prefixedName = prefix ? `${prefix} / ${item.text}` : item.text;
    flattened.push({ ...item, name: prefixedName });
    if (item.children) {
      flattened.push(...flattenItems(item.children, prefixedName));
    }
  });
  return flattened;
};

const selectItem = (itemKey) => {
  const selectedItemValue = flatItems.value.find(
    (item) => item.key === itemKey
  );

  if (selectedItemValue) {
    emit('selected', selectedItemValue);
    storage.value = itemKey;
  }
};

onMounted(() => {
  // 將所有項目展開為一維陣列
  flatItems.value = flattenItems(props.menuItems);

  const lastSelectedItemKey = storage.value;
  const lastSelectedItem = flatItems.value.find(item => item.key === lastSelectedItemKey);

  // localStorage 有記錄，則將其設定為選擇的項目
  if (lastSelectedItemKey) {
    selectedItem.value = lastSelectedItemKey;
    if (lastSelectedItem) {
      emit('selected', lastSelectedItem);
    }
  } else if (flatItems.value.length > 0) {
    // localStorage 沒有紀錄，則將第一個項目設定為選擇的項目
    selectedItem.value = flatItems.value[0].key;
  }
});
</script>

<template>
  <select v-model="selectedItem" class="custom-dropdown" @change="selectItem(selectedItem)">
    <option v-for="item in flatItems" :key="item.key" :value="item.key">
      {{ item.text }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>