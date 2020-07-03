<template>
  <div>
    <el-table
      ref="multipleSelection"
      v-loading="loading"
      :data="tableData.data"
      border
      @selection-change="emitDeleteItem"
    >
      <el-table-column v-if="tableConfig.selection.show" type="selection" align="center"> </el-table-column>

      <template v-for="item in tableConfig.head">
        <el-table-column
          v-if="item.columnType === 'slot'"
          :key="item.value"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <template v-slot="{ row }">
            <slot :name="item.slotName" :data="row"></slot>
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
    <el-row :gutter="10" class="black-space-30">
      <el-col :span="12">
        <slot name="left"></slot>
      </el-col>
      <el-col :span="12">
        <el-pagination
          background
          :page-sizes="[10, 20, 50]"
          :page-size="page.pageSize"
          :current-page="page.pageNumber"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          class="push-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<!-- hide-on-single-page="true" -->

<script>
import { reactive, onBeforeMount, computed, watch } from '@vue/composition-api';
import { responseInit } from '@utils/common';
export default {
  name: 'Table',
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    page: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root, emit }) {
    const tableConfig = reactive({
        selection: { show: true, deleteItem: null },
        head: [],
        commitUrl: '',
      }),
      tableData = reactive({ data: [], total: 0 });
    const loading = computed(() => !tableData.data?.length);
    const emitDeleteItem = (val) => {
      tableConfig.selection.deleteItem = val;
      emit('give-selection', val);
    };
    watch(
      [
        () => root.$store.getters[props.config.commitUrl]?.data,
        () => root.$store.getters[props.config.commitUrl]?.total,
      ],
      ([data, total]) => responseInit(tableData, { data, total })
    );

    // pagination
    const page = reactive({ pageSize: 10, pageNumber: 1 });
    // watch([() => page.pageNumber, () => page.pageSize], ([pageNumber, pageSize]) => console.log(pageNumber, pageSize));
    const handleSizeChange = (val) => {
      page.pageSize = val;
      emit('update:pageSize', val);
    };
    const handleCurrentChange = (val) => {
      page.pageNumber = val;
      emit('update:pageNumber', val);
    };
    onBeforeMount(() => {
      responseInit(tableConfig, props.config);
    });
    return {
      tableConfig,
      page,
      tableData,
      loading,
      emitDeleteItem,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

<style lang="scss" scoped></style>
