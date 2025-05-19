<template>
    <div class="interface_add-container">
        <div class="interface_add-title">
            <h4>修改接口</h4>
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
                        <el-input v-model="interfaceForm.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="接口路由" prop="url">
                  <el-col :span="11">
                    <el-input v-model="interfaceForm.url"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="接口类型" prop="type" width="100px">
                    <el-radio-group v-model="interfaceForm.type">
                        <el-radio v-for="(t,i) in interfaceTypeList" :key="i" :label="t.value">{{t.label}}</el-radio>
                    </el-radio-group>
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
                    <el-button class="el-button--black" @click="updateInterface('interfaceForm')">立即修改</el-button>
                    <el-button @click="resetInterface('interfaceForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue';
import { getInterfaceById, updateInterface } from '@/api/interface';
import { SYSTEM_MAP, INTERFACE_TYPE_MAP, INTERFACE_STATUS_MAP } from '@/enums/enums.js';

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
                url: '',
                type: 0,
                status: '1',
                description: '',
            },
            rules: {
              systemId: [
                    { required: true, message: '请选择所属系统', trigger: 'change' }
              ],
              name: [
                  { required: true, message: '请输入接口名称', trigger: 'blur' },
                  { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
              ],
              url: [
                {required: true, message: '请输入接口路由', trigger: 'blur'},
                {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
              ],
              status: [
                {required: true, message: '请选择接口状态', trigger: 'change'}
              ],
              type: [
                {required: true, message: '请选择接口类型', trigger: 'change'}
              ]
            }
        }
    },
      methods: {
        async fetchInterfaceDetail(id) {
          try {
            const res = await getInterfaceById(id);
            this.interfaceForm = {
              ...res.data,
              systemName: SYSTEM_MAP[res.data.systemId] || ''
            };
          } catch (error) {
            console.error('获取接口失败:', error);
            this.$message.error('获取接口失败，请重试');
          }
        },
        async updateInterface(formName) {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              try {
                await updateInterface(this.interfaceForm);
                this.$message.success('接口更新成功');
                this.$router.back();
              } catch (error) {
                console.error('更新失败:', error);
                this.$message.error('接口更新失败，请重试');
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
    mounted() {
      const id = this.$route.params.id;
      if (id) {
        this.fetchInterfaceDetail(id);
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