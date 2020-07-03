import { reactive } from '@vue/composition-api';
export default function loadData() {
  const tableData = reactive({
    item: [],
  });
  const loadData = () => {};
  return {
    tableData,
    loadData,
  };
}
