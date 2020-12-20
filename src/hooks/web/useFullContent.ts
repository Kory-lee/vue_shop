import { computed, unref } from 'vue';
import router from '/@/router';
import configStore from '/@/store/modules/config';

export const getFullContent = computed(() => {
  const route = unref(router.currentRoute);
  const query = route.query;
  if (query && Reflect.has(query, '__FULL__')) return true;
  return configStore.getProjectConfig.fullContent;
});
