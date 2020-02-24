<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../assets/Vue-logo.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div :class="'el-icon-s-' + (isCollapse?'unfold':'fold')" @click="toggleCollapse"></div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu v-for="item in menuList" :key="item.id" :index="item.id+''">
            <template slot="title">
              <i :class="'el-icon-' + iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧内容主题 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menuList: [],
      iconsObj: {
        125: 'user-solid',
        103: 's-platform',
        101: 's-goods',
        102: 's-order',
        145: 's-marketing'
      },
      isCollapse: false,
      activePath: '' // 被激活的活动地址
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  computed: {},
  methods: {
    logout() {
      window.sessionStorage.clear()
      // this.$router.push('./Login')
      this.$router.replace('/')
    },
    // 左侧菜单数据获取
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.metaa.msg)
      this.menuList = res.data
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
.home_container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  font-size: 20px;
  color: #eaedf1;
  > div {
    display: flex;
    align-items: center;
  }
  img {
    width: 46px;
    height: 46px;
  }
}
.el-aside {
  background-color: #373d41;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.el-icon-s-fold,
.el-icon-s-unfold {
  background-color: #4a5064;
  font-size: 30px;
  line-height: 38px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  height: 36px;
  width: 100%;
}
</style>
