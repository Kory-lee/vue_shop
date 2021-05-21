<script lang="tsx">
  import { defineComponent } from 'vue-demi';
  import { Modal } from 'ant-design-vue';
  import { basicProps } from '../props';

  export default defineComponent({
    name: 'Modal',
    components: { Modal },
    inheritAttrs: false,
    props: basicProps,
    setup() {
      return () => {
        return <Modal></Modal>;
      };
    },
  });
</script>
