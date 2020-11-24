import { Button, Col, Form, Input, Row } from "ant-design-vue";
import type { App } from "vue";

export default {
  install(app: App<Element>) {
    app.use(Form)
    .use(Input)
    .use(Col)
    .use(Row)
    .use(Button);
  },
};
