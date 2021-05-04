<template>
  <PageWrapper :title="t('routes.dashboard.about')" class="about">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a :href="GITHUB_URL" target="_blank">{{ name }}</a>
          是一个基于Vue3,、Vite、Ant-Design-Vue、TypeScript的学习项目
        </span>
      </div>
    </template>
    <Description class="enter-y" @register="infoRegister" />
    <Description class="enter-y" @register="register" />
    <Description class="enter-y" @register="registerDev" />
  </PageWrapper>
</template>

<script lang="tsx">
  import { defineComponent } from '@vue/runtime-core';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from 'vue-i18n';
  import { DescItem, Description, useDescription } from '/@/components/Description';
  import { Tag } from 'ant-design-vue';
  import { DOC_URL, GITHUB_URL, SITE_URL } from '/@/settings/siteSetting';

  export default defineComponent({
    name: 'AboutPage',
    components: { PageWrapper, Description },
    setup() {
      const { t } = useI18n();
      const { pkg, lastBuildTime } = __APP_INFO__,
        { name, version, dependencies, devDependencies } = pkg;

      const schema: DescItem[] = [],
        devSchema: DescItem[] = [];

      const commonTagRender = (color: string) => (curVal) => <Tag color={color}>{curVal}</Tag>;
      const commonLinkRender = (text: string) => (href) => (
        <a href={href} target="_blank">
          {text}
        </a>
      );

      const infoSchema: DescItem[] = [
        { label: '版本', field: 'version', render: commonTagRender('blue') },
        { label: '最后编译时间', field: 'lastBuildTime', render: commonTagRender('blue') },
        { label: '文档地址', field: 'doc', render: commonLinkRender('文档地址') },
        { label: '预览地址', field: 'preview', render: commonLinkRender('预览地址') },
        { label: 'Github', field: 'github', render: commonLinkRender('Github') },
      ];
      const infoData = {
        version,
        lastBuildTime,
        doc: DOC_URL,
        preview: SITE_URL,
        github: GITHUB_URL,
      };
      Object.keys(dependencies).forEach((key) => {
        schema.push({ field: key, label: key });
      });
      Object.keys(devDependencies).forEach((key) => {
        devSchema.push({ field: key, label: key });
      });

      const [register] = useDescription({
        title: '生产环境依赖',
        data: dependencies,
        schema,
        column: { xs: 2, sm: 2, md: 3, xl: 4 },
      });

      const [registerDev] = useDescription({
        title: '开发环境依赖',
        data: devDependencies,
        schema: devSchema,
        column: { xs: 2, sm: 2, md: 3, xl: 4 },
      });
      const [infoRegister] = useDescription({
        title: '项目信息',
        data: infoData,
        schema: infoSchema,
        column: { xs: 2, sm: 2, xl: 3 },
      });
      return { name, t, register, registerDev, infoRegister, GITHUB_URL };
    },
  });
</script>
