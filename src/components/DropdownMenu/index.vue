<script setup>
import { ref, computed, defineProps, watchEffect } from 'vue';
import DropdownMenu from '@/components/DropdownMenu/index.vue';
import Arrow from '@/components/Arrow/index.vue';
import { useLocalStorage } from '@/composables/useLocalStorage';

const props = defineProps({
    menuItems: Array,
});

const { storage } = useLocalStorage('selectedItem', '');
const selectedItem = ref(storage.value || null);
// const expandedItemsCache = new Map();

const expandAllParents = (items, key) => {
    // if (expandedItemsCache.has(key)) {
    //     return expandedItemsCache.get(key);
    // }

    for (const item of items) {
        console.log(item.key)
        if (item.key === key || expandAllParents(item.children || [], key)) {
            item.expanded = true;
            // expandedItemsCache.set(key, true);
            return true;
        } else {
            item.expanded = false;
        }
    }
    // expandedItemsCache.set(key, false);
    return false;
};

const collapseChildren = (item) => {
    item.children?.forEach((child) => {
        child.expanded = false;
        if (child.children) {
            collapseChildren(child);
        }
    });
};

const toggleItem = (clickedItem) => {
    props.menuItems.forEach((item) => {
        if (item.key === clickedItem.key) {
            item.expanded = !item.expanded;
            selectedItem.value = item.expanded ? item.key : null;
            storage.value = selectedItem.value;
        } else {
            if (item.expanded) {
                item.expanded = false;
                collapseChildren(item);
            }
        }
    });
};

const expandedWatcher = computed(() => {
    if (selectedItem.value) {
        expandAllParents(props.menuItems, selectedItem.value);
    } else {
        props.menuItems.forEach((i) => {
            if (i.expanded && i.key !== selectedItem.value) {
                i.expanded = false;
                if (i.children) {
                    collapseChildren(i);
                }
            }
        });
    }
});

// 監視 menuItems 的變化，並調整項目的展開狀態
// watch(
//   () => props.menuItems,
//   () => {
//     if (selectedItem.value) {
//         expandAllParents(props.menuItems, selectedItem.value);
//     } else {
//         props.menuItems.forEach((i) => {
//             if (i.expanded && i.key !== selectedItem.value) {
//                 i.expanded = false;
//                 if (i.children) {
//                     collapseChildren(i);
//                 }
//             }
//         });
//     }
//   },
//   {
//     immediate: true,
//   }
// );


// ::todo select 後選單沒辦法展開

// 用 watchEffect 做初始化
watchEffect(() => {
    if (selectedItem.value) {
        expandAllParents(props.menuItems, selectedItem.value);
    } else {
        props.menuItems.forEach((i) => {
            if (i.expanded && i.key !== selectedItem.value) {
                i.expanded = false;
                if (i.children) {
                    collapseChildren(i);
                }
            }
        });
    }
});

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