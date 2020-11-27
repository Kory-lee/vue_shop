<script lang="ts">
import { computed, defineComponent, h, ref, unref } from "vue";
import { Result, Button } from "ant-design-vue";
import { ExceptionEnum } from "/@/enums/exceptionEnums";
import { useI18n } from "/@/plugins/i18n";
import { useRoute } from "vue-router";
import NoDataImg from "/@/assets/img/exception/no-data.png";
interface MapValue {
  title: string;
  status?: string;
  subTitle: string;
  btnText?: string;
  icon?: string;
  handler?: (...args: any[]) => any;
}

export default defineComponent({
  name: "ErrorPage",
  props: {
    status: { type: Number, default: ExceptionEnum.PAGE_NOT_FOUND },
    title: { type: String },
    subTitle: { type: String },
    full: { type: Boolean, default: false },
  },
  setup(props) {
    const statusMapRef = ref(new Map<string | number, MapValue>());
    const { t } = useI18n("sys.exception");
    const { query } = useRoute();
    const getStatus = computed(() => {
      const { status } = query;
      // return Number(status) || props.status;
      return 10100;
    });
    const getMapValue = computed(() =>
      unref(statusMapRef).get(unref(getStatus))
    );

    const backLoginI18n = t("backLogin"),
      backHomeI18n = t("backHome");
    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
      title: "403",
      status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
      subTitle: t("subTitle403"),
      btnText: props.full ? backLoginI18n : backHomeI18n,
    });
    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
      title: "404",
      status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
      subTitle: t("subTitle404"),
      btnText: props.full ? backLoginI18n : backHomeI18n,
    });
    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_DATA, {
      title: t("noDataTitle"),
      subTitle: "",
      btnText: t("redo"),
      // handler:()=>redo(),
      icon: NoDataImg,
    });

    return () => {
      const { title, subTitle, btnText, status, handler, icon } =
        unref(getMapValue) || {};
      return h(
        Result,
        {
          class: "exception",
          status: status as any,
          title: props.title || title,
          subTitle: props.subTitle || subTitle,
        },
        {
          extra: () =>
            h(
              Button,
              { type: "primary", onClick: handler },
              { default: () => btnText }
            ),
          icon: () => (icon ? h("img", { src: icon }) : null),
        }
      );
    };
  },
});
</script>

<style></style>
