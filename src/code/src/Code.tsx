import {
  defineComponent,
  PropType,
  CSSProperties,
  computed,
  ref,
  onMounted,
  watch,
  unref,
} from 'vue';
import { codeLight, CodeTheme } from '../styles';
import useConfig from '/@/_mixins/use-config';
import useHljs, { Hljs } from '/@/_mixins/use-hljs';
import useTheme, { ThemeProps } from '/@/_mixins/use-theme';
import style from './styles/index.cssr';

const codeProps = {
  ...(useTheme.props as ThemeProps<CodeTheme>),
  language: String,
  code: {
    type: String,
    default: '',
  },
  trim: {
    type: Boolean,
    default: true,
  },
  hljs: Object as PropType<Hljs>,
  uri: Boolean,
  inline: Boolean,
  wordWrap: Boolean,
  internalFontSize: Number,
  internalNoHighlight: Boolean,
};

function createCodeHtml(
  language: string,
  code: string,
  hljs: Hljs | undefined,
  trim: boolean
): string | null {
  if (!hljs) return null;
  if (!(language && hljs.getLanguage(language))) return null;
  return hljs.highlight(trim ? code.trim() : code, {
    language,
  }).value;
}

export default defineComponent({
  name: 'Code',
  props: codeProps,
  setup(props, { slots }) {
    const { internalNoHighlight } = props;
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig();
    const codeRef = ref<HTMLElement | null>(null);
    const hljsRef = internalNoHighlight ? { value: undefined } : useHljs(props);
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut, fontFamilyMono },
        self: {
          textColor,
          fontSize,
          fontWeightStrong,
          // extracted from hljs atom-one-light.scss
          'mono-3': $1,
          'hue-1': $2,
          'hue-2': $3,
          'hue-3': $4,
          'hue-4': $5,
          'hue-5': $6,
          'hue-5-2': $7,
          'hue-6': $8,
          'hue-6-2': $9,
        },
      } = themeRef.value;
      return {
        '--bezier': cubicBezierEaseInOut,
        '--font-family': fontFamilyMono,
        '--font-size': fontSize,
        '--font-weight-strong': fontWeightStrong,
        '--textColor': textColor,
        '--mono-3': $1,
        '--hue-1': $2,
        '--hue-2': $3,
        '--hue-3': $4,
        '--hue-4': $5,
        '--hue-5': $6,
        '--hue-5-2': $7,
        '--hue-6': $8,
        '--hue-6-2': $9,
      } as CSSProperties;
    });

    const themeRef = useTheme('Code', 'Code', style, codeLight, props, mergedClsPrefixRef);

    function setCode() {
      if (slots.default) return;
      const { value: codeEl } = codeRef;
      if (!codeEl) return;
      const { language } = props;
      const code = props.uri ? window.decodeURIComponent(props.code) : props.code;
      if (language) {
        const html = createCodeHtml(language, code, hljsRef.value, props.trim);
        if (html !== null) {
          codeEl.innerHTML = props.inline ? html : `<pre>${html}</pre>`;
          return;
        }
      }
      if (props.inline) {
        codeEl.textContent = code;
        return;
      }
      const maybePreEl = codeEl.children[0];
      if (maybePreEl && maybePreEl.tagName === 'PRE') {
        maybePreEl.innerHTML = code;
      } else {
        const wrap = document.createElement('pre');
        wrap.textContent = code;
        codeEl.innerHTML = '';
        codeEl.appendChild(wrap);
      }
    }
    onMounted(setCode);
    watch(() => props.language, setCode);
    watch(() => props.code, setCode);
    if (!internalNoHighlight) watch(hljsRef, setCode);
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
    };
  },
  render() {
    const { wordWrap } = this;
    return (
      <code
        class={[
          `${this.mergedClsPrefix}-code`,
          wordWrap && `${this.mergedClsPrefix}-code-word-wrap`,
        ]}
        style={this.cssVars}
        ref="codeRef"
      >
        {this.$slots}
      </code>
    );
  },
});
