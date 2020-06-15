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
      <el-button size="small" class="diglogButton" @click="dialog_info_flag = false">取 消</el-button>
      <el-button size="small" type="danger" :loading="submitLoading" class="diglogButton" @click="submitConfirm"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { AddInfo } from '@api/news';
import { ref, reactive, watch } from '@vue/composition-api';
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
  },
  setup(props, { emit, root, refs }) {
    const dialog_info_flag = ref(false),
      submitLoading = ref(false);
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
    watch(
      () => props.flag,
      (value) => (dialog_info_flag.value = value)
    );
    const openedDialog = () => (options.item = props.category);
    const initForm = () => {
      refs.form.resetFields();
      submitLoading.value = false;
    };
    const submitConfirm = () => {
      if (!form.category) return root.$message.error('类别不能为空');
      submitLoading.value = true;
      let requsetData = { category: form.category, title: form.title, content: form.content };
      root
        .$submit(() => AddInfo(requsetData))
        .then(() => {
          initForm();
        });
    };
    return {
      dialog_info_flag,
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
