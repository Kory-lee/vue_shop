<template>
  <el-card>
    <el-form ref="formData" :model="formData" label-width="80px">
      <el-row>
        <el-col :span="10">
          <el-row :gutter="16">
            <el-form-item label="关键字：">
              <el-col :span="8">
                <Select :config="data.selectConfig" />
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
          <el-button type="danger" class="push-right">添加用户</el-button>
        </el-col>
      </el-row>
    </el-form>
    <Table :config="data.tableConfig">
      <template #status="slotData">
        <el-switch v-model="slotData.data.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </template>
      <template #operation="slotData">
        <el-button size="mini" type="danger" @click="handleDelete(slotData)">删除</el-button>
        <el-button size="mini" type="succes">编辑</el-button>
      </template>
    </Table>
  </el-card>
</template>

<script>
import { reactive } from '@vue/composition-api';
import Select from '@components/Select';
import Table from '@components/Table';
export default {
  name: 'User',
  components: { Select, Table },
  setup() {
    const data = reactive({
        selectConfig: { init: ['name', 'phone'] },
        tableConfig: {
          selection: true,
          head: [
            { value: 'email', label: '邮箱/用户名', width: 150 },
            { value: 'name', label: '真实姓名', width: 120 },
            { value: 'phone', label: '手机号', width: 150 },
            { value: 'address', label: '地区', width: 200 },
            { value: 'role', label: '角色' },
            { value: 'status', label: '禁/启用状态', columnType: 'slot', slotName: 'status' },
            { value: 'operation', label: '操作', columnType: 'slot', slotName: 'operation', width: 154 },
          ],
          category_name: '',
        },
      }),
      formData = reactive({ selectValue: 'name', inputValue: '' });
    const handleDelete = (data) => {
      console.log(data);
    };
    return {
      data,
      formData,
      handleDelete,
    };
  },
};
</script>

<style scoped lang="scss"></style>
