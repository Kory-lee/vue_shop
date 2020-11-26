<script lang="ts">
import { defineComponent, h } from "vue";
import { Result } from "ant-design-vue";
export default defineComponent({
  name: "ErrorPage",
  props: {
    status: { type: Number },
  },
  setup() {
    return () => h(Result, { class: "exception" });
  },
});
</script>

<style></style>
