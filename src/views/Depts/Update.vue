<template>
    <div class="dept_add-container">
        <div class="dept_add-title">
            <h4>修改部门</h4>
            <FWCButton btnValue='返回' @button-click="handleClicked"></FWCButton>
        </div>
        <div class="dept_add-form">
            <el-form :model="deptForm" :rules="rules" ref="deptForm" label-width="100px" class="demo-deptForm"
                size="mini">
              <el-form-item label="部门名称" prop="name">
                <el-col :span="11">
                  <el-input v-model="deptForm.name"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="上级部门" prop="parentId">
                <el-select v-model="deptForm.parentId" placeholder="请选择父菜单">
                  <el-option v-for="(t,i) in parentDeptList" :key="i" :label="t.label" :value="t.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select v-model="deptForm.status" placeholder="请选择状态">
                  <el-option v-for="(t,i) in deptStatusList" :key="i" :label="t.label" :value="t.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述" prop="description">
                  <el-col :span="11">
                      <el-input type="textarea" v-model="deptForm.description"></el-input>
                  </el-col>
              </el-form-item>
              <el-form-item>
                  <el-button class="el-button--black" @click="updateDept('deptForm')">立即修改</el-button>
                  <el-button @click="resetDept('deptForm')">重置</el-button>
              </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue';
import {getDeptById, getParentDeptData, updateDept} from '@/api/dept';
import { DEPT_STATUS_MAP } from '@/enums/enums.js';

export default {
    components: {
        FWCButton
    },
    data() {
        return {
            deptStatusList: Object.keys(DEPT_STATUS_MAP).map((key) => ({
              label: DEPT_STATUS_MAP[key],
              value: key
            })),
            parentDeptList: [{name: '', id: '', label: '无'}],
            deptForm: {
              name: '',
              status: '1',
              parentId: '',
              parentName: '',
              description: '',
            },
            rules: {
              name: [
                  { required: true, message: '请输入部门名称', trigger: 'blur' },
                  { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
              ],
              status: [
                { required: true, message: '请选择状态', trigger: 'change' }
              ]
            }
        }
    },
    methods: {
      async fetchParentDeptData() {
        try {
          const response = await getParentDeptData();
          response.data.filter((item) => item.id !== this.$route.params.id).forEach((item) => {
            this.parentDeptList.push({
              name: item.name,
              id: item.id,
              label: item.name
            });
          });
        } catch (error) {
          console.error('获取一级部门列表失败:', error);
        }
      },
      async fetchDeptDetail(id) {
        try {
          const res = await getDeptById(id);
          this.deptForm = {
            ...res.data
          };
        } catch (error) {
          console.error('获取部门失败:', error);
          this.$message.error('获取部门失败，请重试');
        }
      },
      async updateDept(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            try {
              await updateDept(this.deptForm);
              this.$message.success('部门更新成功');
              this.$router.back();
            } catch (error) {
              console.error('更新失败:', error);
              this.$message.error('部门更新失败，请重试');
            }
          } else {
            console.log('表单验证失败');
            return false;
          }
        });
      },
      resetDept(formName) {
          this.$refs[formName].resetFields();
      },
      handleClicked() {
          this.$router.back();
      }
    },
    watch: {
      'deptForm.parentId'(newParentId) {
        this.deptForm.parentName = this.parentDeptList.find((item) => item.id === newParentId).name;
      }
    },
    mounted() {
      this.fetchParentDeptData();
      const id = this.$route.params.id;
      if (id) {
        this.fetchDeptDetail(id);
      }
    }
}
</script>

<style scoped lang="scss">
@import '../../assets/customer-btn';

.dept_add-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dept_add-form {
    margin-top: 50px;
}
</style>