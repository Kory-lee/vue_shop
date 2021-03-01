import { defineComponent, unref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Redirect',
  setup() {
    const { currentRoute, replace } = useRouter(),
      {
        params: { path },
        query,
      } = unref(currentRoute),
      // { path } = params,
      _path = Array.isArray(path) ? path.join('/') : path;
    replace({ path: '/' + _path, query });
  },
});
