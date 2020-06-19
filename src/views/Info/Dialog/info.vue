<template>
  <el-dialog title="新增" :visible.sync="dialog_info_flag" width="500px" @close="close" @opened="openedDialog">
    <el-form ref="form" :model="form" label-width="50px">
      <el-form-item label="类型: " prop="category">
        <el-select v-model="form.category" placeholder="请选择活动区域">
          <el-option v-for="item in options.item" :key="item.id" :label="item.category_name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题: " prop="title">
        <el-input v-model="form.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="概况: " prop="content">
        <el-input v-model="form.content" type="textarea" :rows="5" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" class="diglogButton" @click="close">取 消</el-button>
      <el-button size="small" type="danger" :loading="submitLoading" class="diglogButton" @click="submitConfirm"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { AddInfo, EditInfo } from '@api/news';
import { ref, reactive, computed } from '@vue/composition-api';
import { indexArr } from '@utils/common';
export default {
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit, root, refs }) {
    const submitLoading = ref(false);
    const dialog_info_id = computed(() => props.id),
      dialog_info_flag = computed(() => props.flag),
      dialog_info_data = computed(() => props.data);
    let id;
    const form = reactive({
      category: '',
      title: '',
      content: '',
    });
    const options = reactive({ item: null });
    const close = () => {
      dialog_info_flag.value = false;
      emit('update:flag', false);
      initForm();
    };
    const openedDialog = () => {
      options.item = props.category;
      if (!dialog_info_id.value) return;
      let index = indexArr(dialog_info_data.value, dialog_info_id.value);
      id = dialog_info_data.value[index].id;
      form.category = dialog_info_data.value[index].categoryId;
      form.title = dialog_info_data.value[index].title;
      form.content = dialog_info_data.value[index].content;
    };
    const initForm = () => {
      refs.form.resetFields();
      submitLoading.value = false;
    };
    const submitConfirm = () => {
      if (!form.category) return root.$message.error('类别不能为空');
      submitLoading.value = true;
      if (dialog_info_id.value) edit();
      else add();
    };
    const edit = () => {
      let requsetData = { id, categoryId: form.category, title: form.title, content: form.content };
      root
        .$submit(() => EditInfo(requsetData))
        .then(() => {
          dialog_info_flag.value = false;
          emit('update:flag', false);
          initForm();
          dialog_info_id.value = '';
        });
    };
    const add = () => {
      let requsetData = { category: form.category, title: form.title, content: form.content };
      root.$submit(() => AddInfo(requsetData)).then(initForm);
    };
    return {
      dialog_info_flag,
      dialog_info_id,
      submitLoading,
      form,
      options,
      close,
      openedDialog,
      submitConfirm,
    };
  },
};
</script>

<style scoped lang="scss">
.el-dialog .el-form .el-form-item:last-child {
  margin-bottom: 0;
}
.diglogButton {
  width: 150px;
  margin: 0 11px 20px;
}
.dialog-footer {
  text-align: center;
}
</style>
