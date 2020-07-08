<template>
  <el-card class="infoIndex">
    <el-form>
      <el-row :gutter="16">
        <el-col :span="4">
          <el-form-item label="类别：" label-width="60px">
            <Select :config="searchOptions.categoryConfig" :selected.sync="searchValue.categoryId" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="日期：" label-width="93px">
            <el-date-picker
              v-model="searchValue.date"
              style="width: 100%;"
              type="datetimerange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="center"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-row :gutter="16">
            <el-form-item label="关键字：" class="key" label-width="90px">
              <el-col :span="4">
                <Select :config="searchOptions.keyConfig" :selected.sync="searchValue.selectValue" />
              </el-col>
              <el-col :span="6">
                <el-input
                  v-model="searchValue.inputValue"
                  clearable
                  placeholder="请输入"
                  style="width: 100%;"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="danger" style="width: 100%;" @click="search">搜索</el-button>
              </el-col>
              <el-col :span="4" :offset="6">
                <el-button type="danger" style="width: 100%;" @click="handleAdd">新增</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <Table
      ref="userTable"
      v-loading="loading"
      :config="tableConfig"
      :page.sync="page.pageNumber"
      :limit.sync="page.pageSize"
      :selectedIds.sync="tableConfig.selection.selectedIds"
    >
      <template #operation="{data}">
        <el-button type="danger" size="mini" @click="handleDelete(data)">删除</el-button>
        <el-button type="success" size="mini" @click="handleEdit(data)">编辑</el-button>
        <el-button type="success" size="mini" @click="toDetail(data)">编辑详情</el-button>
      </template>
      <template #left>
        <el-button type="primary" size="medium" @click="handleDelete()">批量删除</el-button>
      </template>
    </Table>
    <DialogInfo :flag.sync="dialog_show" :data="dialog_info" />
  </el-card>
</template>

<script>
import { reactive, ref, watch, onBeforeMount } from '@vue/composition-api';
import DialogInfo from './Dialog';
import Select from '@components/Select';
import Table from '@components/Table';
import { DeleteInfo, GetList } from '@api/news';
import { timestampToTime, throttle } from '@utils/common';
export default {
  name: 'InfoIndex',
  components: { DialogInfo, Select, Table },
  setup(props, { root, refs }) {
    const dialog_show = ref(false),
      loading = ref(true);
    const tableConfig = reactive({
        selection: { show: true, selectedIds: [] },
        tableData: { data: [], total: 0 },
        head: [
          { value: 'title', label: '标题' },
          { value: 'category', label: '类型', width: 130, formatter: (row) => toCategory(row) },
          { value: 'createDate', label: '日期', width: 200, formatter: (row) => toDate(row) },
          { value: 'operation', label: '操作', columnType: 'slot', slotName: 'operation', width: 250 },
        ],
      }),
      dialog_info = reactive({ mode: '', data: {} }),
      searchValue = reactive({ selectValue: '', inputValue: '', categoryId: '', date: [] }),
      searchOptions = reactive({
        keyConfig: { init: ['id', 'title'] },
        categoryConfig: { commitUrl: 'common/infoCategory' },
      }),
      page = reactive({ pageSize: 10, pageNumber: 1 });
    watch(dialog_show, (value, oldValue) => !value && oldValue && getList(), { lazy: true });
    watch(
      () => searchValue.categoryId,
      (value, oldValue) => oldValue && !value && getList()
    );
    // 方法
    const toDate = (row) => timestampToTime(row.createDate * 1000);
    const toCategory = (row) =>
      root.$store.getters['common/infoCategory'].data?.find((item) => item.value === row.categoryId).label;
    const toDetail = ({ id, title }) => {
      console.log(id, title);

      root.$router.push({ name: 'InfoDetail', path: 'infoDetail', params: { id, title } });
      root.$store.commit('infoDetail/UPDATE_STATE_VALUE', {
        id: { value: id, session: true, sessionKey: 'infoId' },
        title: { value: title, session: true, sessionKey: 'infoTitle' },
      });
    };
    const search = () => {
      if (!searchValue.categoryId && !searchValue.date?.length) return root.$message.error('请至少输入类别或日期');
      if (!searchValue.selectValue && searchValue.inputValue) return root.$message.error('请选择关键字分类');
      let requestData = {
        categoryId: searchValue.categoryId,
        startTime: searchValue.date[0] || '',
        endTime: searchValue.date[1] || '',
        title: '',
        id: '',
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      };
      if (searchValue.selectValue) requestData[searchValue.selectValue] = searchValue.inputValue;
      getList(requestData);
    };
    const handleEdit = (data) => {
      dialog_show.value = true;
      dialog_info.mode = 'edit';
      dialog_info.data = data;
    };
    const handleAdd = () => {
      dialog_show.value = true;
      dialog_info.mode = 'add';
    };
    const handleDelete = (data) => {
      let id;
      if (!tableConfig.selection.selectedIds?.length && !data?.id) return root.$message.error('请选择要删除的对象');
      if (data) id = [data.id];
      else id = tableConfig.selection.selectedIds;
      root.$confirm({
        content: '确认永久删除？是否继续',
        tip: '警告',
        fn: () =>
          root.$submit(
            () => DeleteInfo({ id }),
            () => getList()
          ),
      });
    };
    const getCategory = (params = {}) => {
      root.$store.dispatch('common/getInfoCategory', params);
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
      page,
      loading,
      searchValue,
      searchOptions,
      tableConfig,
      dialog_info,
      dialog_show,
      toDetail,
      handleDelete,
      search: throttle(search),
      handleAdd,
      handleEdit,
    };
  },
};
</script>

<style scoped lang="scss">
.black-space-30::before {
  height: 30px;
}
.key .el-button--danger {
  min-width: 65px;
}
</style>
