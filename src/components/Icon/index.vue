<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  h,
  nextTick,
  onMounted,
  ref,
  unref,
  watch,
} from 'vue';
import Iconify from '@purge-icons/generated';
import { isString } from '/@/utils/is';
export default defineComponent({
  name: 'Icon',
  props: {
    icon: { type: String },
    color: { type: String },
    size: {
      type: [String, Number],
      default: 16,
    },
    prefix: { type: String, default: '' },
  },
  setup(props, { attrs }) {
    // const data
    const elRef = ref<ElRef>(null);
    const getIconRef = computed(() => `${props.prefix ? `${props.prefix}:` : ''}${props.icon}`);
    const update = async () => {
      const el = unref(elRef);
      if (el) {
        await nextTick();
        const icon = unref(getIconRef);
        const svg = Iconify.renderSVG(icon, {});

        if (svg) {
          el.textContent = '';
          el.appendChild(svg);
        } else {
          const span = document.createElement('span');
          span.className = 'iconify';
          span.dataset.icon = icon;
          el.textContent = '';
          el.appendChild(span);
        }
      }
    };
    const getWrapStyle = computed(
      (): CSSProperties => {
        const { size, color } = props;
        let fs = size;
        if (isString(size)) fs = parseInt(size, 10);
        return { fontSize: `${fs}px`, color, display: 'inline-flex' };
      }
    );
    watch(() => props.icon, update, { flush: 'post' });
    onMounted(update);
    return () =>
      h('span', {
        ref: elRef,
        class: [attrs.class, 'app-iconify anticon'],
        style: unref(getWrapStyle),
      });
  },
});
</script>

<style lang="less">
@import (reference) '../../styles/index';
.ant-iconify {
  display: inline-block;
  vertical-align: middle;
}
span.iconify {
  display: block;
  min-width: 1em;
  min-height: 1em;
  background: @iconify-bg-color;
  border-radius: 100%;
}
</style>
