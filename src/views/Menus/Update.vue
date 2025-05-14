<template>
    <div class="menu_add-container">
        <div class="menu_add-title">
            <h4>创建菜单</h4>
            <FWCButton btnValue='返回' @button-click="handleClicked"></FWCButton>
        </div>
        <div class="menu_add-form">
            <el-form :model="menuForm" :rules="rules" ref="menuForm" label-width="100px" class="demo-menuForm"
                size="mini">
                <el-form-item label="所属系统" prop="systemId">
                    <el-select v-model="menuForm.systemId" placeholder="请选择系统">
                        <el-option label="人事管理" value="0"></el-option>
                        <el-option label="财务薪资" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="父菜单" prop="parentMenu">
                    <el-select v-model="menuForm.parentMenu" placeholder="请选择父菜单">
                        <el-option label="无" value=""></el-option>
                        <el-option label="人事管理" value="renshiguanli"></el-option>
                        <el-option label="财务管理" value="caiwuguanli"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单名称" prop="name">
                    <el-col :span="11">
                        <el-input v-model="menuForm.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="菜单类型" prop="type" width="100px">
                    <el-radio-group v-model="menuForm.type">
                        <el-radio label="0">一级菜单</el-radio>
                        <el-radio label="1">子菜单</el-radio>
                        <el-radio label="2">功能按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                  <el-col :span="11">
                    <el-input v-model.number="menuForm.sort" placeholder="请输入排序数字"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="状态" prop="status">
                  <el-select v-model="menuForm.status" placeholder="请选择状态">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="description">
                    <el-col :span="11">
                        <el-input type="textarea" v-model="menuForm.desc"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button--black" @click="updateMenu('menuForm')">立即修改</el-button>
                    <el-button @click="resetMenu('menuForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue';
import { getMenuById, updateMenu } from '@/api/menu';
import { SYSTEM_MAP } from '@/enums/enums.js';

export default {
    components: {
        FWCButton
    },
    data() {
        return {
            menuForm: {
                systemId: '0',
                systemName: '',
                parentMenu: '',
                name: '',
                type: '0',
                sort: 0,
                icon: '',
                url: '',
                status: '1',
                description: '',
            },
            rules: {
              systemId: [
                    { required: true, message: '请选择所属系统', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                sort: [
                  { required: true, message: '请输入排序值', trigger: 'blur' },
                  { pattern: /^[0-9]+$/, message: '排序必须为数字', trigger: 'blur' }
                ],
                status: [
                  { required: true, message: '请选择状态', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择菜单类型', trigger: 'change' }
                ]
            }
        }
    },
      methods: {
        async fetchMenuDetail(id) {
          try {
            const res = await getMenuById(id);
            this.menuForm = {
              ...res.data,
              systemName: SYSTEM_MAP[res.data.systemId] || ''
            };
          } catch (error) {
            console.error('获取菜单失败:', error);
            this.$message.error('获取菜单失败，请重试');
          }
        },
        async updateMenu(formName) {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              try {
                await updateMenu(this.menuForm);
                this.$message.success('菜单更新成功');
                this.$router.back();
              } catch (error) {
                console.error('更新失败:', error);
                this.$message.error('菜单更新失败，请重试');
              }
            } else {
              console.log('表单验证失败');
              return false;
            }
          });
        },
        resetMenu(formName) {
            this.$refs[formName].resetFields();
        },
        handleClicked() {
            this.$router.back();
        }
    },
    watch: {
      'menuForm.systemId': {
        immediate: true,
        handler(newVal) {
          this.menuForm.systemName = SYSTEM_MAP[newVal] || '';
        }
      }
    },
    mounted() {
      const id = this.$route.params.id;
      if (id) {
        this.fetchMenuDetail(id);
      }
    }
}
</script>

<style scoped lang="scss">
@import '../../assets/customer-btn';

.menu_add-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.menu_add-form {
    margin-top: 50px;
}
</style>