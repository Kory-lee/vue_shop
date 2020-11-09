import { defineComponent, h } from "vue";

export default defineComponent({
  name: "Dashboard",
  setup() {
    return () => h("div", { class: "index-container" }, "dashboard");
  },
});
