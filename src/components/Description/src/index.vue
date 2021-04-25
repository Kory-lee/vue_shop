<script lang="tsx">
  import type { DescInstance, DescItem, DescOptions } from './types';
  import type { CSSProperties } from 'vue';
  import type { DescriptionsProps } from 'ant-design-vue/es/descriptions';
  import type { CollapseContainerOptions } from '/@/components/Container';

  import { Descriptions } from 'ant-design-vue';
  import { defineComponent, getCurrentInstance, ref, computed, unref } from 'vue';
  import props from './props';
  import { useProviderContext } from '/@/components/Application';
  import { isFunction } from '/@/utils/is';
  import { get } from 'lodash-es';
  import { CollapseContainer } from '/@/components/Container';

  export default defineComponent({
    name: 'Description',
    props,
    emits: ['register'],
    setup(props, { attrs, emit, slots }) {
      const propsRef = ref<Partial<DescOptions> | null>(null);

      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('description');

      const getMergeProps = computed(
        () =>
          ({
            ...props,
            ...(unref(propsRef) as Recordable),
          } as DescOptions)
      );

      /**
       * @description whether to setting title
       */
      const useWrapper = computed(() => !!unref(getMergeProps).title);

      const getCollapseOptions = computed(
        (): CollapseContainerOptions => ({
          canExpand: false,
          ...unref(getMergeProps).collapseOptions,
        })
      );

      console.log('attrs', attrs);
      console.log('instance.attrs', getCurrentInstance()?.attrs);

      function renderLabel({ label, labelMinWidth, labelStyle }: DescItem) {
        if (!labelStyle && !labelMinWidth) return label;

        const style: CSSProperties = {
          ...labelStyle,
          minWidth: `${labelMinWidth}px`,
        };
        return <div style={style}>{label}</div>;
      }

      function renderItem() {
        const { schema, data } = unref(getMergeProps);
        return unref(schema)
          .map((item) => {
            const { render, field, span, show, contentMinWidth } = item;
            if (show && isFunction(show) && !show(data)) return null;

            const getContent = () => {
              if (!data) return null;
              const getField = get(data, field);
              return isFunction(render) ? render(getField, data) : getField ?? '';
            };

            return (
              <Descriptions.Item span={span} key={field} label={renderLabel(item)}>
                {() => {
                  if (!contentMinWidth) return getContent();

                  const style: CSSProperties = { minWidth: `${contentMinWidth}px` };
                  return <div style={style}>{getContent()}</div>;
                }}
              </Descriptions.Item>
            );
          })
          .filter((item) => !!item);
      }

      const renderDesc = () => {
        // Descriptions内不需要放title
        const getDescriptionsProps = computed<DescriptionsProps>(() => ({
          ...unref(getMergeProps),
          title: undefined,
        }));

        return (
          <Descriptions class={prefixCls} {...(unref(getDescriptionsProps) as any)}>
            {renderItem()}
          </Descriptions>
        );
      };

      const renderContainer = () => {
        const content = props.useCollapse ? renderDesc() : <div>{renderDesc()}</div>;
        if (!props.useCollapse) return content;

        const { canExpand, helpMessage } = unref(getCollapseOptions);
        const { title } = unref(getMergeProps);
        return (
          <CollapseContainer title={title} canExpand={canExpand} helpMessage={helpMessage}>
            {{
              default: () => content,
              action: () => slots?.action?.(),
            }}
          </CollapseContainer>
        );
      };
      const methods: DescInstance = {
        setDescProps(descProps: Partial<DescOptions>) {
          propsRef.value = { ...(unref(propsRef) as Recordable), ...descProps } as Recordable;
        },
      };
      emit('register', methods);
      return () => (unref(useWrapper) ? renderContainer() : renderDesc());
    },
  });
</script>
