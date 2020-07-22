<template>
  <el-card>
    <el-form ref="formData" :model="formData" label-width="100px">
      <el-form-item label="信息分类：">
        <Select
          :config="categoryConfig"
          :selected.sync="formData.categoryId"
        ></Select>
      </el-form-item>
      <el-form-item label="新闻标题：">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图：">
        <UploadImg :url.sync="formData.imgUrl" :config="uploadConfig" />
      </el-form-item>

      <el-form-item label="发布日期：">
        <el-date-picker
          v-model="formData.createDate"
          type="datetime"
          disabled
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="详细内容：">
        <quillEditor
          ref="myQuillEditor"
          v-model="formData.content"
          :options="data.editorOption"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="data.submitLoading" @click="submit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { reactive, onMounted, onActivated } from "@vue/composition-api";
import UploadImg from "@components/UploadImg";
import { GetList, EditInfo } from "@api/news";
import { timestampToTime } from "@utils/common";
import { quillEditor } from "vue-quill-editor";
import Select from "@components/Select";
export default {
  name: "InfoDetail",
  components: { quillEditor, UploadImg, Select },
  setup(props, { root }) {
    const formData = reactive({
        categoryId: null,
        title: null,
        createDate: null,
        content: null,
        imgUrl: "",
      }),
      data = reactive({
        id: root.$route.query.id || root.$store.getters["infoDetail/infoId"],
        editorOption: null,
        submitLoading: false,
      }),
      categoryConfig = reactive({ commitUrl: "common/infoCategory" }),
      uploadConfig = {
        action: "http://up-z2.qiniup.com",
        accessKey: "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj",
        secretKey: "19AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
        buckety: "webjshtml",
      };
    const submit = () => {
      data.submitLoading = true;
      let { categoryId, title, content, imgUrl } = formData;
      let requestData = { id: data.id, categoryId, title, content, imgUrl };
      root
        .$submit(() => EditInfo(requestData))
        .then(() => (data.submitLoading = false));
    };

    const getInfoCategory = () => {
      if (!root.$store.getters["common/infoCategory"]?.data)
        root.$store.dispatch("common/getInfoCategory");
    };
    const getInfo = (
      requestData = {
        id: data.id,
        pageNumber: 1,
        pageSize: 1,
      }
    ) => {
      root.$request(
        () => GetList(requestData),
        ({ data }) => {
          let result = data[0];
          formData.categoryId = result.categoryId;
          formData.title = result.title;
          formData.createDate = timestampToTime(result.createDate * 1000);
          formData.content = result.content;
          formData.imgUrl = result.imgUrl;
        }
      );
    };
    onMounted(() => getInfoCategory());
    onActivated(() => {
      data.id =
        root.$route.query.id || root.$store.getters["infoDetail/infoId"];
      getInfo();
    });
    return {
      uploadConfig,
      data,
      categoryConfig,
      formData,
      submit,
    };
  },
};
</script>

<style lang="scss" scoped></style>
