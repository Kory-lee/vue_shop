<script lang="tsx">
  import { InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';
  import { defineComponent, PropType } from 'vue';
  const getIcons = {
    warning: InfoCircleFilled,
    success: CheckCircleFilled,
    info: InfoCircleFilled,
    error: CloseCircleFilled,
  };

  export type iconsType = keyof typeof getIcons;
  export default defineComponent({
    name: 'ModalIcon',
    // components: { InfoCircleFilled, CheckCircleFilled },
    props: { type: { type: String as PropType<iconsType>, default: 'info' } },
    setup(props) {
      const MIcon = getIcons[props.type];
      return () => <MIcon class={`modal-icon-${props.type}`} />;
    },
  });
</script>

<style lang="less" scoped>
  .modal-icon-warning {
    color: @warning-color !important;
  }

  .modal-icon-success {
    color: @success-color !important;
  }

  .modal-icon-error {
    color: @error-color !important;
  }

  .modal-icon-info {
    color: @primary-color !important;
  }
</style>
