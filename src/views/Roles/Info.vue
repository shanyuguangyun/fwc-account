<template>
    <div class="role_info-container">
        <div class="role_info-title">
            <h4>角色详情</h4>
            <div>
              <FWCButton :btnValue=btnUpdate @button-click="handleUpdate" style="margin-right: 10px"></FWCButton>
              <FWCButton :btnValue=btnBack @button-click="handleClicked"></FWCButton>
            </div>
        </div>
        <div class="role_info-data">
            <el-descriptions class="margin-top" :column="1"  border>
                <el-descriptions-item>
                  <template slot="label">
                      <i class="el-icon-user"></i>
                      ID
                  </template>
                  {{ roleData.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                      <i class="el-icon-user"></i>
                      角色名称
                  </template>
                  {{ roleData.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    角色类型
                  </template>
                  {{ roleData.type | roleTypeText }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    描述
                  </template>
                  {{ roleData.description }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    状态
                  </template>
                  {{ roleData.status | roleStatusText }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue'
import { getRoleById } from '@/api/role'
export default {
    components: {
        FWCButton
    },
    data() {
        return {
            btnUpdate: '修改',
            btnBack: '返回',
            roleData: {
              id: 0,
              name: '',
              type: 0,
              status: '0',
              description: '',
              createTime: '',
              updateTime: '',
            }
        }
    },
    methods: {
        handleClicked() {
            this.$router.back();
        },
        handleUpdate() {
            this.$router.push({ name: 'RolesUpdate', params: { id: this.$route.params.id } })
        },
        async fetchRoleDetail(id) {
          try {
            const res = await getRoleById(id);
            this.roleData = {
              ...res.data,
              // 格式化时间（可选）
              createTime: res.data.createTime ? new Date(res.data.createTime).toISOString().split('T')[0] : '',
              updateTime: res.data.updateTime ? new Date(res.data.updateTime).toISOString().split('T')[0] : ''
            };
          } catch (error) {
            console.error('获取角色详情失败:', error);
            this.$message.error('获取角色详情失败，请重试');
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
.role_info-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.role_info-data {
    margin-top: 50px;
}
</style>