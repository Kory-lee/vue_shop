<template>
  <!-- <div id="nav-wrap"> -->
  <el-menu
    router
    :default-active="indexActive"
    :collapse="isCollapse"
    class="el-menu-vertical-demo"
    background-color="#344A5F"
    text-color="#fff"
    active-text-color="#fff"
    unique-opened="true"
  >
    <h1 class="logo" @click="backHome">
      <img src="@assets/logo.png" alt />
    </h1>
    <template v-for="item in routers">
      <el-submenu v-if="!item.hidden" :key="item.id" :index="item.path">
        <template #title>
          <svg-icon :icon-name="item.meta.icon" class="regular"></svg-icon>
          <span name="title">{{ item.meta.name }}</span>
        </template>
        <template v-for="subItem in item.children">
          <el-menu-item v-if="!subItem.hidden" :key="subItem.id" :index="subItem.path">{{
            subItem.meta.name
          }}</el-menu-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
  <!-- </div> -->
</template>

<script>
import { reactive, computed } from '@vue/composition-api';
export default {
  name: 'LayoutNav',
  setup(props, { root }) {
    const routers = reactive(root.$router.options.routes);
    const isCollapse = computed(() => root.$store.state.app.isCollapse);
    const indexActive = computed(() => root.$route.path);
    const backHome = () => root.$router.push({ name: 'Index', path: 'index' });
    return {
      routers,
      isCollapse,
      indexActive,
      backHome,
    };
  },
};
</script>

<style scoped lang="scss">
.close {
  .logo img {
    width: 30px;
  }
}
.open {
  .logo img {
    width: 92px;
  }
}
.logo {
  text-align: center;
  img {
    @include webkit(transition, width 0.4s ease 0s);
  }
}
svg {
  margin-right: 10px;
}
</style>
