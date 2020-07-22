<template>
  <div>
    <el-table
      ref="multipleSelection"
      :data="tableConfig.tableData.data"
      border
      @selection-change="emitDeleteItem"
    >
      <el-table-column
        v-if="tableConfig.selection.show"
        type="selection"
        align="center"
      >
      </el-table-column>

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
          :page-size="pages.pageSize"
          :current-page="pages.pageNumber"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableConfig.tableData.total"
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
import { reactive, onBeforeMount } from "@vue/composition-api";
import { responseInit } from "@utils/common";
export default {
  name: "Table",
  props: {
    config: { type: Object, default: () => {} },
    page: { type: Number, default: 1 },
    limit: { type: Number, default: 10 },
    selectedIds: { type: Array, default: () => [] },
  },
  setup(props, { emit }) {
    const tableConfig = reactive({
      selection: { show: true, selectedIds: [] },
      head: [],
      tableData: { data: null, total: null },
    });
    const pages = reactive({ pageSize: 10, pageNumber: 1 });

    const emitDeleteItem = (val) => {
      let ids = val?.map((item) => item.id);
      tableConfig.selection.selectedIds = ids;
      emit("update:selectedIds", ids);
    };
    // pagination
    const handleSizeChange = (val) => {
      pages.pageSize = val;
      emit("update:limit", val);
    };
    const handleCurrentChange = (val) => {
      pages.pageNumber = val;
      emit("update:page", val);
    };
    onBeforeMount(() => {
      responseInit(tableConfig, props.config);
    });
    return {
      tableConfig,
      pages,
      emitDeleteItem,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

<style lang="scss" scoped></style>
