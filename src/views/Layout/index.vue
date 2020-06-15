<template>
  <el-container :class="[menuStatus ? 'close' : 'open']">
    <el-aside :width="[menuStatus ? '64px' : '200px']">
      <Nav />
    </el-aside>
    <el-container>
      <el-header height="75px"><Header /></el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Nav from '@components/Nav';
import Header from '@components/Header';

import { computed } from '@vue/composition-api';
export default {
  name: 'layout',
  components: { Nav, Header },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse);
    return {
      menuStatus,
    };
  },
};
</script>

<style scoped lang="scss">
.el-aside {
  overflow: hidden;
  box-sizing: content-box;
  @include webkit(transition, width 0.4s ease 0s);
}
.el-header {
  line-height: 75px;
  box-sizing: border-box;
  padding: 0;
  background-color: #fff;
  /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
  @include webkit(box-shadow, 0 3px 16px 0px rgba(0, 0, 0, 0.1));
}
</style>
