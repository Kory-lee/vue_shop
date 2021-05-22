<script lang="tsx">
  import type { CSSProperties, PropType } from 'vue';

  import { computed, defineComponent, unref } from 'vue-demi';
  import { Tooltip } from 'ant-design-vue';
  import { useProviderContext } from '/@/components/Application';
  import { isArray, isString } from '/@/utils/is';
  import { InfoCircleOutlined } from '@ant-design/icons-vue';
  import { getPopupContainer } from '/@/utils';
  import { getSlot } from '/@/utils/helper/jsxHelper';

  export default defineComponent({
    name: 'BasicHelp',
    components: { Tooltip },
    props: {
      maxWidth: { type: String, default: '600px' },
      showIndex: Boolean,

      color: { type: String, default: '#ffffff' },
      fontSize: { type: String, default: '14px' },
      placement: { type: String, default: 'right' },
      absolute: Boolean,
      text: [Array, String] as PropType<string[] | string>,
      position: {
        type: [Object] as PropType<any>,
        default: () => ({
          position: 'absolute',
          left: 0,
          bottom: 0,
        }),
      },
    },
    setup(props, { slots }) {
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('basic-help');

      const getOverlayStyle = computed(
        (): CSSProperties => ({
          maxWidth: props.maxWidth,
        })
      );

      const getWrapStyle = computed(
        (): CSSProperties => ({
          color: props.color,
          fontSize: props.fontSize,
        })
      );

      const getMainStyle = computed(() => (props.absolute ? props.position : {}));

      const renderTitle = () => {
        const list = props.text;
        if (isString(list)) return <p>{list}</p>;
        if (isArray(list))
          return list.map((item, index) => (
            <p key={item}>
              {props.showIndex ? `${index + 1}` : ''}
              {item}
            </p>
          ));
        return null;
      };

      return () => (
        <Tooltip
          title={<div style={unref(getWrapStyle)}>{renderTitle()}</div>}
          overlayClassName={`${prefixCls}__wrap`}
          autoAdjustOverflow={true}
          overlayStyle={unref(getOverlayStyle)}
          placement={props.placement as 'left'}
          getPopupContainer={getPopupContainer}
        >
          <span class={prefixCls} style={unref(getMainStyle)}>
            {getSlot(slots) || <InfoCircleOutlined />}
          </span>
        </Tooltip>
      );
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-help';

  .@{prefix-cls} {
    display: inline-block;
    margin-left: 6px;
    font-size: 14px;
    color: @text-color-help-dark;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }

    &__wrap {
      p {
        margin-bottom: 0;
      }
    }
  }
</style>
