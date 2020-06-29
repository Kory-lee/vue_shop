<template>
  <el-dialog :title="modeTitle" :visible.sync="dialog_flag" width="500px" @close="close" @opened="openedDialog">
    <el-form ref="form" :model="form" label-width="50px">
      <el-form-item label="类型: " prop="categoryId">
        <Select :config="options.categoryConfig" :selected.sync="form.categoryId" />
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
import { timestampToTime } from '@utils/common';
import Select from '@components/Select';
export default {
  components: { Select },
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit, root, refs }) {
    const submitLoading = ref(false),
      modeTitle = ref('');
    const dialog_data = computed(() => props.data),
      dialog_flag = computed(() => props.flag);
    const form = reactive({
        categoryId: '',
        title: '',
        content: '',
      }),
      options = reactive({ categoryConfig: { commitUrl: 'common/infoCategory' } });

    // 方法
    const close = () => {
      dialog_flag.value = false;
      emit('update:flag', false);
      initForm();
    };
    const openedDialog = () => {
      let { categoryId, title, content } = dialog_data.value.data;
      if (dialog_data.value.mode === 'edit') {
        modeTitle.value = '编辑';
        form.categoryId = categoryId;
        form.title = title;
        form.content = content;
      } else {
        modeTitle.value = '新增';
      }
    };
    const initForm = () => {
      refs.form.resetFields();
      submitLoading.value = false;
    };
    const submitConfirm = () => {
      let { categoryId, title, content } = form;
      let value = dialog_data.value;
      let id = value.data.id;
      if (!categoryId && !title) return root.$message.error('类别、标题不能为空');
      if (value.mode === 'edit') {
        if (!content) return root.$message.error('内容不能为空');
        root.$submit(
          () => EditInfo({ categoryId, title, content, updateDate: timestampToTime(), id }),
          () => {
            dialog_flag.value = false;
            emit('update:flag', false);
            root.$store.commit('common/EDIT_INFO_LIST', { id, data: { categoryId, title, content } });
            initForm();
          }
        );
      } else
        root.$submit(
          () => AddInfo({ categoryId, title, content, createDate: timestampToTime() }),
          () => {
            initForm();
          }
        );
    };
    return {
      modeTitle,
      dialog_flag,
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
