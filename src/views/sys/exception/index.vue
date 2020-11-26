<script lang="ts">
import { defineComponent, h, ref, unref } from "vue";
import { Result } from "ant-design-vue";
import { ExceptionEnum } from "/@/enums/exceptionEnums";
interface MapValue {
  title: string;
  subTitle: string;
  btnText?: string;
  icon?: string;
  handler?: Function;
  status?: string;
}

export default defineComponent({
  name: "ErrorPage",
  props: {
    status: { type: Number, default: ExceptionEnum.PAGE_NOT_FOUND },
    title: { type: String },
    subTitle: { type: String },
    full: { type: Boolean, default: false },
  },
  setup() {
    const statusMapRef = ref(new Map<string | number, MapValue>());

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
      title: "403",
      status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
      subTitle: "403",
      // btnText:props.full? bac
    });
    console.log(statusMapRef.value);

    return () => h(Result, { class: "exception", status: "error" });
  },
});
</script>

<style></style>
