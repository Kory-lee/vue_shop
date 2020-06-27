<template>
  <el-card>
    <el-form ref="formData" :model="formData" label-width="100px">
      <el-form-item label="信息分类：">
        <el-select v-model="formData.category" placeholder="">
          <el-option v-for="item in data.category" :key="item.id" :label="item.category_name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="新闻标题：">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图：">
        <UploadImg :url.sync="formData.imgUrl" :visible.sync="dialogVisible" :config="uploadConfig" />
      </el-form-item>

      <el-form-item label="发布日期：">
        <el-date-picker v-model="formData.createDate" type="datetime" disabled></el-date-picker>
      </el-form-item>

      <el-form-item label="详细内容：">
        <quillEditor ref="myQuillEditor" v-model="formData.content" :options="data.editorOption" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="data.submitLoading" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { reactive, onMounted, ref } from '@vue/composition-api';
import UploadImg from '@components/UploadImg';
import { GetList, EditInfo } from '@api/news';
import { timestampToTime } from '@utils/common';
import { quillEditor } from 'vue-quill-editor';
// require styles 引入样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  name: 'InfoDetail',
  components: { quillEditor, UploadImg },
  setup(props, { root }) {
    const dialogVisible = ref(false);
    const formData = reactive({ category: null, title: null, createDate: null, content: null, imgUrl: '' }),
      data = reactive({
        category: null,
        id: root.$route.query.id || root.$store.getters['infoDetail/infoId'],
        editorOption: null,
        submitLoading: false,
      }),
      uploadConfig = {
        action: 'http://up-z2.qiniup.com',
        accesskey: 'Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj',
        secretkey: '19AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw',
        buckety: 'webjshtml',
      };
    const submit = () => {
      data.submitLoading = true;
      let requestData = {
        id: data.id,
        categoryId: formData.category,
        title: formData.title,
        content: formData.content,
        imgurl: formData.imgUrl,
      };
      root
        .$submit(
          () => EditInfo(requestData),
          () => {}
        )
        .then(() => (data.submitLoading = false));
    };

    const getInfoCategory = () => {
      root.$store.dispatch('info/getInfoCategory').then((response) => {
        data.category = response.data.data;
        console.log(response);
      });
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
        (response) => {
          let result = response.data.data[0];
          formData.category = result.categoryId;
          formData.title = result.title;
          formData.createDate = timestampToTime(result.createDate * 1000);
          formData.content = result.content;
          formData.imgUrl = result.imgUrl;
        }
      );
    };
    onMounted(() => {
      getInfoCategory();
      getInfo();
    });
    return {
      dialogVisible,
      uploadConfig,
      data,
      formData,
      submit,
    };
  },
};
</script>

<style></style>
