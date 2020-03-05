# 电商后台管理系统(前端项目)

## 功能

> 用于管理用户账号,商品分类,商品信息,订单,数据统计等业务功能

![简单功能](https://gitee.com/kory923033576/vue_shop/raw/master/img/mall_desc01.png)

## 开发模式

> 电商后台管理系统整体采用前后端分离的开发模式，其中前端是基于 Vue 技术栈的 SPA 项目

![开发模式](../vue_shop/img/mall_desc02.png)

## 技术类型

### 前端项目技术栈

- `vue`
- `vue-router`
- `Element-UI`
- `Axios`
- `Echarts`

### 后端项目技术栈

- Node.js
- Express
- JWT
- Mysql
- sequelize

[接口文档](./API 接口文档.md)

## 项目初始化

### 前端项目初始化步骤

1. 安装 `Vue` 脚手架
2. 通过 `Vue-cli` 创建项目
3. 配置 `vue-router`
4. 配置 `Element-UI` 组件库
5. 配置 `Axios` 库
6. 初始化 git 远程仓库

## 登录概述

### 登录业务流程

1. 在登陆界面输入用户名和密码
2. 调用接口进行验证
3. 通过验证之后,根据后台的相应状态跳转到项目主页

### 登录业务相关技术点

1. http 是无状态的
2. 通过 cookie 在客户端记录状态
3. 通过 session 在客户端记录状态
4. 通过 token 维持状态(不允许跨域状态)

![登陆业务](../vue_shop/img/mall_desc04.png)

### 登陆界面布局

- 路由导航控制访问权限

> 如果用户没有登陆,但是直接通过 URL 访问特定页面,需要重新导航到登录界面

```js
//为路由对象添加beforeEach导航守卫
router.beforeEach((to,from,next){
  // 如果用户访问登录页直接放行
  if(to.path=== 'login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果没有token,强制跳转到登录页
  if(!tokenStr) return next('/login')
  next()
})
```

### 主页布局

#### 通过接口获取数据 axios

```js
axios.interceptor.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
```

### 权限管理

#### 权限管理业务分析

> 通过权限管理模块控制不同的用户可以进行哪些操作,具体可以通过角色的方式进行控制,及每一个用户分配一个特定的角色,角色包括不同的权限

![mall_desc05](../vue_shop/img/mall_desc05.png)

### 分类管理

> 商品分类用户在购物时,快速找到需要购买的商品,进行直观展示

### 参数管理

> 商品参数用于显示商品的特征信息,可以通过电商平台详情页面直观的看到

### 项目所用依赖(vue 全家桶不描述)

1. 运行依赖

- `axios` => 发送请求
- `echart`=> 图表
- `element-ui` => element ui 组件
- `lodash` => js 工具库,该项目用到深拷贝与对象合并
- `moment`=> 时间处理工具库
- `nprogress` => 进度条库
- `v-viewer`=> 图片预览工具库
- `vue-quill-editor` => 富文本编辑器
- `vue-table-with-tree-grid` => 树形菜单/表格

1. 开发依赖

- babel => es6+语法转换
- `eslint/babel-eslint`=> 语法检查
- `less/less-loader` => less 语法
- `babel-plugin-transform-remove-console`=> 移除 console 插件

### 项目优化

### 项目优化策略

- 生成打包报告

  - 通过命令行参数形式生成报告=>vue-cli-service build --report
  - 通过可视化 ui 面板直接查看报告(通过控制台和分析面板)

- 通过 vue.config.js 修改 webpack 的默认配置

  > 通过 vue-cli 3.0 工具生成的项目,默认隐藏了所有 webpack 的配置项,目的是为了屏蔽项目的配置过程,让开发人员把工作的 重心,放在具体功能和业务逻辑的实现上

- 为开发模式与发布模式指定不同的打包入口

  > 默认情况下,vue 项目的开发与发布模式,共用同一个打包的入口文件(即 src/main.js),为了将项目的开发过程与发布过程分离,可以为两种模式,各自指定打包的入口文件,即:
  >
  > 1. 开发模式入口文件 src/main-dev.js
  > 2. 发布模式入口文件 src/main-prod.js
  >
  > 方案：configureWebpack(通过链式编程形式)和 chainWebpack(通过操作对象形式)
  >
  > 在 vue.config.js 导出的配置文件中,新增 configureWebpack 或 chainWebpack 节点,来自定义 webpack 的打包配置

  ```js
  // 代码示例
  module.exports = {
    chainWebpack: config => {
      // 发布模式
      config.when(process.env.NODE_ENV === 'production', config => {
        config
          .entry('app')
          .clear()
          .add('./src/main-prod.js')
      })
      // 开发模式
      config.when(process.env.NODE_ENV === 'development', config => {
        config
          .entry('app')
          .clear()
          .add('./src/main-dev.js')
      })
    }
  }
  ```

- 第三方库启用 CDN

  - 通过 externals 加载外部 cdn 资源

  > 默认情况下,通过 import 语法导入的第三方依赖包,最终会打包合并到同一个文件中,从而导致打包成功后,单文件体积过大的问题 => **chunk-vendors**体积过大
  >
  > 为了解决上述问题,可以通过 webpack 的 externals 节点,来配置加载外部的 cdn 资源,凡是声明在 externals 中的第三方依赖包,都不会被打包

- 首页内容定制

  > 不同打包环境下,首页内容可能会有所不同,通过插件方式定制

  - vue.config.js 配置

  ```
  config.plugin('html').tap(args => {
      args[0].isProd = true或false
      return args
  })
  ```

  - index.html 修改

  ```
  <!-- 开发模式:使用import,发布模式:使用cdn -->
  <title><%= htmlWebpackPlugin.options.isProd ? '' : 'dev-' %>vue-mall</title>
  <% if(htmlWebpackPlugin.options.isProd) { %>
      css | js放在这儿
  <% } %>
  ```

- Element-UI 组件按需加载

- 路由懒加载

  > 在打包构建项目时,javascript 包会变得特别大,影响页面加载,如果我们能把不同路由对应的组件分隔成不同的代码块,然后当路由被访问的时候才加载对应组件,这样更加高效

  - 安装@babel/plugin-syntax-dynamic-import 包
  - 在 babel.config.js 配置文件声明该插件
  - 将路由改为按需加载形式

  ```
  // 示例:
  const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
  const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
  const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')

  // import Login from '../components/Login.vue'
  const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login.vue')
  // import Home from '../components/Home.vue'
  const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
  // import Welcome from '../components/Welcome.vue'
  const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue')
  ...
  ```

### 项目上线

#### 通过 node 创建 web 服务器

> 新创建 node 项目,并安装 express,通过 express 快速创建 web 服务器,将 vue 打包生成的 dist 文件夹,托管为静态资源即可,关键代码如下

```
// 1. npm init -y
// 2. npm i express -S
// 3. 将打包后的dist放入node项目中
// 4.
const express = require('express')
const app = express()

app.use(express.static('./dist'))
app.listen(80, () => {
    console.log('server runing at http://127.0.0.1')
})
// 5. node app.js启动项目
```

#### 开启 gzip 配置

> 通过 gzip 减小文件体积,使传输速度更快

##### 在服务器端使用 express 做 gzip 压缩,配置如下

```
// 1.npm install compression -S
// 2.导入包
const compression = require('compression')
// 3.启用中间件
app.use(compression())
```

#### 配置 https 服务

> 申请 ssl 证书(https://freessl.org) => 正常企业还是使用收费 ssh(http 协议默认运行在 80 端口,https 默认运行在 443 端口)
> ![img](https://mmbiz.qpic.cn/mmbiz_png/R5ic1icyNBNd7xWCpbK6ov8rlssLDRPJJKAJzXBq80MdQHDKoDS8EHm2WnKB4ibspCAg43Ndpk4V2ibIjYic2KtQLfQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 使用 pm2 管理应用

```js
1. npm i pm2 -g //全局安装
2. pm2 start 脚本(如./app.js) --name 自定义名称 // 启动项目
3. pm2 ls //查看服务器运行的项目
4. pm2 restart 自定义名称 //重启项目
5. pm2 stop 自定义名称 //停止项目
6. pm2 delete 自定义名称 //删除项目
```
