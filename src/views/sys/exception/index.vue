<script lang="ts">
import { computed, defineComponent, h } from 'vue';
import { Result, Button } from 'ant-design-vue';
import { ExceptionEnum } from '/@/enums/exceptionEnum';
import { useI18n } from '/@/plugins/i18n';
import { useRoute } from 'vue-router';
import { useGo, useRefresh } from '/@/hooks/web/usePage';
import NoDataImg from '/@/assets/img/exception/no-data.png';
import netWorkImg from '/@/assets/img/exception/net-work.png';
import { PageEnum } from '/@/enums/PageEnum';
interface MapValue {
  title: string;
  status?: string;
  subTitle: string;
  btnText?: string;
  icon?: string;
  handler?: (...args: any[]) => any;
}

export default defineComponent({
  name: 'ErrorPage',
  props: {
    status: { type: Number, default: ExceptionEnum.PAGE_NOT_FOUND },
    title: { type: String },
    subTitle: { type: String },
    full: { type: Boolean, default: false },
  },
  setup(props) {
    const statusMapRef = new Map<string | number, MapValue>();
    const { t } = useI18n('sys.exception'),
      route = useRoute(),
      refresh = useRefresh(),
      go = useGo();

    const getStatus = computed(() => {
        const status = Number(route.query.status);
        if ([403, 404, 500, 10100, 10000].includes(status)) return status;
        return props.status;
      }),
      getMapValue = computed(() => statusMapRef.get(getStatus.value));

    const backLoginI18n = t('backLogin'),
      backHomeI18n = t('backHome');
    statusMapRef
      .set(ExceptionEnum.PAGE_NOT_ACCESS, {
        title: '403',
        status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
        subTitle: t('subTitle403'),
        btnText: props.full ? backLoginI18n : backHomeI18n,
        handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
      })
      .set(ExceptionEnum.PAGE_NOT_FOUND, {
        title: '404',
        status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
        subTitle: t('subTitle404'),
        btnText: props.full ? backLoginI18n : backHomeI18n,
        handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
      })
      .set(ExceptionEnum.ERROR, {
        title: '500',
        status: `${ExceptionEnum.ERROR}`,
        subTitle: t('subTitle500'),
        btnText: backHomeI18n,
        handler: () => go(),
      })
      .set(ExceptionEnum.PAGE_NOT_DATA, {
        title: t('noDataTitle'),
        subTitle: '',
        btnText: t('refresh'),
        handler: () => refresh(),
        icon: NoDataImg,
      })
      .set(ExceptionEnum.NET_WORK_ERROR, {
        title: t('networkErrorTitle'),
        subTitle: t('networkErrorSubTitle'),
        btnText: t('refresh'),
        icon: netWorkImg,
        handler: () => refresh(),
      });

    return () => {
      const { title, subTitle, btnText, status, handler, icon } = getMapValue.value || {};
      return h(
        Result,
        {
          class: 'exception',
          status: status as any,
          title: props.title || title,
          subTitle: props.subTitle || subTitle,
        },
        {
          extra: () => h(Button, { type: 'primary', onClick: handler }, { default: () => btnText }),
          icon: () => (icon ? h('img', { src: icon }) : null),
        }
      );
    };
  },
});
</script>

<style lang="less" scoped>
.exception {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
