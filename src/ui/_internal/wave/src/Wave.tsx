import { defineComponent, nextTick, ref, toRef, onBeforeUnmount } from 'vue';
import useStyle from '/@/ui/_mixins/use-style';
import style from './styles/index.cssr';

export interface BaseWaveRef {
  play: () => void;
}

export default defineComponent({
  name: 'BaseWave',
  props: {
    clsPrefix: { type: String, required: true },
  },
  setup(props) {
    useStyle('BaseStyle', style, toRef(props, 'clsPrefix'));
    const selfRef = ref<HTMLElement | null>(null);
    const activeRef = ref(false);

    let animationTimerId: number | null = null;
    onBeforeUnmount(() => {
      if (!animationTimerId) return;
      window.clearTimeout(animationTimerId);
    });
    return {
      active: activeRef,
      selfRef,
      play() {
        if (animationTimerId !== null) {
          window.clearTimeout(animationTimerId);
          activeRef.value = false;
          animationTimerId = null;
        }
        void nextTick(() => {
          void selfRef.value?.offsetHeight;
          activeRef.value = true;
          animationTimerId = window.setTimeout(() => {
            activeRef.value = false;
            animationTimerId = null;
          });
        });
      },
    };
  },
  render({ clsPrefix }) {
    return (
      <div
        ref="selfRef"
        aria-hidden
        class={[`${clsPrefix}-base-wave`, this.active && `${clsPrefix}-base-wave--active`]}
      />
    );
  },
});
