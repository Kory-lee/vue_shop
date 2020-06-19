<template>
  <el-card class="infoIndex">
    <el-form>
      <el-row :gutter="16">
        <el-col :span="4">
          <el-form-item label="类别：" label-width="60px">
            <el-select v-model="searchValue.category" clearable style="width: 100%;">
              <el-option
                v-for="item in searchOptions.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
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
            <el-form-item label="关键字：" class="key" label-width="100px">
              <el-col :span="4">
                <el-select v-model="searchValue.key" style="width: 100%;">
                  <el-option
                    v-for="item in searchOptions.key"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-input v-model="searchValue.work" placeholder="" style="width: 100%;"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="danger" style="width: 100%;" @click="search">搜索</el-button>
              </el-col>
              <el-col :span="4" :offset="6">
                <el-button type="danger" style="width: 100%;" @click="dialogInfo = true">新增</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      ref="mutipleTable"
      v-loading="tableData.loading"
      :data="tableData.item"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45" align="center"> </el-table-column>
      <el-table-column prop="title" label="标题" align="center"> </el-table-column>
      <el-table-column prop="category" label="类型" width="130" align="center" :formatter="toCategory">
      </el-table-column>
      <el-table-column prop="createDate" label="日期" width="200" align="center" :formatter="toDate"> </el-table-column>
      <!-- <el-table-column prop="user" label="管理员" width="115" align="center"> </el-table-column> -->
      <el-table-column label="操作" align="center" width="250">
        <template v-slot="scope">
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button type="sucess" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <!-- <router-link
            :to="{ name: 'InfoDetail', path: '/infoDetail', query: { id: scope.row.id } }"
            class="margin-left-10"
          > -->
          <el-button type="sucess" size="mini" @click="toDetail(scope.row)">编辑详情</el-button>
          <!-- </router-link> -->
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="10" class="black-space-30">
      <el-col :span="12">
        <el-button type="primary" size="medium" @click="handleDelete()">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          background
          hide-on-single-page="true"
          :page-sizes="page.page_sizes"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalCount"
          class="push-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <DialogInfo :flag.sync="dialogInfo" :category="searchOptions.category" />
    <DialogInfo
      :id="dialog_info_edit.id"
      :data="dialog_info_edit.data"
      :flag.sync="dialog_info_edit.value"
      :category="searchOptions.category"
    />
  </el-card>
</template>

<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api';
import DialogInfo from './Dialog/info';
import { GetList, DeleteInfo } from '@api/news';
import { timestampToTime } from '@utils/common';
export default {
  name: 'InfoIndex',
  components: { DialogInfo },
  setup(props, { root }) {
    const dialogInfo = ref(false);
    const tableData = reactive({ item: [], loading: true, deleteItem: null }),
      dialog_info_edit = reactive({ id: '', value: false, data: {} }),
      searchValue = reactive({
        key: '',
        work: '',
        category: '',
        date: [],
      }),
      searchOptions = reactive({
        category: null,
        key: [
          { value: 'id', label: 'ID' },
          { value: 'title', label: '标题' },
        ],
      }),
      page = reactive({ totalCount: 0, pageSize: 10, pageNumber: 1, page_sizes: [10] });
    watch(
      () => page.totalCount,
      (value) => {
        if (value > 0) page.page_sizes = [10];
        else if (value > 40) page.page_sizes = [10, 20];
        else if (value > 80) page.page_sizes = [10, 20, 50];
        else page.page_sizes = [10, 20, 50, 100];
      }
    );
    watch(
      () => dialog_info_edit.value,
      (value, oldValue) => {
        if (!value && oldValue) getList();
      }
    );
    // 方法
    const toDate = (row) => timestampToTime(row.createDate * 1000);
    const toCategory = (row) =>
      searchOptions.category && searchOptions.category.filter((item) => item.id === row.categoryId)[0].category_name;

    const toDetail = (data) => {
      root.$router.push({ name: 'InfoDetail', path: 'infoDetail', params: { id: data.id, title: data.title } });
      root.$store.commit('infoDetail/UPDATE_STATE_VALUE', {
        id: { value: data.id, session: true, sessionKey: 'infoId' },
        title: { value: data.title, session: true, sessionKey: 'infoTitle' },
      });
    };

    const handleSizeChange = (val) => {
      page.pageSize = val;
      getList();
    };
    const handleSelectionChange = (val) => (tableData.deleteItem = val);
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
    const handleCurrentChange = (val) => {
      page.pageNumber = val;
      getList();
    };
    const handleEdit = (id) => {
      dialog_info_edit.id = id;
      dialog_info_edit.data = tableData.item;
      dialog_info_edit.value = true;
    };
    const handleDelete = (id = null) => {
      if (!id && !tableData.deleteItem) return root.$message.error('请勾选要删除的对象');
      let ids;
      if (!id) ids = tableData.deleteItem.map((item) => item.id);
      else ids = [id];
      root.confirm({ content: '确认永久删除？是否继续', tip: '警告', fn: () => deleteConfirm(ids) });
    };
    const deleteConfirm = (id) => root.$submit(() => DeleteInfo({ id }), getList);

    const getCategory = () =>
      root.$store
        .dispatch('info/getInfoCategory')
        .then((result) => (searchOptions.category = result.data.data))
        .catch((err) => root.$message.error(err));
    const getList = (
      requestData = {
        categoryId: '',
        startTiem: '',
        endTime: '',
        title: '',
        id: '',
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      }
    ) => {
      root
        .$request(
          () => GetList(requestData),
          (response) => {
            tableData.item = response.data.data;
            page.totalCount = response.data.total;
          }
        )
        .then(() => (tableData.loading = false));
    };
    onMounted(() => {
      getCategory();
      getList();
    });
    return {
      searchValue,
      searchOptions,
      tableData,
      page,
      dialogInfo,
      dialog_info_edit,
      toDetail,
      handleSizeChange,
      handleCurrentChange,
      handleDelete,
      toDate,
      toCategory,
      handleSelectionChange,
      search,
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
