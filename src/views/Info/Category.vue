<template>
  <el-card>
    <template #header>
      <el-button type="danger" @click="addFirstInput">添加一级分类</el-button>
    </template>
    <div v-loading="loadingData">
      <el-row :gutter="30">
        <el-col :span="10">
          <div v-for="item in categoryData.data" :key="item.id" class="category">
            <h4>
              <i
                :class="item.id === showMenu ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'"
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
                <el-button size="mini" round @click="deleteConfirm(item.id)">删除</el-button>
              </div>
            </h4>
            <el-collapse-transition>
              <ul v-show="menuHidden(item.id)">
                <li v-for="childItem in item.children" :key="childItem.id">
                  {{ childItem.category_name }}
                  <div class="button-group">
                    <el-button
                      size="mini"
                      type="danger"
                      round
                      @click="handlerEdit({ childItem, type: 'edit', level: 1 })"
                      >编辑
                    </el-button>
                    <el-button size="mini" round>删除</el-button>
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
              <el-input v-model="formData.categoryName" :disabled="addFirstDisable"></el-input>
            </el-form-item>
            <el-form-item v-if="addFirstDisable" label="二级分类编辑：" prop="secCategoryName">
              <el-input v-model="formData.secCategoryName" :disabled="addSecDisable"></el-input>
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
import { AddFirstCategory, DeleteCategory, EditCategory, AddChildrenCategory } from '@api/news';
import { reactive, ref, onMounted, computed } from '@vue/composition-api';
import { indexArr } from '@utils/common';
export default {
  name: 'InfoCategory',
  setup(props, { root, refs }) {
    const addFirstDisable = ref(true),
      addSecDisable = ref(true),
      submit_loading = ref(false),
      showMenu = ref(null);
    // submit_disabled = ref(true);
    const formData = reactive({ categoryName: '', secCategoryName: '' }),
      categoryData = reactive({ data: null }),
      submitStatus = reactive({ data: null, type: null, level: null });
    const submit_disabled = computed(() => !(!addFirstDisable.value || !addSecDisable.value));
    const loadingData = computed(() => !categoryData.data);
    // 工具函数
    const initForm = () => {
      refs.formData.resetFields();
      submit_loading.value = false;
    };
    const editStatus = ({ item, type, level }) => {
      submitStatus.type = type;
      submitStatus.data = item;
      submitStatus.level = level;
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
            () => EditCategory({ id: submitStatus.data.id, categoryName: formData.categoryName }),
            () =>
              (categoryData.data[indexArr(categoryData.data, submitStatus.data.id)].category_name =
                formData.categoryName)
          )
          .then(initForm);
      },
    };
    const Child = {
      add() {
        root
          .$submit(
            () => AddChildrenCategory({ categoryName: formData.secCategoryName, parentId: submitStatus.data.id }),
            (result) => {
              let parent = categoryData.data[indexArr(categoryData.data, submitStatus.data.id)];
              return parent.children ? parent.children.push(result.data) : (parent.children = [result.data]);
            }
          )
          .then(initForm);
      },
      edit() {},
    };
    const deleteFirst = (id) =>
      root
        .$submit(
          () => DeleteCategory({ categoryId: id }),
          () => categoryData.data.splice(indexArr(categoryData.data, id), 1)
        )
        .then(() => {
          initForm();
          addSecDisable.value = true;
        });
    const openMenu = (item) => {
      if (showMenu.value === item.id) showMenu.value = null;
      if (item.children) showMenu.value = item.id;
    };
    const menuHidden = (id) => {
      if (id === showMenu.value) return true;
      return false;
    };
    const addFirstInput = () => {
      addFirstDisable.value = false;
      addSecDisable.value = true;
      editStatus({ type: 'add', level: 0 });
    };
    const handlerAdd = (param) => {
      addFirstDisable.value = true;
      addSecDisable.value = false;
      editStatus(param);
    };
    const handlerEdit = (param) => {
      addFirstDisable.value = false;
      editStatus(param);
      formData.categoryName = param.item.category_name;
    };
    const deleteConfirm = (id) =>
      root.confirm({
        content: '确认删除？',
        fn: () => deleteFirst(id),
      });

    const submit = () => {
      if (!(submitStatus.level ? formData.secCategoryName : formData.categoryName))
        return root.$message.error('分类名称不能为空');

      submit_loading.value = true;
      if (submitStatus.level) Child[submitStatus.type]();
      else Parent[submitStatus.type]();
    };
    const getCategoryAll = () =>
      root.$store
        .dispatch('info/getAllInfoCateGory')
        .then((result) => (categoryData.data = result.data))
        .catch((err) => root.$message.error(err));

    // Dom挂载完成
    onMounted(() => getCategoryAll());
    return {
      addFirstDisable,
      showMenu,
      addSecDisable,
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
      deleteConfirm,
      menuHidden,
    };
  },
};
</script>

<style scoped lang="scss">
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
  // & :first-child::after {
  //   height: 59px;
  // }
  // ul {
  //   position: relative;
  //   &::before {
  //     content: '';
  //     height: calc(100% - 41px);
  //     position: absolute;
  //     bottom: 22px;
  //     left: 47px;
  //     border-left: 1px dotted #000;
  //   }
  // }
  // h4::before {
  //   position: absolute;
  //   content: '';
  //   height: 55px;
  //   top: 28px;
  //   left: 47px;
  //   border-left: 1px dotted #000;
  //   transition: all 0.3s ease 0s;
  // }
  // h4:not(:first-of-type)::before {
  //   height: 124px;
  //   top: -42px;
  //   // height: calc(100% + 17px);
  // }
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
// .category h4:first-of-type::before {
// position: absolute;
// content: '';
// height: 58px;
// top: 27px;
// left: 47px;
// border-left: 1px dotted #000;
// }
// .category ul:not(:last-of-type) :last-child::after {
//   bottom: -37px;
//   height: 100px;
// }
// ul[style='display: none;'] ~ ul :first-child::after {
//   height: 127px;
// }
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
