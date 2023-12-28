<script setup>
import { ref, watchEffect, defineProps, defineEmits } from 'vue';
import { useLocalStorage } from '@/composables/useLocalStorage';
const { storage } = useLocalStorage('selectedItem', '');

const props = defineProps({
  menuItems: Array,
});

const emit = defineEmits(['selectItem']);
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
    console.log(selectedItemValue)
    emit('selectItem', selectedItemValue);
    storage.value = itemKey;
  }
};

// 用 watchEffect 做初始化
watchEffect(() => {
  flatItems.value = flattenItems(props.menuItems);
  const lastSelectedItemKey = storage.value;

  if (lastSelectedItemKey) {
    selectedItem.value = lastSelectedItemKey;
    const lastSelectedItem = flatItems.value.find(
      (item) => item.key === lastSelectedItemKey
    );
    if (lastSelectedItem) {
      emit('selectItem', lastSelectedItem);
    }
  } else if (flatItems.value.length > 0) {
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