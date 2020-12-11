import { Layout } from "ant-design-vue";
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
export default defineComponent({
  name: "DefaultLayout",
  setup(props) {
    return () => (
      <Layout class="default-layout">
        {{ default: () => <RouterView /> }}
      </Layout>
    );
  },
});
