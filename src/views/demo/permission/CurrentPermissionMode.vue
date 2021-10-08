<template>
  <div class="mt-2">
    <span>当前权限模式: </span>
    <Button class="ml-4">{{ isBackPermissionMode ? '后台权限模式' : '前端角色权限模式' }}</Button>
    <Button class="ml-4" @click="togglePermissionMode" type="primary">切换权限模式</Button>
    <Divider />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Button, Divider } from 'ant-design-vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import useConfigStore from '/@/store/modules/config';
  import { PermissionModeEnum } from '/@/enums/configEnum';

  export default defineComponent({
    name: 'CurrentPermissionMode',
    components: { Divider, Button },
    setup() {
      const configStore = useConfigStore();
      const isBackPermissionMode = computed(
        () => configStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK
      );
      const { togglePermissionMode } = usePermission();
      return {
        togglePermissionMode,
        PermissionModeEnum,
        isBackPermissionMode,
      };
    },
  });
</script>
