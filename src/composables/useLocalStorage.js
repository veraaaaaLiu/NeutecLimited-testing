import { ref, computed, watch } from 'vue';

/**
 * 使用本地存儲的 Hook。
 * @param {string} key - 存儲在 localStorage 中的鍵。
 * @param {*} initialValue - 初始值，如果 localStorage 中沒有對應的值時使用。
 * @returns {object} - 包含 ref 對象的對象，該對象表示存儲在 localStorage 中的值。
 */
export function useLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  const defaultValue = storedValue ? JSON.parse(storedValue) : initialValue;
  const storage = ref(defaultValue);

  // 更新 storage 的值，同時更新 localStorage
  storage.value = JSON.parse(
    localStorage.getItem(key) || JSON.stringify(initialValue)
  );

  watch(
    () => storage.value,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  );

  return { storage };
}