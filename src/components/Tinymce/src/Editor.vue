<template>
  <div :class="prefixCls" :style="{ width: containerWidth }">
    <ImgUpload
      v-if="showImageUpload"
      v-show="editorRef"
      :disabled="disabled"
      :fullscreen="fullscreen"
      @done="handleDone"
      @uploading="handleImageUploading"
    />
    <textarea
      v-if="!initOptions.inline"
      :id="tinymceId"
      ref="elRef"
      style="visibility: hidden"
    ></textarea>
    <slot v-else> </slot>
  </div>
</template>
<script lang="ts">
  import type { Editor, RawEditorSettings as RawEditorOptions } from 'tinymce';
  import type { PropType } from 'vue';

  import {
    computed,
    defineComponent,
    nextTick,
    onBeforeUnmount,
    onDeactivated,
    ref,
    unref,
    watch,
  } from 'vue-demi';
  import tinymce from 'tinymce/tinymce';
  import 'tinymce/themes/silver';
  import 'tinymce/icons/default/icons';
  import 'tinymce/plugins/advlist';
  import 'tinymce/plugins/anchor';
  import 'tinymce/plugins/autolink';
  import 'tinymce/plugins/autosave';
  import 'tinymce/plugins/code';
  import 'tinymce/plugins/codesample';
  import 'tinymce/plugins/directionality';
  import 'tinymce/plugins/fullscreen';
  import 'tinymce/plugins/hr';
  import 'tinymce/plugins/insertdatetime';
  import 'tinymce/plugins/link';
  import 'tinymce/plugins/lists';
  import 'tinymce/plugins/media';
  import 'tinymce/plugins/nonbreaking';
  import 'tinymce/plugins/noneditable';
  import 'tinymce/plugins/pagebreak';
  import 'tinymce/plugins/paste';
  import 'tinymce/plugins/preview';
  import 'tinymce/plugins/print';
  import 'tinymce/plugins/save';
  import 'tinymce/plugins/searchreplace';
  import 'tinymce/plugins/spellchecker';
  import 'tinymce/plugins/tabfocus';
  // import 'tinymce/plugins/table';
  import 'tinymce/plugins/template';
  import 'tinymce/plugins/textpattern';
  import 'tinymce/plugins/visualblocks';
  import 'tinymce/plugins/visualchars';
  import 'tinymce/plugins/wordcount';

  import ImgUpload from './ImgUpload.vue';
  import { buildShortUUID } from '/@/utils/uuid';
  import { getPrefixCls } from '/@/hooks/web/useDesign';
  import { isNumber } from '/@/utils/is';
  import { getDarkMode } from '/@/hooks/setting/useRootSetting';
  import { useLocale } from '/@/hooks/web/useLocale';
  import { LOCALE } from '/@/settings/localeSetting';
  import { isString } from 'lodash';
  import { bindHandlers } from './helper';
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActived';

  const plugins = [
    'advlist anchor autolink autosave code codesample  directionality  fullscreen hr insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus  template  textpattern visualblocks visualchars wordcount',
  ];

  const toolbar = [
    'fontsizeselect lineheight searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
    'hr bullist numlist link  preview anchor pagebreak insertdatetime media  forecolor backcolor fullscreen',
  ];

  const tinymceProps = {
    options: {
      type: Object as PropType<Partial<RawEditorOptions>>,
      default: () => ({}),
    },
    value: String,

    toolbar: {
      type: Array as PropType<string[]>,
      default: () => toolbar,
    },
    plugins: {
      type: Array as PropType<string[]>,
      default: () => plugins,
    },
    modelVlaue: String,
    height: {
      type: [Number, String] as PropType<string | number>,
      default: 400,
      required: false,
    },
    width: {
      type: [Number, String] as PropType<string | number>,
      default: 'auto',
      required: false,
    },
    showImageUpload: {
      type: Boolean,
      default: true,
    },
  };

  export default defineComponent({
    name: 'Tinymce',
    components: {
      ImgUpload,
    },
    inheritAttrs: false,
    props: tinymceProps,
    emits: ['change', 'update:modelValue', 'inited', 'init-error'],
    setup(props, { attrs, emit }) {
      const editorRef = ref<Nullable<Editor>>(null);
      const fullscreen = ref(false);
      const tinymceId = ref<string>(buildShortUUID('tiny-vue'));
      const elRef = ref<Nullable<HTMLElement>>(null);
      const prefixCls = getPrefixCls('tinymce-container');
      const tinymceContent = computed(() => props.modelVlaue);

      const containerWidth = computed(() => {
        const { width } = props;
        return isNumber(width) ? `${width}px` : width;
      });

      const skinName = computed(() => (unref(getDarkMode) === 'light' ? 'oxide' : 'oxide-dark'));

      const landName = computed(() => {
        const lang = useLocale().getLocale.value;
        return [LOCALE.zh_CN, LOCALE.en_US].includes(lang) ? lang : LOCALE.zh_CN;
      });

      const initOptions = computed((): RawEditorOptions => {
        const { height, toolbar, plugins, options } = props;
        const publicPath = import.meta.env.VITE_PUBLIC_PATH || '/';
        return {
          selector: `#${unref(tinymceId)}`,
          height,
          toolbar,
          menubar: 'file edit insert view format table tools',
          plugins,
          language_url: publicPath + 'resources/tinymce/langs/' + unref(landName) + '.js',
          language: unref(landName),
          branding: false,
          default_link_target: '_blank',
          link_title: false,
          object_resizing: false,
          auto_focus: true,
          skin: skinName.value,
          skin_url: publicPath + 'resource/tinymce/skins/ui/' + skinName.value,
          content_css:
            publicPath + 'resource/tinymce/skins/ui/' + skinName.value + '/content.min.css',
          ...options,
          setup: (editor: Editor) => {
            editorRef.value = editor;
            editor.on('init', initSetup);
          },
        };
      });

      const disabled = computed(() => {
        const { options } = props;
        const getDisabled = options && Reflect.get(options, 'readonly');
        const editor = unref(editorRef);
        if (editor) {
          editor.setMode(getDisabled ? 'readonly' : 'design');
        }
        return getDisabled ?? false;
      });

      watch(
        () => attrs.disabled,
        () => {
          const editor = unref(editorRef);
          if (!editor) return;
          editor.setMode(attrs.disabled ? 'readonly' : 'design');
        }
      );

      onMountedOrActivated(async () => {
        if (!initOptions.value.inline) {
          tinymceId.value = buildShortUUID('tiny-vue');
        }
        await nextTick();
        setTimeout(initEditor, 30);
      });

      onBeforeUnmount(destory);
      onDeactivated(destory);

      function initEditor() {
        const el = unref(elRef);
        if (el) el.style.visibility = '';
        tinymce
          .init(unref(initOptions))
          .then((editor) => emit('inited', editor))
          .catch((err) => emit('init-error', err));
      }

      function destory() {
        if (!tinymce) return;
        tinymce.remove(unref(initOptions).selector!);
      }

      function initSetup(e) {
        const editor = unref(editorRef);
        if (!editor) return;
        const value = props.modelVlaue || '';
        editor.setContent(value);
        bindModelHandlers(editor);
        bindHandlers(e, attrs, unref(editorRef));
      }

      function bindModelHandlers(editor: any) {
        const modelEvents = attrs.modelEvents ?? null;
        const normalizedEvents = Array.isArray(modelEvents) ? modelEvents.join(' ') : modelEvents;

        watch(
          () => props.modelVlaue,
          (val: string, preVal: string) => {
            setValue(editor, val, preVal);
          }
        );

        watch(
          () => props.value,
          (val: string, preVal: string) => {
            setValue(editor, val, preVal);
          },
          { immediate: true }
        );

        editor.on(normalizedEvents ? normalizedEvents : 'change keyup undo redo', () => {
          const content = editor.getContent({ format: attrs.outputFormat });
          emit('update:modelValue', content);
          emit('change', content);
        });

        editor.on('FullscreenStateChanged', (e) => {
          fullscreen.value = e.state;
        });
      }

      function setValue(editor: Recordable, val: string, preVal?: string) {
        if (
          editor &&
          isString(val) &&
          val !== preVal &&
          val !== editor.getContent({ format: attrs.outputFormat })
        ) {
          editor.setContent(val);
        }
      }

      function handleImageUploading(name: string) {
        const editor = unref(editorRef);
        if (!editor) return;
        editor.execCommand('mceInsertContent', false, getUploadingImgName(name));
        const content = editor?.getContent() ?? '';
        setValue(editor, content);
      }

      function getUploadingImgName(name: string) {
        return `[uploading:${name}]`;
      }

      function handleDone(name: string, url: string) {
        const editor = unref(editorRef);
        if (!editor) return;
        const content = editor?.getContent() ?? '';
        const value = content?.replace(getUploadingImgName(name), `<img src="${url}/>`) ?? ''; // 替换上传中的图片
        setValue(editor, value);
      }

      return {
        prefixCls,
        containerWidth,
        initOptions,
        tinymceContent,
        elRef,
        tinymceId,
        handleImageUploading,
        handleDone,
        editorRef,
        fullscreen,
        disabled,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-tinymce-container';

  .@{prefix-cls} {
    position: relative;
    line-height: normal;

    textarea {
      z-index: -1;
      visibility: hidden;
    }
  }
</style>
