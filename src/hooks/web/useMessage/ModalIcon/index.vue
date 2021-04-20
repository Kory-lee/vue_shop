<script lang="tsx">
  import { defineComponent, PropType } from 'vue';
  import { icons, iconsType } from '/@/hooks/web/useMessage/ModalIcon/icons';

  export default defineComponent({
    name: 'ModalIcon',
    // components: { InfoCircleFilled, CheckCircleFilled },
    props: { type: { type: String as PropType<iconsType>, default: 'info' } },
    setup(props) {
      const MIcon = icons[props.type];
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
