<script setup>
import { ref, defineProps, watch, nextTick, watchEffect } from 'vue';
import DropdownMenu from '@/components/DropdownMenu/index.vue';
import Arrow from '@/components/Arrow/index.vue';
import { useLocalStorage } from '@/composables/useLocalStorage';

const props = defineProps({
    menuItems: Array,
    selectorItem: String
});

const { storage } = useLocalStorage('selectedItem', '');
const selectedItem = ref(storage.value || null);

const collapseChildren = (item) => {
    item.children?.forEach((child) => {
        child.expanded = false;
        if (child.children) {
            collapseChildren(child);
        }
    });
};

const expandAllParents = (items, key) => {
    const helper = (items, key) => {
        for (const item of items) {
            if (item.key === key || helper(item.children || [], key)) {
                item.expanded = true;
                return true;
            } else {
                item.expanded = false;
            }
        }
        return false;
    };

    return helper(items, key);
};

const toggleItem = async (clickedItem) => {
    const helper = (menuItems, selectedItem, clickedItem) => {
        for (const item of menuItems) {
            if (item.key === clickedItem.key) {
                item.expanded = !item.expanded;
                selectedItem.value = item.expanded ? item.key : null;
                storage.value = selectedItem.value;
            } else if (item.expanded) {
                item.expanded = false;
                collapseChildren(item);
            }
        }
    };

    helper(props.menuItems, selectedItem, clickedItem);
    await nextTick(); // 確保 DOM 已更新
};

watch(
    () => props.selectorItem,
    (newSelectedItem, oldSelectedItem) => {
        if (newSelectedItem) {
            expandAllParents(props.menuItems, newSelectedItem);
            // console.log(props.menuItems)
        }
    },
);

</script>

<template>
    <ul>
        <li v-for="item in menuItems" :key="item.key" @click.stop="toggleItem(item)">
            <div :class="item.expanded ? 'active' : ''">
                <template v-if="item.children">
                    <Arrow :direction="item.expanded ? 'down' : 'right'" color='#000' />
                </template>
                <span>{{ item.text }}</span>
            </div>
            <div v-if="item.children && item.expanded">
                <DropdownMenu :menuItems="item.children" />
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>