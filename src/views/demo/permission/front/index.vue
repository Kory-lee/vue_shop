<template>
  <PageWrapper
    title="前端权限示例"
    content-background
    content-class="p-4"
    content="由于刷新的时候会请求用户信息接口，会根据接口重置角色信息，所以刷新后界面会恢复原样，如果不需要，可以注释 src/layout/default/index内的获取用户信息接口"
  >
    <CurrentPermissionMode />
    <p>
      <span>当前角色</span>
      <a>{{ userStore.getRoleList }}</a>
    </p>
    <Alert show-icon class="mt-4" type="info" message="点击后请查看左侧菜单变化" />
    <div class="mt-4"
      ><span>权限切换(请先切换权限模式为前端角色权限模式): </span>
      <ButtonGroup>
        <Button :type="isSupper ? 'primary' : 'default'" @click="changeRole(RoleEnum.SUPER)"
          >{{ RoleEnum.SUPER }}
        </Button>
        <Button :type="isTest ? 'primary' : 'default'" @click="changeRole(RoleEnum.TEST)"
          >{{ RoleEnum.TEST }}
        </Button>
      </ButtonGroup>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue-demi';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';
  import { Alert, Button } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { usePermission } from '/@/hooks/web/usePermission';
  import CurrentPermissionMode from '/@/views/demo/permission/CurrentPermissionMode.vue';

  export default defineComponent({
    name: 'PermissionFrontDemo',
    components: { CurrentPermissionMode, ButtonGroup: Button.Group, Button, PageWrapper, Alert },
    setup() {
      const { changeRole } = usePermission();
      const userStore = useUserStore();

      return {
        userStore,
        RoleEnum,
        isSupper: computed(() => userStore.getRoleList.includes(RoleEnum.SUPER)),
        isTest: computed(() => userStore.getRoleList.includes(RoleEnum.TEST)),
        changeRole,
      };
    },
  });
</script>

<style lang="less" scoped>
  .demo {
    background-color: @component-background;
  }
</style>
