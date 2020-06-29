import { reactive } from '@vue/composition-api';
export function tableLoadData() {
  const tableData = reactive({
    item: [],
  });
  const loadData = () => {};
  return {
    tableData,
    loadData,
  };
}
