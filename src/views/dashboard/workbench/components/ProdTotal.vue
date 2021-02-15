<template>
  <a-row class="prod-total">
    <template v-for="(item, index) in workProd" :key="item.type">
      <a-col :xs="12" :sm="6" :class="`prod-total__item prod-total__item-${index}`">
        <div class="img" :class="`prod-total__item-${index}-img`"></div>
        <div>{{ item.amount }}</div>
        <span>{{ item.type }}</span>
      </a-col>
    </template>
  </a-row>
</template>

<script lang="ts">
  import { Col, Row } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import { workProd } from '../data';
  export default defineComponent({
    components: { [Row.name]: Row, [Col.name]: Col },
    setup() {
      return { workProd };
    },
  });
</script>

<style lang="less" scoped>
  .prod-total {
    padding: 12px 4px 12px 12px;
    background-color: #fff;

    &__item {
      display: inline-block;
      flex: 0 0 calc(25% - 8px);
      padding: 20px 10px;
      margin-right: 8px;
      border-radius: 4px;

      span {
        font-size: 14px;
        line-height: 28px;
      }
      div {
        font-size: 16px;
      }

      .img {
        float: left;
        width: 62px;
        height: 62px;
      }

      &-0 {
        background-color: rgba(254, 97, 178, 0.1);

        &-img {
          background: url(../../../../assets/img/dashboard/workbench/datashow1.png) no-repeat;
        }
        div {
          color: #fe61b2;
        }
      }

      &-1 {
        background-color: rgba(254, 163, 64, 0.1);

        &-img {
          background: url(../../../../assets/img/dashboard/workbench/datashow2.png) no-repeat;
        }
        div {
          color: #fea340;
        }
      }

      &-2 {
        background-color: rgba(172, 70, 255, 0.1);

        &-img {
          background: url(../../../../assets/img/dashboard/workbench/datashow3.png) no-repeat;
        }
        div {
          color: #9e55ff;
        }
      }

      &-3 {
        background-color: rgba(0, 196, 186, 0.1);

        &-img {
          background: url(../../../../assets/img/dashboard/workbench/datashow4.png) no-repeat;
        }
        div {
          color: #00c4ba;
        }
      }
    }
  }
</style>
