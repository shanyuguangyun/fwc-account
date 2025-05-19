<template>
    <div class="interface_info-container">
        <div class="interface_info-title">
            <h4>接口详情</h4>
            <div>
              <FWCButton :btnValue=btnUpdate @button-click="handleUpdate" style="margin-right: 10px"></FWCButton>
              <FWCButton :btnValue=btnBack @button-click="handleClicked"></FWCButton>
            </div>
        </div>
        <div class="interface_info-data">
            <el-descriptions class="margin-top" :column="1"  border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        ID
                    </template>
                    {{ interfaceData.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        接口名称
                    </template>
                    {{ interfaceData.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    接口类型
                  </template>
                  {{ interfaceData.type | interfaceTypeText }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    所属系统
                  </template>
                  {{ interfaceData.systemName }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    描述
                  </template>
                  {{ interfaceData.description }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    路由
                  </template>
                  {{ interfaceData.url }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    状态
                  </template>
                  {{ interfaceData.status | interfaceStatusText }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue'
import { getInterfaceById } from '@/api/interface'
export default {
    components: {
        FWCButton
    },
    data() {
        return {
            btnUpdate: '修改',
            btnBack: '返回',
            interfaceData: {
              id: 0,
              systemId:  0,
              systemName: '',
              name: '',
              url:  '',
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
            this.$router.push({ name: 'InterfacesUpdate', params: { id: this.$route.params.id } })
        },
        async fetchInterfaceDetail(id) {
          try {
            const res = await getInterfaceById(id);
            this.interfaceData = {
              ...res.data,
              // 格式化时间（可选）
              createTime: res.data.createTime ? new Date(res.data.createTime).toISOString().split('T')[0] : '',
              updateTime: res.data.updateTime ? new Date(res.data.updateTime).toISOString().split('T')[0] : ''
            };
          } catch (error) {
            console.error('获取接口详情失败:', error);
            this.$message.error('获取接口详情失败，请重试');
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
.interface_info-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.interface_info-data {
    margin-top: 50px;
}
</style>