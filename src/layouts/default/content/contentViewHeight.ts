import { ref, computed, unref } from 'vue';

export const headerHeightRef = ref(0);
export function contentViewHeight() {
  const contentHeight = ref(window.innerHeight),
    pageHeight = ref(window.innerHeight),
    getViewHeight = computed(() => unref(contentHeight) - unref(headerHeightRef) || 0);
}
