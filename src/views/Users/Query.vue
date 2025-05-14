<template>
    <div class="user_query-container">
        <div class="user_query-title">
            <h4>用户画像</h4>
            <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
        </div>
        <div class="user_query-form">
            <el-form :model="queryUserForm" :rules="rules" ref="queryUserForm" label-width="210px"
                class="demo-queryUserForm" size="mini">
                <el-form-item label="ID/姓名" prop="name">
                    <el-col :span="11">
                        <el-input v-model="queryUserForm.name" placeholder="请输入您要查询的用户名称或id"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button--black" @click="queryUser('queryUserForm')">立即查询</el-button>
                    <el-button @click="resetUser('queryUserForm')">重置</el-button>
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
            btnValue: '返回',
            queryUserForm: {
                name: '',
                gender: '',
                phone: '',
                dept: '',
                position: '',
                entryDate: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户id或姓名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        queryUser(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetUser(formName) {
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

.user_query-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.user_query-form {
    margin-top: 50px;
}
</style>