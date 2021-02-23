import { Button, Form, Input, Spin } from 'ant-design-vue';
import { App, ref, watch } from 'vue';

// 是否登录成功进入主页面的状态,来判断是否注入全局组件
export const status = ref(false);

export default {
  install(app: App<Element>) {
    app.use(Form).use(Input).use(Button).use(Spin);
    watch(status, (val) => val && console.log('now install'));
  },
};
export const registerGlobalComponents = () => {};
