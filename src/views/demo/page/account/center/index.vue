<template>
  <div :class="prefixCls">
    <Row :class="`${prefixCls}-top`">
      <Col span="9" :class="`${prefixCls}-col`">
        <Row>
          <Col span="8">
            <div>
              <span>kory</span>
              <div>活着</div>
            </div>
          </Col>
          <Col span="16">
            <div :class="`${prefixCls}-top__detail`">
              <template v-for="detail of details" :key="detail.title">
                <p>
                  <Icon :icon="detail.icon" />
                  {{ detail.title }}</p
                ></template
              ></div
            >
          </Col>
        </Row>
      </Col>

      <Col span="7" :class="`${prefixCls}-col`">
        <CollapseContainer title="标签" :canExpand="false">
          <template v-for="tag in tags" :key="tag">
            <Tag class="mb-2">{{ tag }}</Tag></template
          >
        </CollapseContainer>
      </Col>
      <Col span="8" :class="`${prefixCls}-col`">
        <collapse-container :class="`${prefixCls}-top__team`" title="团队" :canExpan="false">
          <div v-for="(team, index) of teams" :key="index" :class="`${prefixCls}-top__tram-item`">
            <Icon :icon="team.icon" :color="team.color" />
            <span>{{ team.title }}</span>
          </div>
        </collapse-container>
      </Col>
    </Row>

    <div :class="`${prefixCls}-bottom`">
      <Tabs>
        <template v-for="item in achieveList" :key="item.key">
          <TabPane :tab="item.name"> <component :is="item.component" /></TabPane>
        </template>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue-demi';
  import { Col, Row, Tag, Tabs } from 'ant-design-vue';
  import { details, tags, teams, articleList, achieveList } from './data';
  import Icon from '/@/components/Icon';
  import { CollapseContainer } from '/@/components/Container';
  import Article from './Article.vue';

  export default defineComponent({
    components: { Col, Row, Icon, CollapseContainer, Tag, Tabs, TabPane: Tabs.TabPane, Article },
    setup() {
      return {
        prefixCls: 'account-center',
        details,
        tags,
        teams,
        articleList,
        achieveList,
      };
    },
  });
</script>

<style lang="less" scoped>
  .account-center {
    &-col:not(:last-child) {
      padding: 0 10px;

      &:not(:last-child) {
        border-right: 1px dashed rgb(206 206 206 / 50%);
      }
    }

    &-top {
      padding: 10px;
      margin: 16px 16px 12px;
      background-color: @component-background;
      border-radius: 3px;

      &__avatar {
        text-align: center;

        img {
          margin: auto;
          border-radius: 50%;
        }

        span {
          display: block;
          font-size: 20px;
          font-weight: 500;
        }

        div {
          margin-top: 3px;
          font-size: 12px;
        }
      }

      &__detail {
        padding-left: 20px;
        margin-top: 15px;
      }

      &__team {
        &-item {
          display: inline-block;
          padding: 4px 24px;
        }

        span {
          margin-left: 3px;
        }
      }
    }
  }
</style>
