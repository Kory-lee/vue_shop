<template>
  <li :class="getClass">
    <Tooltip placement="right">
      <template #title>
        <slot name="title" />
      </template>
    </Tooltip>
  </li>
</template>

<script lang="ts">
  import { Tooltip } from 'ant-design-vue';
  import { computed, defineComponent, getCurrentInstance, PropType, ref, unref, watch } from 'vue';
  import useMenuItem from './useMenuItem';
  import { useSimpleRootMenuContext } from './useSimpleMenuContext';
  import { useProviderContext } from '/@/components/Application';

  export default defineComponent({
    name: 'MenuItem',
    components: { Tooltip },
    props: {
      name: { type: [String, Number] as PropType<string | number>, required: true },
      disabled: Boolean,
    },
    setup(props, { slots }) {
      const instance = getCurrentInstance(),
        active = ref(false),
        { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('menu'),
        { rootMenuEmitter, activeName } = useSimpleRootMenuContext(),
        { getItemStyle, getParentList, getParentMenu, getParentRootMenu } = useMenuItem(instance),
        getClass = computed(() => [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: unref(active),
            [`${prefixCls}-item-selected`]: unref(active),
            [`${prefixCls}-item-disabled`]: !!props.disabled,
          },
        ]),
        getCollapse = computed(() => unref(getParentRootMenu)?.props.collapse),
        showTooptip = computed(
          () => unref(getParentMenu)?.type.name === 'Menu' && unref(getCollapse) && slots.title
        );
      function handleClickItem() {
        if (props.disabled) return;
        const { uidList } = getParentList();
        rootMenuEmitter.emit('on-update-opened', {
          opened: false,
          parent: instance?.parent,
          uidList,
        });
      }

      watch(activeName, (name: string) => {});
      return { getClass };
    },
  });
</script>

<style lang="less"></style>
