import { defineComponent, h } from "vue";
import { RouterView } from "vue-router";
import "./styles/index.less";
export default defineComponent({
  setup() {
    // return()=>h(Fragment,null,[])
    return () => h(RouterView, null);
  },
});
