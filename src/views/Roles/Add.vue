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
                        <el-input v-model="roleForm.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                    <el-col :span="11">
                        <el-input type="textarea" v-model="roleForm.desc"></el-input>
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
import FWCButton from '../../components/FWCButton.vue'
export default {
    components: {
        FWCButton
    },
    data() {
        return {
            roleForm: {
                name: '',
                desc: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ]
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