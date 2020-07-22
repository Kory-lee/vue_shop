<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutHeader from "@components/Header";
import LayoutNav from "@components/Nav";
import LayoutMain from "@components/Main";
import { computed } from "@vue/composition-api";

export default {
  name: "layout",
  components: { LayoutHeader, LayoutNav, LayoutMain },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse);
    return {
      menuStatus,
    };
  },
};
</script>

<style scoped lang="scss">
#layout {
  background-color: #f7f7f7;
}
</style>
