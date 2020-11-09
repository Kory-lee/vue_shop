import { Button, Form, Input } from "ant-design-vue";
import type { App } from "vue";

export default {
  install(app: App<Element>) {
    app.use(Form).use(Input).use(Button);
  },
};
