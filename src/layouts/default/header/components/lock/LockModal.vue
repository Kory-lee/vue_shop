<template>
  <BasicModal>
    <div></div>
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue-demi';
  import BasicModal from '/@/components/Modal/src/BasicModal.vue';
  import { useI18n } from 'vue-i18n';
  import { useProviderContext } from '/@/components/Application';
  import { useUserStore } from '/@/store/modules/user';
  import { useLockStore } from '/@/store/modules/lock';
  import { useModalInner } from '/@/components/Modal/src/hooks/useModal';
  import headerImg from '/@/assets/img/logo.png';

  export default defineComponent({
    name: 'LockModal',
    components: { BasicModal },
    setup() {
      const { t } = useI18n(),
        { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('header-lock-modal');

      const useStore = useUserStore(),
        lockStore = useLockStore();

      const getRealName = computed(() => useStore.getUserInfo?.realName);
      const [register, { closeModal }] = useModalInner();

      async function handleLock() {
        closeModal();

        lockStore.setLockInfo({ isLock: true, pwd: '1321' });
      }

      const avatar = computed(() => useStore.getUserInfo?.avatar || headerImg);
      return { t, prefixCls, getRealName, register, handleLock, avatar };
    },
  });
</script>

<style scoped></style>
