import { ComponentInternalInstance, computed, CSSProperties, unref } from 'vue';

export default function useMenuItem(instance: ComponentInternalInstance | null) {
  const getParentMenu = computed(() => findParentMenu(['Menu', 'SubMenuItem'])),
    getParentRootMenu = computed(() => findParentMenu(['Menu'])),
    getParentSubMenu = computed(() => findParentMenu(['SubMenuItem']));

  const getItemStyle = computed(
    (): CSSProperties => {
      let parent = instance?.parent;
      if (!parent) return {};
      const indentSize = (unref(getParentRootMenu)?.props.indentSize as number) ?? 20;
      let padding = indentSize;
      if (unref(getParentRootMenu)?.props.collapse) padding = indentSize;
      else {
        while (parent && parent.type.name !== 'Menu') {
          if (parent.type.name === 'SubMenuItem') padding += indentSize;
          parent = parent.parent;
        }
      }
      return { paddingLeft: padding + 'px' };
    }
  );

  function findParentMenu(name: string[]) {
    let parent = instance?.parent;
    if (!parent) return null;
    while (parent && !name.includes(parent.type.name!)) {
      parent = parent.parent;
    }
    return parent;
  }

  function getParentList() {
    let parent = instance;
    if (!parent) return { uidList: [], list: [] };
    const ret: ComponentInternalInstance[] = [];
    while (parent && parent.type.name !== 'Menu') {
      if (parent.type.name === 'subMenuItem') ret.push(parent);
      parent = parent.parent;
    }
    return {
      uidList: ret.map((item) => item.uid),
      list: ret,
    };
  }
  function getParentInstance(instance: ComponentInternalInstance, name = 'SubMenuItem') {
    let parent = instance.parent;
    while (parent) {
      if (parent.type.name !== name) return parent;
      parent = parent.parent;
    }
    return parent;
  }

  return {
    getParentMenu,
    getParentRootMenu,
    getParentList,
    getParentSubMenu,
    getItemStyle,
    getParentInstance,
  };
}
