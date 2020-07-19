<template>
  <div>
    <el-upload
      :action="config.action"
      :data="data.upLoadKey"
      :show-file-list="false"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api';
import { ImageToken } from '@api/common';

export default {
  name: 'UploadImg',
  props: {
    url: { type: String, default: '' },
    config: { type: Object, default: () => {} },
  },
  setup(props, { root, emit }) {
    const dialogImageUrl = ref('');
    const data = reactive({ image: '', upLoadKey: { token: null, key: null } });
    const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = file.url;
    };
    watch(
      () => props.url,
      (value) => (dialogImageUrl.value = value)
    );
    const beforeUpload = (file) => {
      const isLT2M = file.size / 1024 / 1024 < 3;
      if (!isLT2M) root.$message.error('上传图片大小不能超过3MB!');
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      data.upLoadKey.key = key;
      return isLT2M;
    };
    const handleSuccess = (res) => {
      data.image = `${root.$store.getters('info/qiniuUrl')}/${res.key}`;
      emit('upload:imgUrl', data.image);
    };
    const getQiNiuToken = async () => {
      let { accessKey, secretKey, buckety } = props.config;
      let requestData = { accessKey, secretKey, buckety };
      // let { data } = await ImageToken(requestData);
      data.upLoadKey.token = await ImageToken(requestData).then(({ data }) => data.token);
      console.log(data.upLoadKey);
    };
    onMounted(() => getQiNiuToken());
    return {
      dialogImageUrl,
      data,
      handlePictureCardPreview,
      beforeUpload,
      handleSuccess,
    };
  },
};
</script>

<style lang="scss" scoped></style>
