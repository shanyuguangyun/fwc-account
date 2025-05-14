<template>
    <div class="interface_add-container">
        <div class="interface_add-title">
            <h4>创建接口</h4>
            <FWCButton btnValue='返回' @button-click="handleClicked"></FWCButton>
        </div>
        <div class="interface_add-form">
            <el-form :model="interfaceForm" :rules="rules" ref="interfaceForm" label-width="100px" class="demo-interfaceForm"
                size="mini">
                <el-form-item label="所属系统" prop="system">
                    <el-select v-model="interfaceForm.system" placeholder="请选择系统">
                        <el-option label="人事权限" value="renshi"></el-option>
                        <el-option label="打卡考勤" value="daka"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接口名称" prop="name">
                    <el-col :span="11">
                        <el-input v-model="interfaceForm.name" placeholder="请输入接口名称"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="接口路径" prop="path">
                    <el-col :span="11">
                        <el-input v-model="interfaceForm.path" placeholder="请输入接口路由，如/user/add"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                    <el-col :span="11">
                        <el-input type="textarea" v-model="interfaceForm.desc"></el-input>
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
import FWCButton from '../../components/FWCButton.vue'
export default {
    components: {
        FWCButton
    },
    data() {
        return {
            interfaceForm: {
                system: 'renshi',
                name: '',
                path: '',
                desc: '',
            },
            rules: {
                system: [
                    { required: true, message: '请选择所属系统', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入接口名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                path: [
                    { required: true, message: '请输入接口路由', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        createInterface(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
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
    }
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