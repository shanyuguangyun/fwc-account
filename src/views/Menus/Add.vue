<template>
    <div class="role_add-container">
        <div class="role_add-title">
            <h4>创建角色</h4>
            <FWCButton btnValue='返回' @button-click="handleClicked"></FWCButton>
        </div>
        <div class="role_add-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                size="mini">
                <el-form-item label="部门名称" prop="name">
                    <el-col :span="11">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="启用" prop="using" width="100px">
                    <el-switch v-model="ruleForm.using"></el-switch>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                    <el-col :span="11">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button--black" @click="createRole('ruleForm')">立即创建</el-button>
                    <el-button @click="resetRole('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue'
export default {
    components: {
        FWCButton
    },
    data() {
        return {
            ruleForm: {
                name: '',
                gender: '',
                phone: '',
                dept: '',
                position: '',
                entryDate: '',
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
                dept: [
                    { required: true, message: '请选择部门', trigger: 'change' }
                ],
                position: [
                    { required: true, message: '请选择岗位', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入住址', trigger: 'blur' }
                ],
                entryDate: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
            }
        }
    },
    methods: {
        createRole(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
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