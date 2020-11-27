import { ExceptionEnum } from "/@/enums/exceptionEnums";
import { useI18n } from "/@/plugins/i18n";
const { t } = useI18n("sys.exception");
export default function getData(props: any) {
  const data = {
    [ExceptionEnum.PAGE_NOT_ACCESS]: {
      title: "403",
      status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
      subTitle: t("subTitle403"),
      btnText: props.full,
    },
  };
  return { data };
}
