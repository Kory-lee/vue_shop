import { GetUserList } from '@api/user';
import { reactive, onBeforeMount, ref } from '@vue/composition-api';
import { throttle } from '@utils/common';
export default function getData(root) {
  const loading = ref(true),
    tableConfig = reactive({
      selection: { show: true, selectedIds: null },
      tableData: { data: [], total: 0 },
      head: [
        { value: 'username', label: '邮箱/用户名', width: 150 },
        { value: 'truename', label: '真实姓名', width: 120 },
        { value: 'phone', label: '手机号', width: 150 },
        { value: 'region', label: '地区', width: 200 },
        { value: 'role', label: '角色' },
        { value: 'status', label: '禁/启用状态', columnType: 'slot', slotName: 'status' },
        { value: 'operation', label: '操作', columnType: 'slot', slotName: 'operation', width: 154 },
      ],
    }),
    page = reactive({ pageSize: 10, pageNumber: 1 });
  const getUserList = (params = page) => {
    loading.value = true;
    root
      .$request(
        () => GetUserList(params),
        ({ data, total }) => (tableConfig.tableData = { data, total })
      )
      .then(() => (loading.value = false));
  };

  onBeforeMount(() => getUserList());
  return { loading, tableConfig, page, getUserList: throttle(getUserList) };
}
