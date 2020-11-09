<script lang="ts">
import { defineComponent, Fragment, h } from "vue";

export default defineComponent({
  setup() {
    return () =>
      h(Fragment, null, [h("div", null, "test1"), h("div", null, "test2")]);
  },
});
</script>

<style></style>
