import { Spin } from 'ant-design-vue';
import { defineAsyncComponent, h, resolveComponent } from 'vue';
import { noop } from '../common';

interface Options {
  size?: 'default' | 'small' | 'large';
  delay?: number;
  timeout?: number;
  loading?: boolean;
  retry?: boolean;
}
// TODO
export default function createAsyncComponent(loader: Fn, options: Options = {}) {
  const { size = 'small', delay = 100, timeout = 30000, loading = false, retry = true } = options;
  return defineAsyncComponent({
    loader,
    loadingComponent: loading
      ? h(resolveComponent('ASpin') || Spin, { spinning: true, size: size })
      : undefined,
    timeout,
    delay,
    onError: !retry
      ? noop
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) retry();
          else fail();
        },
  });
}
