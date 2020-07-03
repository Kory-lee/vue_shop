<template>
  <el-dialog :title="dialog_mode" :visible.sync="dialog_flag" width="600px" @close="close" @opened="openedDialog">
    <el-form ref="form" :model="form" :rules="rules" label-width="95px">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="truename">
        <el-input v-model="form.truename"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model.number="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="地区：" prop="region">
        <CityPicker :config="pickSizes" v-model="form.region" />
      </el-form-item>
      <el-form-item label="是否启用：" prop="status">
        <el-radio v-model="form.status" label="1">禁用</el-radio>
        <el-radio v-model="form.status" label="2">启用</el-radio>
      </el-form-item>
      <el-form-item label="角色类型：" prop="role">
        <el-checkbox-group v-model="form.role">
          <el-checkbox v-for="item in roleItems.data" :key="item.role" :label="item.role">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" class="dialogButton" @click="close">取 消</el-button>
        <el-button size="small" type="danger" :loading="submitLoading" class="dialogButton" @click="submitConfirm"
          >确 定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api';
import CityPicker from '@components/CityPicker';
import { AddUser, GetRole } from '@api/user';
import { initObj } from '@utils/common';
export default {
  name: 'UserDialog',
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: { CityPicker },
  setup(props, { refs, emit, root }) {
    const submitLoading = ref(false),
      dialog_flag = computed(() => props.flag);
    const form = reactive({
        username: '',
        truename: '',
        password: '',
        phone: '',
        region: { province: '', city: '', area: '', street: '' },
        status: '1',
        role: [],
      }),
      options = reactive({ categoryConfig: { commitUrl: 'common/infoCategory' } }),
      pickSizes = ['province', 'city', 'area', 'street'],
      rules = {
        username: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        truename: [{ type: 'string', trigger: 'blur' }],
        password: [{ type: 'string', required: true, message: '请输入密码', trigger: 'change' }],
        region: [{ type: 'object', message: '请选择活动区域', trigger: 'change' }],
        phone: [{ type: 'number', message: '请输入电话号码', trigger: 'change' }],
        status: [{ type: 'string', required: true }],
        role: [{ type: 'array', message: '请选择用户角色', required: true }],
      };
    const roleItems = reactive({ data: [] });
    // initObj(pickSizes, form.region);

    // 方法
    const close = () => {
      dialog_flag.value = false;
      emit('update:flag', false);
      initForm();
    };
    const openedDialog = () => {
      getRole();
    };
    const initForm = () => {
      submitLoading.value = false;
      root.$nextTick(() => {
        initObj(pickSizes, form.region);
        refs.form.resetFields();
      });
    };
    const submitConfirm = () => {
      console.log('form.region :>> ', form.region);
      let { username, truename, password, phone, region, status, role } = form;
      role = role.join();
      region = JSON.stringify(region);
      if (!username || !password || !status || !role) return root.$message.error('请填写必要信息！');
      root.$submit(
        () => AddUser({ username, truename, password, phone, region, status, role }),
        () => {
          initForm();
        }
      );
      //   if (dialog_mode.value === 'edit') {
      //     if (!content) return root.$message.error('内容不能为空');
      //     root.$submit(
      //       () => EditInfo({ categoryId, title, content, updateDate: timestampToTime(), id }),
      //       () => {
      //         dialog_flag.value = false;
      //         emit('update:flag', false);
      //         root.$store.commit('common/EDIT_INFO_LIST', { id, data: { categoryId, title, content } });
      //         initForm();
      //       }
      //     );
      //   } else
      //     root.$submit(
      //       () => AddUser({ categoryId, title, content, createDate: timestampToTime() }),
      //       () => {
      //         initForm();
      //       }
      //     );
    };
    const getRole = (params = []) =>
      root.$request(
        () => GetRole(params),
        (data) => (roleItems.data = data)
      );
    return {
      pickSizes,
      rules,
      roleItems,
      dialog_flag,
      submitLoading,
      form,
      options,
      close,
      openedDialog,
      submitConfirm,
    };
  },
};
</script>

<style lang="scss" scoped></style>
