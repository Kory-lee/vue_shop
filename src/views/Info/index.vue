<template>
  <el-card class="infoIndex">
    <el-form>
      <el-row :gutter="16">
        <el-col :span="4">
          <el-form-item label="类别：" label-width="60px">
            <Select :config="searchOptions.categoryConfig" />
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
                <Select :config="searchOptions.keyConfig" />
              </el-col>
              <el-col :span="6">
                <el-input v-model="searchValue.work" placeholder="" style="width: 100%;"></el-input>
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
    <Table :config="tableData.tableConfig" @give-selection="onDeleteItem">
      <template #operation="slotData">
        <el-button type="danger" size="mini" @click="handleDelete(slotData)">删除</el-button>
        <el-button type="sucess" size="mini" @click="handleEdit(slotData)">编辑</el-button>
        <el-button type="sucess" size="mini" @click="toDetail(slotData)">编辑详情</el-button>
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
import DialogInfo from './Dialog/info';
import Select from '@components/Select';
import Table from '@components/Table';
import { DeleteInfo } from '@api/news';
import { timestampToTime } from '@utils/common';
export default {
  name: 'InfoIndex',
  components: { DialogInfo, Select, Table },
  setup(props, { root }) {
    const dialog_show = ref(false);
    const tableData = reactive({
        tableConfig: {
          selection: { show: true, deleteItem: null },
          commitUrl: 'common/infoList',
          head: [
            { value: 'title', label: '标题' },
            { value: 'category', label: '类型', width: 130, formatter: (row) => toCategory(row) },
            { value: 'createDate', label: '日期', width: 200, formatter: (row) => toDate(row) },
            { value: 'operation', label: '操作', columnType: 'slot', slotName: 'operation', width: 250 },
          ],
        },
      }),
      dialog_info = reactive({ mode: '', data: {} }),
      searchValue = reactive({ key: '', work: '', category: '', date: [] }),
      searchOptions = reactive({
        keyConfig: { init: ['id', 'title'] },
        categoryConfig: { commitUrl: 'common/infoCategory' },
      }),
      page = reactive({ totalCount: 0, pageSize: 10, pageNumber: 1, page_sizes: [10] });

    watch(dialog_show, (value, oldValue) => !value && oldValue && getList());
    // 方法
    const toDate = (row) => timestampToTime(row.createDate * 1000);
    const toCategory = (row) =>
      root.$store.getters['common/infoCategory'].data?.find((item) => item.value === row.categoryId).label;
    const toDetail = ({ id, title }) => {
      root.$router.push({ name: 'InfoDetail', path: 'infoDetail', params: { id, title } });
      root.$store.commit('infoDetail/UPDATE_STATE_VALUE', {
        id: { value: id, session: true, sessionKey: 'infoId' },
        title: { value: title, session: true, sessionKey: 'infoTitle' },
      });
    };
    const onDeleteItem = (val) => {
      tableData.tableConfig.selection.deleteItem = val;
    };

    const search = () => {
      if (!searchValue.category || searchValue.date.length === 0) return;
      let requestData = {
        categoryId: searchValue.category || '',
        startTiem: searchValue.date[0] || '',
        endTime: searchValue.date[1] || '',
        title: '',
        id: '',
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      };
      if (searchValue.key) requestData[searchValue.key] = searchValue.work;
      getList(requestData);
    };
    const handleEdit = (row) => {
      dialog_show.value = true;
      dialog_info.mode = 'edit';
      dialog_info.data = row.data;
    };
    const handleAdd = () => {
      dialog_show.value = true;
      dialog_info.mode = 'add';
    };
    const handleDelete = (row) => {
      let multi_row = tableData.tableConfig.selection.deleteItem;
      let id;
      if (!multi_row && !row) return root.$message.error('请选择要删除的对象');
      if (row) id = [row.data.id];
      else id = multi_row?.map((item) => item.id);
      root.$confirm({ content: '确认永久删除？是否继续', tip: '警告', fn: () => deleteConfirm(id) });
    };
    const deleteConfirm = (id) =>
      root.$submit(
        () => DeleteInfo({ id }),
        () => getList()
      );
    const getCategory = (data = {}) => root.$store.dispatch('common/getInfoCategory', data);
    const getList = (
      data = {
        categoryId: searchValue.category || '',
        startTiem: searchValue.date[0] || '',
        endTime: searchValue.date[1] || '',
        title: '',
        id: '',
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      }
    ) => {
      root.$store.dispatch('common/getInfoList', data);
    };

    onBeforeMount(() => {
      getCategory();
      getList();
    });
    return {
      searchValue,
      searchOptions,
      tableData,
      page,
      dialog_info,
      dialog_show,
      toDetail,
      handleDelete,
      onDeleteItem,
      search,
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
