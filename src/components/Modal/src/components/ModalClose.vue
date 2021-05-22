<template>
  <div :class="getClass">
    <template v-if="canFullscreen">
      <FullscreenExitOutlined v-if="fullScreen" role="full" @clik="handleFullScreen" />
      <FullscreenOutlined v-else role="close" @click="handleFullScreen" />
    </template>
    <CloseOutlined @click="handleCancel" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue-demi';
  import { useProviderContext } from '/@/components/Application';
  import { FullscreenExitOutlined, FullscreenOutlined, CloseOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'ModalClose',
    components: { FullscreenExitOutlined, FullscreenOutlined, CloseOutlined },
    props: { canFullscreen: { type: Boolean, default: true }, fullScreen: Boolean },
    emits: ['cancel', 'fullscreen'],
    setup(props, { emit }) {
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('basic-modal-close');

      const getClass = computed(() => [
        prefixCls,
        `${prefixCls}--custom`,
        { [`${prefixCls}--can-full`]: props.canFullscreen },
      ]);

      function handleCancel() {
        emit('cancel');
      }

      function handleFullScreen(e: Event) {
        e?.stopPropagation();
        e?.preventDefault();
        emit('fullscreen');
      }

      return { prefixCls, getClass, handleCancel, handleFullScreen };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-modal-close';
  .@{prefix-cls} {
    display: flex;
    height: 95%;
    align-items: center;

    > span {
      margin-left: 48px;
      font-size: 16px;
    }

    &--can-full {
      > span {
        margin-left: 12px;
      }
    }

    &:not(&--can-full) {
      > span:nth-child(1) {
        &:hover {
          font-weight: 700;
        }
      }
    }
  }
</style>
