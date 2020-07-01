<template>
  <el-card>
    <template #header>
      <el-button type="danger" @click="addFirstInput">添加一级分类</el-button>
    </template>
    <div v-loading="loadingData">
      <el-row :gutter="30">
        <el-col :span="10">
          <div id="emptyData" v-if="!categoryData.data.length">暂无数据</div>
          <div v-for="item in categoryData.data" :key="item.id" class="category">
            <h4>
              <i
                :class="
                  item.id === showMenu || !item.children ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'
                "
                @click="openMenu(item)"
              ></i>
              {{ item.category_name }}
              <div class="button-group">
                <el-button size="mini" type="danger" round @click="handlerEdit({ item, type: 'edit', level: 0 })"
                  >编辑
                </el-button>
                <el-button size="mini" type="success" round @click="handlerAdd({ item, type: 'add', level: 1 })"
                  >添加子级
                </el-button>
                <el-button size="mini" round @click="handlerDelete(item)">删除</el-button>
              </div>
            </h4>
            <el-collapse-transition>
              <ul v-show="item.id === showMenu">
                <li v-for="childItem in item.children" :key="childItem.id">
                  {{ childItem.category_name }}
                  <div class="button-group">
                    <el-button
                      size="mini"
                      type="danger"
                      round
                      @click="handlerEdit({ item: childItem, type: 'edit', level: 1 })"
                      >编辑
                    </el-button>
                    <el-button size="mini" round @click="handlerDelete(childItem)">删除</el-button>
                  </div>
                </li>
              </ul>
            </el-collapse-transition>
          </div>
        </el-col>

        <el-col :span="14">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form ref="formData" :model="formData" label-width="142px" class="form-wrap">
            <el-form-item label="一级分类编辑：" prop="categoryName">
              <el-input v-model="formData.categoryName" :disabled="addStatus.first"></el-input>
            </el-form-item>
            <el-form-item v-if="addStatus.first" label="二级分类编辑：" prop="secCategoryName">
              <el-input v-model="formData.secCategoryName" :disabled="addStatus.sec"></el-input>
            </el-form-item>
            <el-form-item center>
              <el-button type="danger" :loading="submit_loading" :disabled="submit_disabled" @click="submit">
                确定
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { AddFirstCategory, EditCategory, AddChildrenCategory } from '@api/news';
import { reactive, ref, computed, watch, onBeforeMount } from '@vue/composition-api';
import { indexArr, responseInit } from '@utils/common';
export default {
  name: 'InfoCategory',
  setup(props, { root, refs }) {
    const submit_loading = ref(false),
      showMenu = ref(null),
      loadingData = ref(true);
    const addStatus = reactive({ first: true, sec: true }),
      formData = reactive({ categoryName: '', secCategoryName: '' }),
      categoryData = reactive({ data: [] }),
      submitStatus = reactive({ item: null, type: null, level: null });
    const submit_disabled = computed(() => !(!addStatus.first || !addStatus.sec));
    // inputStatus = computed(() => submit.level === 1);
    watch(
      () => submitStatus.level,
      (value) => {
        if (value === 1) {
          !addStatus.sec || (addStatus.sec = false);
          addStatus.first || (addStatus.first = true);
        } else {
          !addStatus.first || (addStatus.first = false);
          addStatus.sec || (addStatus.sec = true);
        }
      },
      { lazy: true }
    );
    // 工具函数
    const initForm = () => {
      refs.formData.resetFields();
      submit_loading.value = false;
    };
    // 不想写if判断
    const Parent = {
      add() {
        root
          .$submit(
            () => AddFirstCategory({ categoryName: formData.categoryName }),
            (result) => categoryData.data.push(result.data)
          )
          .then(() => initForm());
      },
      edit() {
        root
          .$submit(
            () => EditCategory({ id: submitStatus.item.id, categoryName: formData.categoryName }),
            () =>
              (categoryData.data[indexArr(categoryData.data, submitStatus.item.id)].category_name =
                formData.categoryName)
          )
          .then(initForm);
      },
    };
    const Child = {
      add() {
        root
          .$submit(
            () => AddChildrenCategory({ categoryName: formData.secCategoryName, parentId: submitStatus.item.id }),
            (result) => {
              let parent = categoryData.data[indexArr(categoryData.data, submitStatus.item.id)];
              return parent.children ? parent.children.push(result.data) : (parent.children = [result.data]);
            }
          )
          .then(initForm);
      },
      edit() {
        root
          .$submit(
            () => EditCategory({ id: submitStatus.item.id, categoryName: formData.secCategoryName }),
            () => {
              let parent = categoryData.data[indexArr(categoryData.data, submitStatus.item.parent_id)];
              parent.children[indexArr(parent.children, submitStatus.item.id)].category_name = formData.secCategoryName;
            }
          )
          .then(initForm);
      },
    };

    const openMenu = (item) => {
      if (showMenu.value === item.id) showMenu.value = null;
      if (item.children) showMenu.value = item.id;
    };

    const addFirstInput = () => {
      responseInit(submitStatus, { type: 'add', level: 0 });
      initForm();
    };
    const handlerAdd = (param) => {
      responseInit(submitStatus, param);
      initForm();
    };
    const handlerEdit = (param) => {
      responseInit(submitStatus, param);
      if (!submitStatus.level) formData.categoryName = param.item.category_name;
      else formData.secCategoryName = param.item.category_name;
    };
    const handlerDelete = (item) => {
      root.$confirm({
        content: '确认删除？',
        fn: () => deleteConfirm(item),
      });
    };
    const deleteConfirm = (item) => {
      if (item.children?.length)
        item.children.forEach((childItem) => root.$store.dispatch('common/deleteInfoCategory', childItem.id));
      root.$store.dispatch('common/deleteInfoCategory', item.id);
      getCategoryAll();
    };
    const submit = () => {
      if (!(submitStatus.level ? formData.secCategoryName : formData.categoryName))
        return root.$message.error('分类名称不能为空');
      submit_loading.value = true;
      if (submitStatus.level) Child[submitStatus.type]();
      else Parent[submitStatus.type]();
    };
    const getCategoryAll = () => {
      root.$store
        .dispatch('common/getAllInfoCateGory')
        .then(({ data }) => {
          categoryData.data = data || [];
          loadingData.value = false;
        })
        .catch((err) => root.$message.error(err));
    };

    // Dom挂载完成
    onBeforeMount(() => getCategoryAll());
    return {
      showMenu,
      addStatus,
      addFirstInput,
      handlerAdd,
      loadingData,
      handlerEdit,
      submit_loading,
      submit_disabled,
      formData,
      categoryData,
      openMenu,
      submit,
      handlerDelete,
    };
  },
};
</script>

<style scoped lang="scss">
#emptyData {
  padding: 25%;
  margin: 25%;
  width: 100px;
  transform: translateX(-50px);
}
.category {
  line-height: 44px;
  position: relative;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    z-index: 2;
    top: 31px;
    left: 47px;
    height: 100%;
    border-left: 1px dotted #000;
  }
  &:last-child::before {
    height: calc(100% - 51px);
  }

  li {
    position: relative;
    list-style: none;
    margin-left: 8px;
    &::before {
      content: '';
      position: absolute;
      top: 22px;
      left: 0px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
}
li,
h4 {
  position: relative;
  height: 44px;
  padding-left: 40px;
  line-height: 44px;
  @include webkit(transition, background 0.3s ease 0s);
  &.menu-title {
    background-color: #f3f3f3;
    margin-bottom: 26px;
  }
  &:hover {
    background-color: #f3f3f3;
    border-radius: 4px;
    .button-group {
      display: block;
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  z-index: 2;
  right: 11px;
  top: 0px;
  button {
    font-size: 12px;
  }
}
.form-wrap {
  width: 410px;
  padding: 0 20px;
}
.el-col {
  min-height: 1px;
}
.el-col-14 {
  position: sticky;
  top: 15px;
}
</style>
