import Vue from 'vue'
import Router from 'vue-router'
const Order = () => import(/* webpackChunkName: 'Order-Report' */ './components/order/Order.vue')
const Report = () => import(/* webpackChunkName: 'Order-Report' */ './components/report/Report.vue')
const Add = () => import(/* webpackChunkName: 'cate_params_list_add' */ './components/goods/Add.vue')
const Cate = () => import(/* webpackChunkName: 'cate_params_list_add' */ './components/goods/Cate.vue')
const Params = () => import(/* webpackChunkName: 'cate_params_list_add' */ './components/goods/Params.vue')
const GoodsList = () => import(/* webpackChunkName: 'cate_params_list_add' */ './components/goods/List.vue')
const Login = () => import(/* webpackChunkName: 'login_home_welcome' */ './components/Login.vue')
const Home = () => import(/* webpackChunkName: 'login_home_welcome' */ './components/Home.vue')
const Welcome = () => import(/* webpackChunkName: 'login_home_welcome' */ './components/Welcome.vue')
const Roles = () => import(/* webpackChunkName: 'users_roles_rights' */ './components/power/Roles.vue')
const Users = () => import(/* webpackChunkName: 'users_roles_rights' */ './components/user/Users.vue')
const Rights = () => import(/* webpackChunkName: 'users_roles_rights' */ './components/power/Rights.vue')
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/users',
          component: Users
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/rights',
          component: Rights
        },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: GoodsList },
        { path: '/goods/add', component: Add },
        { path: '/orders', component: Order },
        { path: '/reports', component: Report }
      ]
    }
  ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // next()放行  next('/login')强制跳转
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  // 有必要向数据库查询token是否正确
  if (!tokenStr) return next('/login')
  next()
})
export default router
