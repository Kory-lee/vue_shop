import type { App } from 'vue';

type ComponentType = any;

interface CreateOptions {
  components?: ComponentType[];
  componentPrefix?: string;
}

export interface KUiInstance {
  install: (app: App) => void;
  componentPrefix: string;
}

export default function create({
  componentPrefix = 'K',
  components = [],
}: CreateOptions = {}): KUiInstance {
  const installTarget: App[] = [];

  function registerComponent(app: App, name: string, component: ComponentType): void {
    const registered = app.component(componentPrefix + name);
    if (!registered) app.component(componentPrefix + name, component);
  }

  function install(app: App): void {
    if (installTarget.includes(app)) return;
    installTarget.push(app);
    components.forEach((component) => {
      const { name, alias } = component;
      registerComponent(app, name, component);
      if (alias?.length) {
        alias.forEach((aliasName) => {
          registerComponent(app, aliasName, component);
        });
      }
    });
  }
  return {
    componentPrefix,
    install,
  };
}
