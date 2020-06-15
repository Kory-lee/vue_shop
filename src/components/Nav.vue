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
  >
    <slot>
      <h1 class="logo">
        <img src="@assets/logo.png" alt />
      </h1>
    </slot>
    <template v-for="item in routers">
      <el-submenu :key="item.id" :index="item.path" v-if="!item.hidden">
        <!--一级菜单-->
        <template #title>
          <svg-icon :iconName="item.meta.icon" class="regular"></svg-icon>
          <span name="title">{{ item.meta.name }}</span>
        </template>
        <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{
          subItem.meta.name
        }}</el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
  <!-- </div> -->
</template>

<script>
import { reactive, computed } from '@vue/composition-api';
export default {
  name: 'layoutNav',
  setup(props, { root }) {
    const routers = reactive(root.$router.options.routes);
    const isCollapse = computed(() => root.$store.state.app.isCollapse);
    const indexActive = root.$route.path;
    const backHome = () => root.$router.push({ name: 'Console' });
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
// .logo {
//   text-align: center;
//   img {
//     @include webkit(transition, width 0.4s ease 0s);
//   }
// }
// .close {
//   .logo img {
//     width: 30px;
//   }
//   #nav-wrap {
//     width: $navMenuMin;
//   }
// }
// .open {
//   .logo img {
//     width: 92px;
//   }
//   #nav-wrap {
//     width: $navMenu;
//   }
// }
// #nav-wrap {
//   position: fixed;
//   top: 0;
//   left: 0;
//   @include webkit(transition, width 0.4s ease 0s);
// }
svg {
  margin-right: 10px;
}
</style>
