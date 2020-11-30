import type { App, DefineComponent } from 'vue';
import { default as Button } from './Button';
const components = [Button];

const install = (app: App<Element>) =>
  components.map((component: DefineComponent<{}, {}, any>) =>
    app.component(component.name, component)
  );

export { install, Button };
export default { install };
