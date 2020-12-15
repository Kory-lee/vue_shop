<template>
  <section class="full-loading" :class="absolute" v-show="loading" :style="style">
    <Spin v-bind="$attrs" :tip="tip" :size="size" :spinning="loading" />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import { ThemeEnum } from '/@/enums/configEnum';
import { SizeEnum } from '/@/enums/sizeEnum';
import { Spin } from 'ant-design-vue';
export default defineComponent({
  name: 'Loading',
  components: { Spin },
  props: {
    tip: { type: String as PropType<string>, default: '' },
    size: {
      type: String as PropType<SizeEnum>,
      default: SizeEnum.LARGE,
      validator: (v: SizeEnum): boolean =>
        [SizeEnum.DEFAULT, SizeEnum.SMALL, SizeEnum.LARGE].includes(v),
    },
    loading: { type: Boolean, default: false },
    absolute: { type: Boolean, default: false },
    background: { type: String },
    theme: { type: String as PropType<'dark' | 'light'>, default: 'light' },
  },
  setup(props) {
    const style = computed(
      (): CSSProperties => {
        const { background, theme } = props;
        const bgColor = background
          ? background
          : theme === ThemeEnum.DARK
          ? 'rgba(0, 0, 0, 0.2)'
          : 'rgba(240, 242, 245, 0.4)';
        return { background: bgColor };
      }
    );
    return { style };
  },
});
</script>

<style lang="less" scoped>
.full-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.absolute {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;
  }
}
</style>
