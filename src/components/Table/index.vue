<template>
  <el-table
    v-loading="data.tableConfig.loading"
    :data="data.tableData"
    border
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="data.tableConfig.selection" type="selection" align="center"> </el-table-column>

    <template v-for="item in data.tableConfig.head">
      <el-table-column
        v-if="item.columnType === 'slot'"
        :key="item.value"
        :prop="item.value"
        :label="item.label"
        :width="item.width"
        align="center"
      >
        <template v-slot="scope">
          <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="item.value"
        :prop="item.value"
        :label="item.label"
        :width="item.width"
        align="center"
      >
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { reactive, onBeforeMount } from '@vue/composition-api';
import { post } from '@api';
export default {
  name: 'Table',
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root }) {
    const data = reactive({
      tableConfig: { selection: true, head: [], requsetData: {} },
      tableData: [],
    });
    const loadData = () => {
      root.$request(
        () => post(data.tableConfig.requsetData.url, data.tableConfig.requsetData.data),
        (response) => {
          let responseData = response.data.data;
          if (responseData && responseData.length) data.tableData = responseData;
          console.log(data.tableData);
        }
      );
    };
    const initTable = () => {
      let keys = Object.keys(data.tableConfig);
      for (let key in props.config) {
        if (keys.includes(key)) {
          data.tableConfig[key] = props.config[key];
        }
      }
    };
    onBeforeMount(() => {
      initTable();
      loadData();
    });
    return {
      data,
    };
  },
};
</script>

<style lang="scss" scoped></style>
