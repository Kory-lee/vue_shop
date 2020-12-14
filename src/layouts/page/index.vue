<script lang="ts">
import { defineComponent, h } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'PageLayout',
  setup() {
    return () => h(RouterView, null);
  },
});
</script>

<style></style>
