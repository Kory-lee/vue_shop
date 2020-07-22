import { reactive, ref, onBeforeMount } from "@vue/composition-api";
import { GetList } from "@api/news";
import { timestampToTime, throttle } from "@utils/common";
export default function getData(root) {
  const loading = ref(true);
  const tableConfig = reactive({
      selection: { show: true, selectedIds: [] },
      tableData: { data: [], total: 0 },
      head: [
        { value: "title", label: "标题" },
        {
          value: "category",
          label: "类型",
          width: 130,
          formatter: (row) => toCategory(row),
        },
        {
          value: "createDate",
          label: "日期",
          width: 200,
          formatter: (row) => toDate(row),
        },
        {
          value: "operation",
          label: "操作",
          columnType: "slot",
          slotName: "operation",
          width: 250,
        },
      ],
    }),
    page = reactive({ pageSize: 10, pageNumber: 1 });
  const toDate = (row) => timestampToTime(row.createDate * 1000);
  const toCategory = (row) =>
    root.$store.getters["common/infoCategory"].data?.find(
      (item) => item.value === row.categoryId
    ).label;
  const getCategory = (params = {}) => {
    if (!root.$store.getters["common/infoCategory"]?.data)
      root.$store.dispatch("common/getInfoCategory", params);
  };

  const getList = (
    params = {
      pageNumber: page.pageNumber,
      pageSize: page.pageSize,
    }
  ) => {
    loading.value = true;
    root
      .$request(
        () => GetList(params),
        ({ data, total }) => (tableConfig.tableData = { data, total })
      )
      .then(() => (loading.value = false));
  };

  onBeforeMount(() => {
    getCategory();
    getList();
  });

  return {
    tableConfig,
    loading,
    page,
    getList: throttle(getList),
    getCategory: throttle(getCategory),
  };
}
