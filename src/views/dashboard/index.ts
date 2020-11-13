import { defineComponent, h } from "vue";
import Version from "./components/VersionInformation.vue";
export default defineComponent({
  name: "Dashboard",
  setup() {
    return () => h("div", { class: "index-container" }, [h(Version)]);
  },
});
