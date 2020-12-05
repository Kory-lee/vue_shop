import { PropType } from 'vue';
import { DropMenu } from './types';

export const basicDropdownProps = {
  dropMenuList: { type: Array as PropType<DropMenu[]>, default: () => [] },
  selectedKeys: { type: Array as PropType<string[]>, default: () => [] },
};
