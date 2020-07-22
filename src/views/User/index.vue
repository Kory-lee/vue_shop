<template>
  <el-card>
    <el-form ref="formData" :model="formData" label-width="80px">
      <el-row>
        <el-col :span="10">
          <el-row :gutter="16">
            <el-form-item label="关键字：">
              <el-col :span="8">
                <Select
                  :config="selectConfig"
                  :selected.sync="formData.selectValue"
                />
              </el-col>
              <el-col :span="12">
                <el-input
                  v-model="formData.inputValue"
                  clearable
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="danger" @click="search">搜索</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-col>

        <el-col :span="7" :offset="7">
          <el-button type="danger" class="push-right" @click="handleAdd"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <Table
      ref="userTable"
      v-loading="loading"
      :config="tableConfig"
      :selectedIds.sync="tableConfig.selection.selectedIds"
      :page.sync="page.pageNumber"
      :limit.sync="page.pageSize"
    >
      <template #status="{data}">
        <el-switch
          v-model="data.status"
          :disabled="switchStatus"
          active-value="2"
          inactive-value="1"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="handleSwitch(data)"
        ></el-switch>
      </template>
      <template #operation="{data}">
        <el-button size="mini" type="danger" @click="handleDelete(data)"
          >删除</el-button
        >
        <el-button size="mini" type="success" @click="handleEdit(data)"
          >编辑</el-button
        >
      </template>
      <template #left>
        <el-button type="primary" size="medium" @click="handleDelete()"
          >批量删除</el-button
        >
        <el-button type="primary" size="medium" @click="getUserList()"
          >更新</el-button
        >
      </template>
    </Table>
    <Dialog :flag.sync="dialog_show" :data="dialog_info" />
  </el-card>
</template>

<script>
import { reactive, ref, watch } from "@vue/composition-api";
import getData from "./getData";
import { DeleteUser, ActivesUser } from "@api/user";
import Select from "@components/Select";
import Table from "@components/Table";
import Dialog from "./Dialog";
export default {
  name: "User",
  components: { Select, Table, Dialog },
  setup(props, { root }) {
    const { loading, tableConfig, page, getUserList } = getData(root);
    const dialog_show = ref(false),
      switchStatus = ref(false);
    const selectConfig = reactive({ init: ["username", "phone"] }),
      formData = reactive({ selectValue: "", inputValue: "" }),
      dialog_info = reactive({ mode: "", data: {} });
    watch(
      () => formData.inputValue,
      (value, oldValue) => oldValue && !value && getUserList(),
      { lazy: true }
    );
    watch(
      dialog_show,
      (value, oldValue) => !value && oldValue && getUserList()
    );
    const search = () => {
      let { pageNumber, pageSize } = page;
      let requestData = { pageNumber, pageSize };
      if (formData.selectValue)
        requestData[formData.selectValue] = formData.inputValue;
      getUserList(requestData);
    };
    const handleSwitch = ({ id, status }) => {
      switchStatus.value = true;
      root
        .$submit(() => ActivesUser({ id, status }))
        .then(() => (switchStatus.value = false));
    };
    const handleAdd = () => {
      dialog_info.mode = "add";
      dialog_show.value = true;
    };
    const handleEdit = (data) => {
      dialog_info.mode = "edit";
      dialog_info.data = data;
      dialog_show.value = true;
    };
    const handleDelete = (data) => {
      let id;
      if (!tableConfig.selection.selectedIds?.length && !data?.id)
        return root.$message.error("请选择要删除的对象");
      if (data) id = [+data.id];
      else id = tableConfig.selection.selectedIds;
      root.$confirm({
        fn: () =>
          root.$submit(
            () => DeleteUser({ id }),
            () => getUserList()
          ),
      });
    };

    return {
      loading,
      dialog_show,
      switchStatus,
      dialog_info,
      tableConfig,
      selectConfig,
      page,
      formData,
      search,
      handleDelete,
      handleAdd,
      handleEdit,
      handleSwitch,
      getUserList,
    };
  },
};
</script>

<style scoped lang="scss"></style>
