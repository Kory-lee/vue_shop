import { reactive } from '@vue/composition-api';
export function tableLoadData() {
  const data = reactive();
  return {
    data,
  };
}
