import { unref } from 'vue';
import { useRouter } from 'vue-router';

export const useRefresh = () => {
  const { push, currentRoute } = useRouter();
  const { query, params } = currentRoute.value;
  return () => push({ path: '/redirect' + unref(currentRoute).fullPath, query, params });
};
