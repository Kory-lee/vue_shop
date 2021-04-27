<template>
  <li :class="getClass" :style="getCollapse ? {} : getItemStyle" @click.stop="handleClickItem">
    <Tooltip v-if="showTooltip" placement="right">
      <template #title>
        <slot name="title" />
      </template>
      <div :class="`${prefixCls}-tooltip`"> <slot /> </div>
    </Tooltip>

    <template v-else>
      <slot />
      <slot name="title" />
    </template>
  </li>
</template>

<script lang="ts">
  import { Tooltip } from 'ant-design-vue';
  import { computed, defineComponent, getCurrentInstance, PropType, ref, unref, watch } from 'vue';
  import useMenuItem from './useMenu';
  import { useSimpleRootMenuContext } from '../useSimpleMenuContext';
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
            [`${prefixCls}-item-disabled`]: props.disabled,
          },
        ]),
        getCollapse = computed(() => unref(getParentRootMenu)?.props.collapse as boolean),
        showTooltip = computed(
          () => unref(getParentMenu)?.type.name === 'Menu' && unref(getCollapse) && !!slots.title
        );

      function handleClickItem() {
        if (props.disabled) return;

        rootMenuEmitter.emit('on-menu-item-select', props.name);
        if (unref(getCollapse)) return;

        const { uidList } = getParentList();
        rootMenuEmitter.emit('on-update-opened', {
          opened: false,
          parent: instance?.parent,
          uidList,
        });
      }

      watch(
        activeName,
        (name: string) => {
          console.log(name);
          if (name === props.name) {
            const { list, uidList } = getParentList();
            active.value = true;
            list.forEach((item) => {
              if (item.proxy) (item.proxy as any).active = true;
            });
            rootMenuEmitter.emit('on-update-active-name:submenu', uidList);
          } else {
            active.value = false;
          }
        },
        { immediate: true }
      );
      return { getClass, prefixCls, getItemStyle, getCollapse, handleClickItem, showTooltip };
    },
  });
</script>
