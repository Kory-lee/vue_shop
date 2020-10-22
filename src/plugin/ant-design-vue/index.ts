import type { App } from "vue";
import { Form, Input, Button } from "ant-design-vue";

export default {
  install(app: App<Element>) {
    app.use(Form).use(Input).use(Button);
  },
};
