<template>
  <div class="interface_add-container">
    <div class="interface_add-title">
      <h4>创建接口</h4>
      <FWCButton btnValue='返回' @button-click="handleClicked"></FWCButton>
    </div>
    <div class="interface_add-form">
      <el-form :model="interfaceForm" :rules="rules" ref="interfaceForm" label-width="100px" class="demo-interfaceForm"
               size="mini">
        <el-form-item label="所属系统" prop="systemId">
          <el-select v-model="interfaceForm.systemId" placeholder="请选择系统">
            <el-option v-for="(t,i) in systemList" :key="i" :label="t.label" :value="t.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接口名称" prop="name">
          <el-col :span="11">
            <el-input v-model="interfaceForm.name" placeholder="请输入接口名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="接口路由" prop="url">
          <el-col :span="11">
            <el-input v-model="interfaceForm.url" placeholder="/users/add"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="接口类型" prop="type"  width="100px">
          <el-select v-model="interfaceForm.type" placeholder="请选择接口类型">
            <el-option v-for="(t,i) in interfaceTypeList" :key="i" :label="t.label" :value="t.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="interfaceForm.status" placeholder="请选择状态">
            <el-option v-for="(t,i) in interfaceStatusList" :key="i" :label="t.label" :value="t.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-col :span="11">
            <el-input type="textarea" v-model="interfaceForm.description"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button class="el-button--black" @click="createInterface('interfaceForm')">立即创建</el-button>
          <el-button @click="resetInterface('interfaceForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue';
import { createInterface } from '@/api/interface';
import {INTERFACE_STATUS_MAP, INTERFACE_TYPE_MAP, SYSTEM_MAP} from '@/enums/enums.js';

export default {
  components: {
    FWCButton
  },
  data() {
    return {
      systemList: Object.keys(SYSTEM_MAP).map((key) => ({
        label: SYSTEM_MAP[key],
        value: parseInt(key)
      })),
      interfaceTypeList: Object.keys(INTERFACE_TYPE_MAP).map((key) => ({
        label: INTERFACE_TYPE_MAP[key],
        value: parseInt(key)
      })),
      interfaceStatusList: Object.keys(INTERFACE_STATUS_MAP).map((key) => ({
        label: INTERFACE_STATUS_MAP[key],
        value: key
      })),
      interfaceForm: {
        systemId: 0,
        systemName: '',
        name: '',
        type: 0,
        url: '',
        status: '1',
        description: '',
      },
      rules: {
        systemId: [
          {required: true, message: '请选择所属系统', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入接口名称', trigger: 'blur'},
          {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
        ],
        url: [
          {required: true, message: '请输入接口路由', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ],
        type: [
          {required: true, message: '请选择接口类型', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    async createInterface(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response = await createInterface(this.interfaceForm);
            console.log('创建成功:', response.data);
            this.$message.success('接口创建成功');
            this.$router.back();
          } catch (error) {
            console.error('创建失败:', error);
            this.$message.error('接口创建失败，请重试');
          }
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    resetInterface(formName) {
      this.$refs[formName].resetFields();
    },
    handleClicked() {
      this.$router.back();
    }
  },
  watch: {
    'interfaceForm.systemId': {
      immediate: true,
      handler(newVal) {
        this.interfaceForm.systemName = SYSTEM_MAP[newVal] || '';
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import '../../assets/customer-btn';

.interface_add-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.interface_add-form {
  margin-top: 50px;
}
</style>