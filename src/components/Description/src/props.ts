import type { PropType } from 'vue';
import type { DescItem } from './types';
import { CollapseContainerOptions } from '/@/components/Container';

export default {
  useCollapse: { type: Boolean as PropType<boolean>, default: true },
  title: { type: String, default: '' },
  size: { type: String as PropType<'small' | 'default' | 'middle' | undefined>, default: 'small' },
  bordered: { type: Boolean, default: true },
  column: {
    type: [Number, Object] as PropType<number | Recordable>,
    default: () => ({ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }),
  },
  collapseOptions: {
    type: Object as PropType<CollapseContainerOptions>,
    default: null,
  },
  schema: { type: Array as PropType<Array<DescItem>>, default: () => [] },
  data: Object,
};
