import type { App } from "vue";
import Button from "./button.vue";
Button.install = function (app: App<Element>) {
  app.component(Button.name, Button);
};
export default Button;
