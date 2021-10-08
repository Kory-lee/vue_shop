import { useGlobalSetting } from '/@/hooks/setting';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useTitle as usePageTitle } from '@vueuse/core';
import { unref, watch } from 'vue';
import { REDIRECT_NAME } from '/@/router/constant';

export function useTitle() {
  const { title } = useGlobalSetting();
  const { t } = useI18n();
  const { currentRoute } = useRouter();

  const pageTitle = usePageTitle();
  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute);

      if (route.name === REDIRECT_NAME) return;
      const tTitle = t(route?.meta?.title as string);
      pageTitle.value = tTitle ? ` ${tTitle} - ${title}` : title;
    },
    { immediate: true }
  );
}
