import { Button as AntButton, Form, Input, Spin } from 'ant-design-vue';
import { App, ref, watch } from 'vue';

// 是否登录成功进入主页面的状态,来判断是否注入全局组件
export const status = ref(false);

const compList = [AntButton];
export default {
  install(app: App<Element>) {
    compList.forEach((com: any) => {
      app.component(com.name || com.display, com);
    });
    // watch(status, (val) => val && console.log('now install'));
  },
};
