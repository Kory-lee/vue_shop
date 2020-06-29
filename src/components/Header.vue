<template>
  <div class="head">
    <div class="header-icon push-left" @click="navMenuState">
      <svg-icon icon-name="menu" class-name="medium"></svg-icon>
    </div>
    <div class="push-right">
      <div class="user-info">
        <el-dropdown trigger="click">
          <div class="username">
            <el-avatar><img src="../assets/images/avatar.jpg" alt="" /></el-avatar>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user-solid">{{ username }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="header-icon exit" @click="exitButton">
          <svg-icon icon-name="exit" class-name="medium"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
export default {
  setup(props, { root }) {
    const username = computed(() => root.$store.state.login.username);
    const exitButton = () =>
      root.$confirm({
        content: '确认退出?',
        fn: exitConfirm,
      });
    const exitConfirm = () => {
      root.$store.dispatch('login/exit').then(() => {
        root.$router.push({ path: '/login', name: 'Login' });
        root.$notify({ title: '成功', message: '已成功退出', type: 'success' });
      });
    };
    const navMenuState = () => {
      root.$store.commit('app/SET_COLLAPSE');
    };
    return {
      navMenuState,
      username,
      exitButton,
    };
  },
};
</script>

<style scoped lang="scss">
// .open #header-wrap {
//   left: $navMenu;
// }
// .close #header-wrap {
//   left: $navMenuMin;
// }

.head {
  position: relative;
  width: inherit;
  height: 100%;
}
.push-left {
  position: absolute;
  left: 0;
}
.push-right {
  position: absolute;
  right: 0;
  height: inherit;
  overflow: hidden;
}

.header-icon {
  padding: 0 32px;
  // height: 75px;
  // line-height: 75px;
  text-align: center;
  svg {
    margin-bottom: -8px;
    cursor: pointer;
  }
}
.exit {
  border-left: 1px solid #ededed;
  // margin-right: -10px;
}
.user-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  + .header-icon {
    padding: 0 28px;
  }
}
.avatar {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url($img) no-repeat center center;
  background-size: 38px auto, cover; // 或contain，解决图片拉伸
  // img标签下使用object-fit：
  // 1.fill 拉伸以适应 2.contain 添加黑边 3.cover 裁剪以适应 4. none
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 10%;
    width: 100%;
    height: 100%;
    background: inherit;
    background-size: 100% 100%;
    border-radius: 50%;
    transform: scale(0.95);
    z-index: -1;
    filter: blur(10px) brightness(80%) opacity(0.8);
  }
}
.username {
  padding: 0 32px 0 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
