import { ref, computed, unref } from 'vue';
import useWindowSizeFn from '/@/hooks/event/useWindowSizeFn';
import { createPageContext } from '/@/hooks/component/usePageContext';

export const headerHeightRef = ref(0);

export function useContentViewHeight() {
  const contentHeight = ref(window.innerHeight),
    pageHeight = ref(window.innerHeight),
    getViewHeight = computed(() => unref(contentHeight) - unref(headerHeightRef) || 0);
  useWindowSizeFn(
    () => {
      contentHeight.value = window.innerHeight;
    },
    100,
    { immediate: true }
  );

  async function setPageHeight(height: number) {
    pageHeight.value = height;
  }

  createPageContext({
    contentHeight: getViewHeight,
    setPageHeight,
    pageHeight,
  });
}
