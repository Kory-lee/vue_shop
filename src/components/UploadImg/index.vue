<template>
  <div>
    <el-upload
      :action="config.action"
      :data="data.upLoadKey"
      limit="1"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api';
import { ImageToken } from '@api/common';

export default {
  name: 'UploadImg',
  props: {
    url: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root, emit }) {
    console.log(props);
    const dialogImageUrl = ref(''),
      dialogVisible = ref(false);
    const data = reactive({ image: '', upLoadKey: { token: null, key: null } });
    const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = file.url;
      dialogVisible.value = true;
      emit('update:visible', true);
    };
    watch(
      () => props.url,
      (value) => (dialogImageUrl.value = value)
    );
    watch(
      () => props.visible,
      (value) => (dialogVisible.value = value)
    );
    const handleRemove = (file, fileList) => {
      console.log(file, fileList);
    };
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
    const getQiNiuToken = () => {
      let requestData = {
        accesskey: props.accesskey,
        secretkey: props.secretkey,
        buckety: props.buckety,
      };
      ImageToken(JSON.stringify(requestData))
        .then((response) => {
          data.upLoadKey.token = response.data.token;
        })
        .catch((err) => {
          root.$message.error(err.message);
        });
    };
    onMounted(() => {
      getQiNiuToken();
    });
    return {
      dialogImageUrl,
      data,
      handlePictureCardPreview,
      handleRemove,
      beforeUpload,
      handleSuccess,
    };
  },
};
</script>

<style lang="scss" scoped></style>
