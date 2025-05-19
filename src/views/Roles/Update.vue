<template>
    <div class="role_add-container">
        <div class="role_add-title">
            <h4>修改角色</h4>
            <FWCButton btnValue='返回' @button-click="handleClicked"></FWCButton>
        </div>
        <div class="role_add-form">
            <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px" class="demo-roleForm"
                size="mini">
                <el-form-item label="角色名称" prop="name">
                    <el-col :span="11">
                        <el-input v-model="roleForm.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="角色类型" prop="type" width="100px">
                    <el-radio-group v-model="roleForm.type">
                        <el-radio v-for="(t,i) in roleTypeList" :key="i" :label="t.value">{{t.label}}</el-radio>
                    </el-radio-group>
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
                    <el-button class="el-button--black" @click="updateRole('roleForm')">立即修改</el-button>
                    <el-button @click="resetRole('roleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue';
import { getRoleById, updateRole } from '@/api/role';
import { SYSTEM_MAP, ROLE_TYPE_MAP, ROLE_STATUS_MAP } from '@/enums/enums.js';

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
                  { required: true, message: '请输入角色名称', trigger: 'blur' },
                  { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
              ],
              status: [
                {required: true, message: '请选择角色状态', trigger: 'change'}
              ],
              type: [
                {required: true, message: '请选择角色类型', trigger: 'change'}
              ]
            }
        }
    },
      methods: {
        async fetchRoleDetail(id) {
          try {
            const res = await getRoleById(id);
            this.roleForm = {
              ...res.data,
              systemName: SYSTEM_MAP[res.data.systemId] || ''
            };
          } catch (error) {
            console.error('获取角色失败:', error);
            this.$message.error('获取角色失败，请重试');
          }
        },
        async updateRole(formName) {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              try {
                await updateRole(this.roleForm);
                this.$message.success('角色更新成功');
                this.$router.back();
              } catch (error) {
                console.error('更新失败:', error);
                this.$message.error('角色更新失败，请重试');
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
    watch: {
      'roleForm.systemId': {
        immediate: true,
        handler(newVal) {
          this.roleForm.systemName = SYSTEM_MAP[newVal] || '';
        }
      }
    },
    mounted() {
      const id = this.$route.params.id;
      if (id) {
        this.fetchRoleDetail(id);
      }
    }
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