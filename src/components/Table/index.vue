<template>
  <el-table
    ref="multipleSelection"
    v-loading="loading"
    :data="data.tableData"
    border
    @selection-change="emitDeleteItem"
  >
    <el-table-column v-if="data.tableConfig.selection.show" type="selection" align="center"> </el-table-column>

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
        :formatter="item.formatter"
        :width="item.width"
        align="center"
      >
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { reactive, onBeforeMount, computed } from '@vue/composition-api';
import { responseInit } from '@utils/common';
export default {
  name: 'Table',
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root, emit }) {
    const data = reactive({
      tableConfig: { selection: { show: true, deleteItem: null }, head: [], commitUrl: '' },
      tableData: [],
    });
    const loading = computed(() => !data.tableData);
    const emitDeleteItem = (val) => {
      data.tableConfig.selection.deleteItem = val;
      emit('give-selection', data.tableConfig.selection.deleteItem);
    };
    const loadData = async () => {
      let tempArr = await computed(() => root.$store.getters[props.config.commitUrl]?.data);
      data.tableData = tempArr;
    };
    onBeforeMount(() => {
      responseInit(data.tableConfig, props.config);
      loadData();
    });
    return {
      data,
      loading,
      emitDeleteItem,
    };
  },
};
</script>

<style lang="scss" scoped></style>
