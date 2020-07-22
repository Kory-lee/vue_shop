<template>
  <el-dialog
    :title="dialog_mode"
    :visible.sync="dialog_flag"
    width="500px"
    @close="close"
    @opened="openedDialog"
  >
    <el-form ref="form" :model="form" label-width="50px">
      <el-form-item label="类型: " prop="categoryId">
        <Select
          :config="options.categoryConfig"
          :selected.sync="form.categoryId"
        />
      </el-form-item>
      <el-form-item label="标题: " prop="title">
        <el-input v-model="form.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="概况: " prop="content">
        <el-input
          v-model="form.content"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" class="dialogButton" @click="close"
          >取 消</el-button
        >
        <el-button
          size="small"
          class="dialogButton"
          type="danger"
          :loading="submitLoading"
          @click="submitConfirm"
          >确 定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { AddInfo, EditInfo } from "@api/news";
import { ref, reactive, computed } from "@vue/composition-api";
import { timestampToTime } from "@utils/common";
import Select from "@components/Select";
export default {
  components: { Select },
  props: {
    flag: { type: Boolean, default: false },
    data: { type: Object, default: () => {} },
  },
  setup(props, { emit, root, refs }) {
    const submitLoading = ref(false);
    const dialog_data = computed(() => props.data.data),
      dialog_mode = computed(() => props.data.mode),
      dialog_flag = computed({
        get: () => props.flag,
        set: (val) => emit("update:flag", val),
      });
    const form = reactive({ categoryId: "", title: "", content: "" }),
      options = reactive({
        categoryConfig: { commitUrl: "common/infoCategory" },
      });

    // 方法
    const close = () => {
      dialog_flag.value = false;
      initForm();
    };
    const openedDialog = () => {
      let { categoryId, title, content } = dialog_data.value;
      if (dialog_mode.value === "edit") {
        form.categoryId = categoryId;
        form.title = title;
        form.content = content;
      }
    };
    const initForm = () => {
      refs.form.resetFields();
      submitLoading.value = false;
    };
    const submitConfirm = () => {
      let { categoryId, title, content } = form;
      let id = dialog_data.value.id;
      if (!categoryId && !title)
        return root.$message.error("类别、标题不能为空");
      if (dialog_mode.value === "edit") {
        if (!content) return root.$message.error("内容不能为空");
        root.$submit(
          () =>
            EditInfo({
              categoryId,
              title,
              content,
              updateDate: timestampToTime(),
              id,
            }),
          () => {
            dialog_flag.value = false;
            emit("update:flag", false);
            root.$store.commit("common/EDIT_INFO_LIST", {
              id,
              data: { categoryId, title, content },
            });
            initForm();
          }
        );
      } else
        root.$submit(
          () =>
            AddInfo({
              categoryId,
              title,
              content,
              createDate: timestampToTime(),
            }),
          initForm
        );
    };
    return {
      dialog_mode,
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

<style scoped lang="scss"></style>
