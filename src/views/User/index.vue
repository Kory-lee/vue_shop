<template>
  <el-card>
    <el-form ref="formData" :model="formData" label-width="80px">
      <el-row>
        <el-col :span="10">
          <el-row :gutter="16">
            <el-form-item label="关键字：">
              <el-col :span="8">
                <Select :config="tableData.selectConfig" />
              </el-col>
              <el-col :span="12">
                <el-input v-model="formData.inputValue" placeholder=""></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="danger">搜索</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-col>

        <el-col :span="7" :offset="7">
          <el-button type="danger" class="push-right" @click="handleAdd">添加用户</el-button>
        </el-col>
      </el-row>
    </el-form>
    <Table
      :config="tableData.tableConfig"
      @give-selection="onDeleteItem"
      :pageSize.sync="pageSize"
      :pageNumber.sync="pageNumber"
    >
      <template #status="{data}">
        {{ data }}
        <el-switch
          v-model="data.status"
          active-value="2"
          inactive-value="1"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <template #operation="{data}">
        <el-button size="mini" type="danger" @click="handleDelete(data)">删除</el-button>
        <el-button size="mini" type="success">编辑</el-button>
      </template>
      <template #left>
        <el-button type="primary" size="medium" @click="handleDelete()">批量删除</el-button>
      </template>
    </Table>
    <Dialog :flag.sync="dialog_show" :data="dialog_info" />
  </el-card>
</template>

<script>
import { reactive, onBeforeMount, watch, ref } from '@vue/composition-api';
import Select from '@components/Select';
import Table from '@components/Table';
import Dialog from './Dialog';
export default {
  name: 'User',
  components: { Select, Table, Dialog },
  setup(props, { root }) {
    const dialog_show = ref(false);
    const tableData = reactive({
        selectConfig: { init: ['name', 'phone'] },
        tableConfig: {
          selection: { show: true, deleteItem: null },
          commitUrl: 'user/userList',
          head: [
            { value: 'username', label: '邮箱/用户名', width: 150 },
            { value: 'truename', label: '真实姓名', width: 120 },
            { value: 'phone', label: '手机号', width: 150 },
            { value: 'region', label: '地区', width: 200 },
            { value: 'role', label: '角色' },
            { value: 'status', label: '禁/启用状态', columnType: 'slot', slotName: 'status' },
            { value: 'operation', label: '操作', columnType: 'slot', slotName: 'operation', width: 154 },
          ],
        },
      }),
      formData = reactive({ selectValue: 'name', inputValue: '' }),
      page = reactive({ pageSize: 10, pageNumber: 1 }),
      dialog_info = reactive({ data: null });
    const handleAdd = () => {
      dialog_show.value = true;
    };
    const handleDelete = (data) => {
      console.log(data);
    };
    watch(
      () => page.pageSize,
      (value) => console.log('value :>> ', value)
    );
    const getUserList = (data = { pageNumber: 1, pageSize: 10 }) => root.$store.dispatch('user/getUserList', data);
    onBeforeMount(() => {
      getUserList();
    });
    return {
      dialog_show,
      dialog_info,
      tableData,
      page,
      formData,
      handleDelete,
      handleAdd,
    };
  },
};
</script>

<style scoped lang="scss"></style>
