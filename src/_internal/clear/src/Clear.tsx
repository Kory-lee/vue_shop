import type { PropType } from 'vue';
import { toRef, defineComponent } from 'vue';
import useStyle from '/@/_mixins/use-style';
import style from './styles/index.cssr';
import useConfig from '/@/_mixins/use-config';
import IconSwitchTransition from '/@/_internal/icon-switch-transition/src/IconSwitchTransition';
import { BaseIcon } from '/@/_internal/icon';
import ClearIcon from '/@/_internal/icons/Clear';

export default defineComponent({
  name: 'BaseClear',
  props: {
    clsPrefix: {
      type: String,
      required: true,
    },
    show: { type: Boolean, default: false },
    onClear: Function as PropType<(e: MouseEvent) => void>,
  },
  setup(props) {
    useStyle('BaseClear', style, toRef(props, 'clsPrefix'));
    const { KConfigProvider } = useConfig();
    return {
      KConfigProvider,
      handleMousedown(e: MouseEvent) {
        e.preventDefault();
      },
    };
  },
  render({ clsPrefix }) {
    return (
      <div class={`${clsPrefix}-base-clear`}>
        <IconSwitchTransition>
          {{
            default: () =>
              this.show ? (
                <BaseIcon
                  clsPrefix={clsPrefix}
                  key="dismiss"
                  class={`${clsPrefix}-base-clear__clear`}
                  onClick={this.onClear}
                  onMousedown={this.handleMousedown}
                  data-clear
                >
                  {{
                    default: () => <ClearIcon />,
                  }}
                </BaseIcon>
              ) : (
                <div key="icon" class={`${clsPrefix}-base-clear__placeholder`}>
                  {this.$slots}
                </div>
              ),
          }}
        </IconSwitchTransition>
      </div>
    );
  },
});
