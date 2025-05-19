<template>
  <div class="role_add-container">
    <div class="role_add-title">
      <h4>创建角色</h4>
      <FWCButton btnValue='返回' @button-click="handleClicked"></FWCButton>
    </div>
    <div class="role_add-form">
      <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px" class="demo-roleForm"
               size="mini">
        <el-form-item label="角色名称" prop="name">
          <el-col :span="11">
            <el-input v-model="roleForm.name" placeholder="请输入角色名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="角色类型" prop="type"  width="100px">
          <el-select v-model="roleForm.type" placeholder="请选择角色类型">
            <el-option v-for="(t,i) in roleTypeList" :key="i" :label="t.label" :value="t.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="roleForm.status" placeholder="请选择状态">
            <el-option v-for="(t,i) in roleStatusList" :key="i" :label="t.label" :value="t.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-col :span="11">
            <el-input type="textarea" v-model="roleForm.description"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button class="el-button--black" @click="createRole('roleForm')">立即创建</el-button>
          <el-button @click="resetRole('roleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue';
import { createRole } from '@/api/role';
import {ROLE_STATUS_MAP, ROLE_TYPE_MAP} from '@/enums/enums.js';

export default {
  components: {
    FWCButton
  },
  data() {
    return {
      roleTypeList: Object.keys(ROLE_TYPE_MAP).map((key) => ({
        label: ROLE_TYPE_MAP[key],
        value: parseInt(key)
      })),
      roleStatusList: Object.keys(ROLE_STATUS_MAP).map((key) => ({
        label: ROLE_STATUS_MAP[key],
        value: key
      })),
      roleForm: {
        name: '',
        type: 0,
        status: '1',
        description: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ],
        type: [
          {required: true, message: '请选择角色类型', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    async createRole(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response = await createRole(this.roleForm);
            console.log('创建成功:', response.data);
            this.$message.success('角色创建成功');
            this.$router.back();
          } catch (error) {
            console.error('创建失败:', error);
            this.$message.error('角色创建失败，请重试');
          }
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    resetRole(formName) {
      this.$refs[formName].resetFields();
    },
    handleClicked() {
      this.$router.back();
    }
  },
}
</script>

<style scoped lang="scss">
@import '../../assets/customer-btn';

.role_add-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.role_add-form {
  margin-top: 50px;
}
</style>