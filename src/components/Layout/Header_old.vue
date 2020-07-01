<template>
  <div id="header-wrap">
    <div class="header-icon" @click="navMenuState">
      <svg-icon iconName="menu" className="medium"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user-info">
        <div class="avatar"></div>
        <!-- <img src="@images/avatar.jpg" alt="" /> -->
        <div class="username">{{ username }}</div>
      </div>
      <div class="header-icon" @click="exitButton">
        <svg-icon iconName="exit" className="medium"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
export default {
  setup(props, { root }) {
    const username = computed(() => root.$store.state.login.username);
    const exitButton = () => {
      root
        .$confirm('确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          root.$store.dispatch('login/exit').then(() => {
            root.$router.push({ name: 'Login' });
            root.$notify({ title: '成功', message: '已成功退出', type: 'success' });
          });
        })
        .catch(() => {
          // root.$notify({ title: '', message: '已取消' });
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
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  height: 75px;
  line-height: 75px;
  box-sizing: border-box;
  background-color: #fff;
  /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
  @include webkit(box-shadow, 0 3px 16px 0px rgba(0, 0, 0, 0.1));
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @include webkit(transition, left 0.4s ease 0s);
}
.open #header-wrap {
  left: $navMenu;
}
.close #header-wrap {
  left: $navMenuMin;
}
.header-icon {
  padding: 0 32px;
  height: 75px;
  line-height: 75px;
  svg {
    margin-bottom: -8px;
    cursor: pointer;
  }
}
.pull-right {
  display: flex;
  justify-content: space-between;
}
.user-info {
  border-right: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
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
}
</style>
