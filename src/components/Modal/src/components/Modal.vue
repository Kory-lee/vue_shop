<script lang="tsx">
  import { defineComponent } from 'vue-demi';
  import { Modal } from 'ant-design-vue';
  import { basicProps } from '../props';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { unref } from 'vue';
  import { extendSlots } from '/@/utils/helper/jsxHelper';

  export default defineComponent({
    name: 'Modal',
    components: { Modal },
    inheritAttrs: false,
    props: basicProps,
    setup(props, { slots }) {
      const attrs = useAttrs();

      return () => {
        const propsData = { ...unref(attrs), ...props };
        return <Modal {...propsData}>{extendSlots(slots)}</Modal>;
      };
    },
  });
</script>
