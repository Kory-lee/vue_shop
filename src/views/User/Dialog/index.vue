<template>
  <el-dialog
    :title="dialog_info.mode"
    :visible.sync="dialog_flag"
    width="550px"
    @close="close"
    @opened="openedDialog"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="94px"
      size="small"
      v-loading="dialog_loading"
    >
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="truename">
        <el-input v-model="form.truename"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="form.phone"></el-input>
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
          <el-checkbox
            v-for="item in checkboxData.roleItems"
            :key="item.role"
            :label="item.role"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        label="按钮："
        v-if="dialog_info.mode === 'edit'"
        prop="btnPerm"
      >
        <div v-for="item in checkboxData.btnPerm" :key="item.name">
          <template v-if="item.perm && item.perm.length">
            <h5>{{ item.name }}</h5>
            <el-checkbox-group v-model="form.btnPerm">
              <el-checkbox
                v-for="btns in item.perm"
                :key="btns.value"
                :label="btns.value"
              >
                {{ btns.name }}
              </el-checkbox>
            </el-checkbox-group>
          </template>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" class="dialogButton" @click="close"
          >取 消</el-button
        >
        <el-button
          size="small"
          type="danger"
          :loading="submitLoading"
          class="dialogButton"
          @click="submitConfirm"
          >确 定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, watch, computed, nextTick } from "@vue/composition-api";
import CityPicker from "@components/CityPicker";
import { AddUser, EditUser, GetRole, GetPermButton } from "@api/user";
import { stripScript, isPassword } from "@utils/validate";
import sha1 from "js-sha1";
export default {
  name: "UserDialog",
  props: {
    flag: { type: Boolean, default: false },
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: { CityPicker },
  setup(props, { refs, emit, root }) {
    const submitLoading = ref(false),
      dialog_loading = ref(true),
      dialog_flag = computed({
        get: () => props.flag,
        set: (val) => emit("update:flag", val),
      }),
      // dialog_required = computed(() => props.data.mode === 'add'),
      dialog_info = reactive(props.data);
    watch(dialog_flag, (value) => console.log(value));
    const form = reactive({
        username: "",
        truename: "",
        password: "",
        phone: "",
        region: {},
        status: "",
        role: [],
        btnPerm: [],
        id: "",
      }),
      checkboxData = reactive({ roleItems: null, btnPerm: null }),
      pickSizes = ["province", "city", "area", "street"],
      rules = reactive({
        username: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        truename: [{ type: "string", trigger: "blur" }],
        password: [
          {
            type: "string",
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            validator(rule, value, callback) {
              value = form.password = stripScript(value);
              if (!value) {
                if (dialog_info.mode === "edit") callback();
                else callback(new Error("密码不能为空"));
              }
              if (!isPassword(value))
                callback(new Error("数字字母组合且不少于6位"));
              else callback();
            },
          },
        ],
        region: [{ type: "object", message: "请选择地区", trigger: "change" }],
        phone: [{ trigger: "blur" }],
        status: [{ type: "string", required: true, message: "请选择用户状态" }],
        role: [{ type: "array", message: "用户角色不能为空", required: true }],
        btnPerm: [{ type: "array", message: "按钮不能为空", required: true }],
      });
    watch(
      () => props.data.mode,
      (value) => {
        if (value === "add") rules.password[0].required = true;
        else rules.password[0].required = false;
      }
    );
    // 方法
    const close = () => {
      dialog_loading.value = true;
      dialog_flag.value = false;
      initForm();
    };
    const initForm = () => {
      submitLoading.value = false;
      form.region = {};
      nextTick(() => refs.form.resetFields());
    };
    const openedDialog = () => {
      getRole();
      if (dialog_info.mode === "edit") {
        let {
          username,
          truename,
          phone,
          status,
          region,
          role,
          btnPerm,
          id,
        } = dialog_info.data;
        form.role = role.split(",");
        form.username = username;
        form.truename = truename;
        form.phone = phone;
        form.status = status;
        form.region = JSON.parse(region);
        if (btnPerm) form.btnPerm = btnPerm.split(",");
        form.id = id;
      }
      dialog_loading.value = false;
    };
    const user = {
      add: AddUser,
      edit: EditUser,
    };
    const submitConfirm = () => {
      refs.form.validate((valid) => {
        if (valid) {
          let params;
          let {
            username,
            truename,
            password,
            phone,
            region,
            status,
            role,
            btnPerm,
            id,
          } = form;
          role = role.join();
          btnPerm = btnPerm.join();
          password = sha1(password);
          region = JSON.stringify(region);
          if (dialog_info.mode === "edit")
            params = {
              id,
              username,
              truename,
              password,
              phone,
              region,
              status,
              role,
              btnPerm,
            };
          else {
            params = {
              username,
              truename,
              phone,
              region,
              status,
              role,
              btnPerm,
            };
            if (password) params.password = password;
          }
          // 添加状态,需要密码
          // 编辑状态,值存在,并且加密码
          root
            .$submit(() => user[dialog_info.mode](params))
            .then(() => close());
        } else {
          console.log("error submit");
        }
      });
    };
    const getRole = (params = {}) => {
      if (checkboxData.roleItems) return;
      root.$request(
        () => GetRole(params),
        (result) => (checkboxData.roleItems = result)
      );
      if (checkboxData.btnPerm) return;
      root.$request(
        () => GetPermButton(),
        (result) => (checkboxData.btnPerm = result)
      );
    };

    return {
      pickSizes,
      dialog_loading,
      rules,
      checkboxData,
      dialog_flag,
      dialog_info,
      submitLoading,
      form,
      close,
      openedDialog,
      submitConfirm,
    };
  },
};
</script>

<style lang="scss" scoped></style>
