import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/zh_CN';

const modules = import.meta.globEager('./zh_CN/**/*.ts');

export default {
  message: {
    ...genMessage(modules, 'zh_CN'),
    antdLocale,
  },
};
