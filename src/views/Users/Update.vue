<template>
    <div class="user_add-container">
        <div class="user_add-title">
            <h4>修改用户</h4>
            <FWCButton btnValue='返回' @button-click="handleClicked"></FWCButton>
        </div>
        <div class="user_add-form">
          <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm"
                   size="mini">
            <el-form-item label="姓名" prop="name">
              <el-col :span="11">
                <el-input v-model="userForm.name" placeholder="请输入姓名"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="性别" prop="gender" width="100px">
              <el-radio-group v-model="userForm.gender">
                <el-radio v-for="(t,i) in genderList" :key="i" :label="t.value">{{t.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-col :span="11">
                <el-input v-model="userForm.phone" placeholder="请输入手机号"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="住址" prop="address">
              <el-col :span="11">
                <el-input v-model="userForm.address" placeholder="请输入住址"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="入职日期" prop="entryDate" >
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="userForm.entryDate"
                                style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday" >
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="userForm.birthday"
                                style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="部门" prop="deptId">
              <el-select v-model="userForm.deptId" placeholder="请选择部门">
                <el-option v-for="(t, i) in deptList" :key="i" :label="t.name" :value="t.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位" prop="position">
              <el-select v-model="userForm.position" placeholder="请选择岗位">
                <el-option v-for="(t, i) in positionList" :key="i" :label="t.name" :value="t.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-col :span="11">
                <el-input v-model="userForm.email" placeholder="请输入邮箱"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-col :span="11">
                <el-input v-model="userForm.password" placeholder="请输入密码，默认88888888"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="状态" prop="status" width="100px">
              <el-radio-group v-model="userForm.status">
                <el-radio v-for="(t,i) in statusList" :key="i" :label="t.value">{{t.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="mark">
              <el-col :span="11">
                <el-input type="textarea" v-model="userForm.mark"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button class="el-button--black" @click="updateUser('userForm')">立即修改</el-button>
              <el-button @click="resetUser('userForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue';
import { getUserById, updateUser } from '@/api/user';
import { USER_STATUS_MAP, GENDER_MAP } from '@/enums/enums.js';
import {getParentDeptData} from "@/api/dept";

export default {
    components: {
        FWCButton
    },
    data() {
        return {
            genderList: ['1','0','2'].map(key => ({value: parseInt(key), label: GENDER_MAP[key]})),
            deptList:[],
            positionList: [],
            statusList: ['1','0'].map(key => ({value: parseInt(key), label: USER_STATUS_MAP[key]})),
            userForm: {
                name: '',
                status: '1',
                mark: '',
                deptId: '',
                deptName: ''
            },
            rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            gender: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            phone: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { min: 11, max: 11, message: '手机号码为11个字符', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请输入住址', trigger: 'blur' }
            ],
            entryDate: [
              { type: 'date', required: true, message: '请选择入职日期', trigger: 'change' }
            ],
            birthday: [
              { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
            ],
          }
        }
    },
      methods: {
        async fetchUserDetail(id) {
          try {
            const res = await getUserById(id);
            this.userForm = {
              ...res.data,
              entryDate: res.data.entryDate ? new Date(res.data.entryDate) : '',
              birthday: res.data.birthday ? new Date(res.data.birthday) : '',
            };
          } catch (error) {
            console.error('获取用户失败:', error);
            this.$message.error('获取用户失败，请重试');
          }
        },
        async updateUser(formName) {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              try {
                await updateUser(this.userForm);
                this.$message.success('用户更新成功');
                this.$router.back();
              } catch (error) {
                console.error('更新失败:', error);
                this.$message.error('用户更新失败，请重试');
              }
            } else {
              console.log('表单验证失败');
              return false;
            }
          });
        },
        resetUser(formName) {
            this.$refs[formName].resetFields();
        },
        handleClicked() {
            this.$router.back();
        },
        async getDepts() {
          const res = await getParentDeptData();
          this.deptList = res.data;
        }
    },
    mounted() {
      this.getDepts();
      const id = this.$route.params.id;
      if (id) {
        this.fetchUserDetail(id);
      }
    },
    watch: {
      'userForm.deptId'(val) {
        this.userForm.deptName = this.deptList.find(item => item.id === val).name;
      }
    }
}
</script>

<style scoped lang="scss">
@import '../../assets/customer-btn';

.user_add-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.user_add-form {
    margin-top: 50px;
}
</style>