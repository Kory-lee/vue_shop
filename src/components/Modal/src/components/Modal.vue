<script lang="tsx">
  import { defineComponent } from 'vue-demi';
  import { Modal } from 'ant-design-vue';

  export default defineComponent({
    name: 'Modal',
    components: { Modal },
    inheritAttrs: false,
    setup() {
      return () => {
        return <Modal></Modal>;
      };
    },
  });
</script>
