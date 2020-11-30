import { defineComponent, nextTick, onMounted } from 'vue';

export default defineComponent({
  name: 'Wave',
  props: ['insertExtraNode'],
  setup() {
    onMounted(() =>
      nextTick(() => {
        // const node = 
      })
    );
  },
});
