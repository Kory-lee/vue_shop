<template>
  <div :class="[prefixCls, { fullscreen }]">
    <Upload
      name="file"
      multiple
      accept=".jpg,.jpeg,.gif,.png,.webp"
      @change="handleChange"
      :action="uploadUrl"
      :show-upload-list="false"
    >
      <Button type="primary" v-bind="getButtonProps">
        {{ t('component.upload.imgUpload') }}
      </Button>
    </Upload>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue-demi';

  import { Upload, Button } from 'ant-design-vue';
  import { useGlobalSetting } from '/@/hooks/setting';
  import { useI18n } from 'vue-i18n';
  import { getPrefixCls } from '/@/hooks/web/useDesign';

  export default defineComponent({
    name: 'TinymceImageUpload',
    components: {
      Upload,
      Button,
    },
    props: {
      fullscreen: Boolean,
      disabled: Boolean,
    },
    emits: ['uploading', 'done', 'error'],
    setup(props, { emit }) {
      let uploading = false;
      const { uploadUrl } = useGlobalSetting();
      const { t } = useI18n();
      const prefixCls = getPrefixCls('tinymce-img-upload');
      const getButtonProps = computed(() => {
        const { disabled } = props;
        return { disabled };
      });

      function handleChange(info: Recordable) {
        const file = info.file;
        const status = file?.status;
        const url = file?.response?.url;
        const name = file?.name;

        switch (status) {
          case 'uploading':
            if (uploading) return;
            emit('uploading', name);
            uploading = true;
            break;
          case 'done':
            emit('done', name, url);
            uploading = false;
            break;
          case 'error':
            emit('error');
            uploading = false;
        }
      }

      return {
        prefixCls,
        t,
        getButtonProps,
        uploadUrl,
        handleChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-tinymce-img-upload';

  .@{prefix-cls}{
    position: absolute;
    top: 4px;
    right: 10px;
    z-index: 20;

    &.fillsreen{
      position: fixed;
      z-index: 1000;
    }
  }
</style>
