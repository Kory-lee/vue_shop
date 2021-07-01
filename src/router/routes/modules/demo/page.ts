import { useI18n } from '/@/i18n/useI18n';
import { LAYOUT } from '/@/router/constant';
import { AppRouteModule } from '/@/router/types';

const { t } = useI18n();
const page: AppRouteModule = {
  path: '/page-demo',
  name: 'PageDemo',
  component: LAYOUT,
  redirect: '/page-demo/exception',
  meta: { icon: 'mdi:page-next-outline', title: t('') },
  children: [],
};
export default page;
